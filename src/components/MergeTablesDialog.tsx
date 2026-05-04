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
import { Alert, AlertDescription } from './ui/alert';
import { Card } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { Checkbox } from './ui/checkbox';
import { AlertCircle, Combine, Plus } from 'lucide-react';
import { Order, OrderItem } from '../utils/mockData';
import { mergeTables } from '../utils/tableManagement';

interface MergeTablesDialogProps {
  open: boolean;
  onClose: () => void;
  sourceOrder: Order | null;
  waitingOrders: Order[];
  performedBy: string;
  onConfirm: (mergedOrder: Order, sourceOrderId: string) => void;
}

export function MergeTablesDialog({
  open,
  onClose,
  sourceOrder,
  waitingOrders,
  performedBy,
  onConfirm,
}: MergeTablesDialogProps) {
  const [selectedTargetOrderId, setSelectedTargetOrderId] = useState('');
  const [mergeBills, setMergeBills] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!sourceOrder) return null;

  // Get available tables to merge with (other occupied tables)
  const availableTables = waitingOrders.filter(
    order => order.id !== sourceOrder.id && order.status === 'waiting'
  );

  const selectedTargetOrder = waitingOrders.find(o => o.id === selectedTargetOrderId) || null;

  const handleConfirm = () => {
    if (!selectedTargetOrderId) {
      setError('Please select a target table');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const targetOrder = waitingOrders.find(o => o.id === selectedTargetOrderId);
      if (!targetOrder) {
        setError('Target order not found');
        setLoading(false);
        return;
      }

      const result = mergeTables(
        sourceOrder,
        targetOrder,
        targetOrder.tableNumber,
        targetOrder.tableColor,
        mergeBills,
        performedBy
      );

      if (result.validationError) {
        setError(result.validationError);
        setLoading(false);
        return;
      }

      onConfirm(result.mergedOrder, sourceOrder.id);

      setSelectedTargetOrderId('');
      setError('');
      setLoading(false);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to merge tables');
      setLoading(false);
    }
  };

  // Calculate merged totals preview
  const mergedItemsPreview = selectedTargetOrder
    ? combineItemsPreview(sourceOrder.items, selectedTargetOrder.items)
    : sourceOrder.items;

  const mergedTotalPreview = mergedItemsPreview.reduce((sum, item) => sum + item.total, 0);
  const itemCountPreview = mergedItemsPreview.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Combine className="h-5 w-5 text-orange-600" />
            Merge Tables
          </DialogTitle>
          <DialogDescription>
            Combine the order from Table {sourceOrder.tableNumber} {sourceOrder.tableColor} with another table
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Source Order Summary */}
          <div className="space-y-2">
            <h3 className="font-semibold text-sm">From (Source Table)</h3>
            <Card className="p-4 bg-blue-50 border-blue-200">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold">Table {sourceOrder.tableNumber} {sourceOrder.tableColor}</p>
                  <p className="text-sm text-gray-600">{sourceOrder.waiterName}</p>
                  <div className="mt-2 space-y-1">
                    {sourceOrder.items.slice(0, 3).map((item, idx) => (
                      <p key={idx} className="text-sm text-gray-600">
                        {item.quantity}x {item.productName}
                      </p>
                    ))}
                    {sourceOrder.items.length > 3 && (
                      <p className="text-sm text-gray-500">+{sourceOrder.items.length - 3} more items</p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">{sourceOrder.items.length} items</p>
                  <p className="font-bold text-lg">UGX {sourceOrder.total.toLocaleString()}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Target Table Selection */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm">To (Target Table)</h3>

            {availableTables.length === 0 ? (
              <Alert className="border-yellow-300 bg-yellow-50">
                <AlertCircle className="h-4 w-4 text-yellow-600" />
                <AlertDescription className="text-yellow-800">
                  No other occupied tables available to merge with.
                </AlertDescription>
              </Alert>
            ) : (
              <div className="space-y-2">
                <Select value={selectedTargetOrderId} onValueChange={setSelectedTargetOrderId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a table to merge with" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableTables.map(order => (
                      <SelectItem key={order.id} value={order.id}>
                        Table {order.tableNumber} {order.tableColor} ({order.items.length} items •
                        UGX {order.total.toLocaleString()})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Selected Target Preview */}
            {selectedTargetOrder && (
              <Card className="p-4 bg-green-50 border-green-200">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">Table {selectedTargetOrder.tableNumber} {selectedTargetOrder.tableColor}</p>
                    <p className="text-sm text-gray-600">{selectedTargetOrder.waiterName}</p>
                    <div className="mt-2 space-y-1">
                      {selectedTargetOrder.items.slice(0, 3).map((item, idx) => (
                        <p key={idx} className="text-sm text-gray-600">
                          {item.quantity}x {item.productName}
                        </p>
                      ))}
                      {selectedTargetOrder.items.length > 3 && (
                        <p className="text-sm text-gray-500">+{selectedTargetOrder.items.length - 3} more items</p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">{selectedTargetOrder.items.length} items</p>
                    <p className="font-bold text-lg">UGX {selectedTargetOrder.total.toLocaleString()}</p>
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Merge Options */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm">Merge Options</h3>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="mergeBills"
                checked={mergeBills}
                onCheckedChange={(checked) => setMergeBills(checked as boolean)}
              />
              <label
                htmlFor="mergeBills"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Combine bills into single order
              </label>
            </div>
            <p className="text-xs text-gray-500">
              When checked, all items will be combined under one bill. When unchecked, orders remain separate (for future implementation).
            </p>
          </div>

          {/* Merge Preview */}
          {selectedTargetOrder && (
            <Card className="p-4 bg-purple-50 border-purple-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-sm">Merged Result</h3>
                <Plus className="h-4 w-4 text-purple-600" />
              </div>

              <div className="grid grid-cols-3 gap-4 mb-3">
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">{itemCountPreview}</p>
                  <p className="text-xs text-gray-600">Total Items</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">
                    UGX {mergedTotalPreview.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-600">Total Amount</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">
                    Table {selectedTargetOrder.tableNumber} {selectedTargetOrder.tableColor}
                  </p>
                  <p className="text-xs text-gray-600">Final Location</p>
                </div>
              </div>

              {/* Item Summary */}
              <div className="bg-white rounded p-2">
                <p className="text-xs font-semibold text-gray-600 mb-2">Items to be combined:</p>
                <ScrollArea className="h-32">
                  <div className="space-y-1 pr-4">
                    {mergedItemsPreview.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-xs">
                        <span className="text-gray-600">{item.quantity}x {item.productName}</span>
                        <span className="font-semibold">UGX {item.total.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </Card>
          )}

          {/* Error Message */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Info */}
          <Alert className="border-blue-300 bg-blue-50">
            <AlertCircle className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              ℹ️ After merging, the source table will become available and all items will be combined under the target table.
            </AlertDescription>
          </Alert>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!selectedTargetOrderId || loading}
            className="bg-orange-600 hover:bg-orange-700"
          >
            {loading ? 'Merging...' : 'Confirm Merge'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Helper to preview merged items
function combineItemsPreview(sourceItems: OrderItem[], targetItems: OrderItem[]): OrderItem[] {
  const itemMap = new Map<string, OrderItem>();

  targetItems.forEach(item => {
    itemMap.set(item.productId, { ...item });
  });

  sourceItems.forEach(sourceItem => {
    const existing = itemMap.get(sourceItem.productId);
    if (existing) {
      existing.quantity += sourceItem.quantity;
      existing.total = existing.quantity * existing.price;
    } else {
      itemMap.set(sourceItem.productId, { ...sourceItem });
    }
  });

  return Array.from(itemMap.values());
}
