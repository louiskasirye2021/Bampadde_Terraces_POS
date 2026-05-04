import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from './ui/dialog';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { Alert, AlertDescription } from './ui/alert';
import { Card } from './ui/card';
import { AlertCircle, ArrowRight } from 'lucide-react';
import { Order } from '../utils/mockData';
import { changeTable } from '../utils/tableManagement';

interface ChangeTableDialogProps {
  open: boolean;
  onClose: () => void;
  order: Order | null;
  waitingOrders: Order[];
  performedBy: string;
  onConfirm: (updatedOrder: Partial<Order>, oldTableId: string, newTableId: string) => void;
}

const TABLE_NUMBERS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
const TABLE_COLORS = ['White', 'Blue', 'Brown', 'Yellow'];

export function ChangeTableDialog({
  open,
  onClose,
  order,
  waitingOrders,
  performedBy,
  onConfirm,
}: ChangeTableDialogProps) {
  const [selectedTableNumber, setSelectedTableNumber] = useState('');
  const [selectedTableColor, setSelectedTableColor] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!order) return null;

  // Get occupied tables
  const occupiedTables = new Set(
    waitingOrders
      .filter(o => o.id !== order.id)
      .map(o => `${o.tableNumber}-${o.tableColor}`)
  );

  const handleConfirm = () => {
    if (!selectedTableNumber.trim() || !selectedTableColor) {
      setError('Please enter a table number and select a color');
      return;
    }

    // Validate table number is a positive integer
    const tableNum = parseInt(selectedTableNumber.trim());
    if (isNaN(tableNum) || tableNum <= 0) {
      setError('Please enter a valid table number (positive integer)');
      return;
    }

    const selectedTable = `${tableNum}-${selectedTableColor}`;
    if (occupiedTables.has(selectedTable)) {
      setError('Selected table is occupied. Use Merge Tables instead.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = changeTable(
        order.id,
        order.items,
        order.tableNumber,
        order.tableColor,
        tableNum.toString(),
        selectedTableColor,
        performedBy
      );

      if (result.validationError) {
        setError(result.validationError);
        setLoading(false);
        return;
      }

      onConfirm(
        result.updatedOrder,
        `${order.tableNumber}-${order.tableColor}`,
        selectedTable
      );

      setSelectedTableNumber('');
      setSelectedTableColor('');
      setError('');
      setLoading(false);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to change table');
      setLoading(false);
    }
  };

  const isTableOccupied = selectedTableNumber.trim() && selectedTableColor
    ? occupiedTables.has(`${parseInt(selectedTableNumber.trim()) || 0}-${selectedTableColor}`)
    : false;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ArrowRight className="h-5 w-5 text-orange-600" />
            Change Table
          </DialogTitle>
          <DialogDescription>
            Move the order from {order.tableNumber} {order.tableColor} to another available table
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Current Order Summary */}
          <Card className="p-4 bg-blue-50 border-blue-200">
            <p className="text-sm text-gray-600 mb-2">Current Order</p>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">Table {order.tableNumber} {order.tableColor}</p>
                <p className="text-sm text-gray-600">{order.items.length} items • {order.waiterName}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Total</p>
                <p className="font-bold text-lg">UGX {order.total.toLocaleString()}</p>
              </div>
            </div>
          </Card>

          {/* Table Selection */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm">Select New Table</h3>

            <div className="grid grid-cols-2 gap-4">
              {/* Table Number Input */}
              <div className="space-y-2">
                <label className="text-sm text-gray-600">Table Number</label>
                <Input
                  type="text"
                  placeholder="Enter table number"
                  value={selectedTableNumber}
                  onChange={(e) => setSelectedTableNumber(e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Table Color Selection */}
              <div className="space-y-2">
                <label className="text-sm text-gray-600">Table Color</label>
                <Select value={selectedTableColor} onValueChange={setSelectedTableColor}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select table color" />
                  </SelectTrigger>
                  <SelectContent>
                    {TABLE_COLORS.map(color => (
                      <SelectItem key={color} value={color}>
                        {color}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Selected Table Summary */}
            {selectedTableNumber.trim() && selectedTableColor && (
              <Card className={`p-4 ${isTableOccupied ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">Table {selectedTableNumber.trim()} {selectedTableColor}</p>
                    <p className={`text-sm ${isTableOccupied ? 'text-red-600' : 'text-green-600'}`}>
                      {isTableOccupied ? '🔴 Occupied' : '🟢 Available'}
                    </p>
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Available Tables Info */}
          <Card className="p-3 bg-gray-50 border-gray-200">
            <p className="text-xs text-gray-600 mb-2">
              📊 Occupied Tables: {occupiedTables.size} of {TABLE_NUMBERS.length * TABLE_COLORS.length}
            </p>
            <p className="text-xs text-gray-500">
              Note: You cannot move to occupied tables directly. Use the Merge Table option if customers are joining.
            </p>
          </Card>

          {/* Error Message */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Warning if target is occupied */}
          {isTableOccupied && (
            <Alert className="border-yellow-300 bg-yellow-50">
              <AlertCircle className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-yellow-800">
                This table is occupied. Please use the "Merge Tables" option if customers are joining another table.
              </AlertDescription>
            </Alert>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!selectedTableNumber.trim() || !selectedTableColor || isTableOccupied || loading}
            className="bg-orange-600 hover:bg-orange-700"
          >
            {loading ? 'Processing...' : 'Confirm Change'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
