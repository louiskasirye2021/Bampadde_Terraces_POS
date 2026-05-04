import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { OrderItem, paymentMethods } from '../utils/mockData';
import { CreditCard, Wallet, Smartphone, Receipt } from 'lucide-react';

interface CreditPaymentDialogProps {
  open: boolean;
  onClose: () => void;
  orderItems: OrderItem[];
  orderTotal: number;
  tableInfo: string;
  onConfirmCreditPayment: (
    customerName: string,
    customerContact: string,
    paymentMethod: string,
    amountPaid: number,
    amountOwed: number
  ) => void;
}

export function CreditPaymentDialog({
  open,
  onClose,
  orderItems,
  orderTotal,
  tableInfo,
  onConfirmCreditPayment,
}: CreditPaymentDialogProps) {
  const [customerName, setCustomerName] = useState('');
  const [customerContact, setCustomerContact] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [amountPaid, setAmountPaid] = useState('0');

  const parsedAmountPaid = parseFloat(amountPaid) || 0;
  const amountOwed = orderTotal - parsedAmountPaid;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName || !customerContact) {
      return;
    }

    if (parsedAmountPaid < 0 || parsedAmountPaid > orderTotal) {
      return;
    }

    onConfirmCreditPayment(
      customerName,
      customerContact,
      paymentMethod,
      parsedAmountPaid,
      amountOwed
    );

    // Reset form
    setCustomerName('');
    setCustomerContact('');
    setPaymentMethod('Cash');
    setAmountPaid('0');
  };

  const getPaymentIcon = (method: string) => {
    switch (method) {
      case 'Cash':
        return <Wallet className="h-5 w-5" />;
      case 'Card':
        return <CreditCard className="h-5 w-5" />;
      case 'Mobile Money':
        return <Smartphone className="h-5 w-5" />;
      default:
        return <Receipt className="h-5 w-5" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-white max-w-2xl max-h-[90vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="text-orange-600">Credit Sale - Customer Details</DialogTitle>
          <DialogDescription>
            Record customer information and partial payment
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 flex-1 overflow-y-auto">
          {/* Customer Information */}
          <div className="space-y-4 border border-gray-200 rounded-lg p-4">
            <h3 className="text-gray-900">Customer Information</h3>
            
            <div>
              <Label htmlFor="customerName">Customer Name *</Label>
              <Input
                id="customerName"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Enter customer name"
                className="bg-white"
                required
              />
            </div>

            <div>
              <Label htmlFor="customerContact">Contact Number *</Label>
              <Input
                id="customerContact"
                value={customerContact}
                onChange={(e) => setCustomerContact(e.target.value)}
                placeholder="e.g., 0700123456"
                className="bg-white"
                required
              />
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-3 border border-gray-200 rounded-lg p-4">
            <h3 className="text-gray-900">Order Summary</h3>
            <div className="text-sm text-gray-600">
              <p className="mb-1"><span className="font-medium">Table:</span> {tableInfo}</p>
            </div>
            <div className="max-h-32 overflow-y-auto space-y-1">
              {orderItems.map((item, idx) => (
                <div key={idx} className="flex justify-between text-sm">
                  <span className="text-gray-900">
                    {item.productName} x{item.quantity}
                  </span>
                  <span className="text-gray-900">UGX {item.total.toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 pt-2">
              <div className="flex justify-between">
                <span className="text-gray-900">Total:</span>
                <span className="text-orange-600">UGX {orderTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Payment Details */}
          <div className="space-y-4 border border-gray-200 rounded-lg p-4">
            <h3 className="text-gray-900">Payment Details</h3>

            <div>
              <Label>Payment Method</Label>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="mt-2">
                {paymentMethods.map((method) => (
                  <div key={method} className="flex items-center space-x-2">
                    <RadioGroupItem value={method} id={`credit-${method}`} />
                    <Label htmlFor={`credit-${method}`} className="flex items-center gap-2 cursor-pointer">
                      {getPaymentIcon(method)}
                      {method}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="amountPaid">Amount Paid Now (UGX)</Label>
              <Input
                id="amountPaid"
                type="number"
                value={amountPaid}
                onChange={(e) => setAmountPaid(e.target.value)}
                placeholder="0"
                min="0"
                max={orderTotal}
                step="1000"
                className="bg-white"
              />
              <p className="text-xs text-gray-500 mt-1">Leave as 0 for full credit</p>
            </div>

            <div className="border-t border-gray-200 pt-3 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Amount:</span>
                <span className="text-gray-900">UGX {orderTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Amount Paid:</span>
                <span className="text-gray-900">UGX {parsedAmountPaid.toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-2">
                <span className="font-medium text-gray-900">Amount Owed:</span>
                <span className="font-medium text-orange-600">
                  UGX {amountOwed.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button
              type="submit"
              className="flex-1 bg-orange-600 hover:bg-orange-700 text-white"
              disabled={!customerName || !customerContact}
            >
              Confirm Credit Sale
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 border-gray-300"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}