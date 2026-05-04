import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { tableColors, mockUsers } from '../utils/mockData';

interface TableEntryDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (tableNumber: string, tableColor: string, waiterName: string) => void;
  currentWaiterName?: string;
}

export function TableEntryDialog({ open, onClose, onSubmit, currentWaiterName }: TableEntryDialogProps) {
  const [tableNumber, setTableNumber] = useState('');
  const [tableColor, setTableColor] = useState('');
  const [waiterName, setWaiterName] = useState(currentWaiterName || '');

  const handleSubmit = () => {
    if (tableNumber && tableColor && waiterName) {
      onSubmit(tableNumber, tableColor, waiterName);
      setTableNumber('');
      setTableColor('');
      onClose();
    }
  };

  const waiters = mockUsers.filter(u => u.role === 'waiter');

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Enter Table Details</DialogTitle>
          <DialogDescription>
            Enter the table number, color, and waiter name to start a new order.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Table Number</Label>
            <Input
              type="text"
              placeholder="e.g., 12"
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
              className="border-gray-300"
            />
          </div>

          <div className="space-y-2">
            <Label>Table Color</Label>
            <Select value={tableColor} onValueChange={setTableColor}>
              <SelectTrigger className="border-gray-300">
                <SelectValue placeholder="Select color" />
              </SelectTrigger>
              <SelectContent>
                {tableColors.map((color) => (
                  <SelectItem key={color} value={color}>
                    {color}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Waiter Name</Label>
            <Select value={waiterName} onValueChange={setWaiterName}>
              <SelectTrigger className="border-gray-300">
                <SelectValue placeholder="Select waiter" />
              </SelectTrigger>
              <SelectContent>
                {waiters.map((waiter) => (
                  <SelectItem key={waiter.id} value={waiter.name}>
                    {waiter.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="pt-2 px-4 py-2 bg-orange-50 rounded-lg border border-orange-200">
            <p className="text-sm text-gray-600">Preview:</p>
            <p className="text-orange-600">
              {tableNumber && tableColor && waiterName
                ? `${tableNumber} ${tableColor} – ${waiterName}`
                : 'Fill all fields above'}
            </p>
          </div>
        </div>

        <div className="flex gap-2 justify-end">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!tableNumber || !tableColor || !waiterName}
            className="bg-orange-600 hover:bg-orange-700 text-white"
          >
            Continue to Order
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
