import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { OrderItem, paymentMethods } from '../utils/mockData';
import { CreditCard, Wallet, Smartphone, Receipt } from 'lucide-react';

interface PaymentDialogProps {
  open: boolean;
  onClose: () => void;
  orderItems: OrderItem[];
  orderTotal: number;
  tableInfo: string;
  onConfirmPayment: (paymentMethod: string, amountPaid: number, change: number) => void;
  onCreditPayment?: () => void;
}

export function PaymentDialog({
  open,
  onClose,
  orderItems,
  orderTotal,
  tableInfo,
  onConfirmPayment,
  onCreditPayment,
}: PaymentDialogProps) {
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [amountPaid, setAmountPaid] = useState('');
  const [splitCount, setSplitCount] = useState(1);

  const numericAmountPaid = parseFloat(amountPaid) || 0;
  const change = numericAmountPaid - orderTotal;
  const splitAmount = orderTotal / splitCount;

  const handleQuickAmount = (amount: number) => {
    setAmountPaid(amount.toString());
  };

  const handleConfirm = () => {
    if (paymentMethod === 'Cash' && numericAmountPaid < orderTotal) {
      return;
    }
    onConfirmPayment(paymentMethod, numericAmountPaid, change);
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
      <DialogContent className="max-w-2xl bg-white">
        <DialogHeader>
          <DialogTitle className="text-orange-600">Process Payment</DialogTitle>
          <DialogDescription>{tableInfo}</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-6">
          {/* Left: Order Summary */}
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto">
              <h4 className="text-sm text-gray-700 mb-3">Order Items:</h4>
              <div className="space-y-2">
                {orderItems.map((item) => (
                  <div key={item.productId} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {item.quantity}x {item.productName}
                    </span>
                    <span className="text-gray-900">
                      UGX {item.total.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2 bg-orange-50 p-4 rounded-lg border border-orange-200">
              <div className="flex justify-between">
                <span className="text-gray-700">Subtotal:</span>
                <span className="text-gray-900">
                  UGX {orderTotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between border-t border-orange-200 pt-2">
                <span className="text-gray-900">Total:</span>
                <span className="text-orange-600">
                  UGX {orderTotal.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Split Bill */}
            <div className="space-y-2">
              <Label>Split Bill</Label>
              <div className="flex gap-2">
                {[1, 2, 3, 4].map((count) => (
                  <Button
                    key={count}
                    onClick={() => setSplitCount(count)}
                    variant={splitCount === count ? 'default' : 'outline'}
                    className={splitCount === count ? 'bg-orange-600 hover:bg-orange-700 text-white' : 'border-gray-300'}
                    size="sm"
                  >
                    {count} {count === 1 ? 'Person' : 'People'}
                  </Button>
                ))}
              </div>
              {splitCount > 1 && (
                <p className="text-sm text-gray-600">
                  Each pays: UGX {splitAmount.toLocaleString()}
                </p>
              )}
            </div>
          </div>

          {/* Right: Payment Method */}
          <div className="space-y-4">
            <div className="space-y-3">
              <Label>Payment Method</Label>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                {paymentMethods.map((method) => (
                  <div
                    key={method}
                    className={`flex items-center space-x-3 p-3 rounded-lg border-2 cursor-pointer ${
                      paymentMethod === method
                        ? 'border-orange-600 bg-orange-50'
                        : 'border-gray-200 hover:border-orange-300'
                    }`}
                    onClick={() => setPaymentMethod(method)}
                  >
                    <RadioGroupItem value={method} id={method} />
                    <Label htmlFor={method} className="flex items-center gap-2 cursor-pointer flex-1">
                      {getPaymentIcon(method)}
                      {method}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {paymentMethod === 'Cash' && (
              <div className="space-y-3">
                <Label>Amount Paid</Label>
                <Input
                  type="number"
                  value={amountPaid}
                  onChange={(e) => setAmountPaid(e.target.value)}
                  placeholder="Enter amount"
                  className="border-gray-300"
                />

                <div className="grid grid-cols-3 gap-2">
                  {[10000, 20000, 50000, 100000, 200000, 500000].map((amount) => (
                    <Button
                      key={amount}
                      onClick={() => handleQuickAmount(amount)}
                      variant="outline"
                      size="sm"
                      className="border-gray-300 hover:bg-orange-50 hover:border-orange-600"
                    >
                      {amount.toLocaleString()}
                    </Button>
                  ))}
                </div>

                {numericAmountPaid > 0 && (
                  <div className="bg-gray-50 p-3 rounded-lg space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Amount Paid:</span>
                      <span className="text-gray-900">
                        UGX {numericAmountPaid.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Change:</span>
                      <span className={change >= 0 ? 'text-green-600' : 'text-red-600'}>
                        UGX {change.toLocaleString()}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {paymentMethod === 'Mobile Money' && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-sm text-blue-900">
                  Request customer to send UGX {orderTotal.toLocaleString()} to the bar's mobile money number.
                </p>
              </div>
            )}

            {paymentMethod === 'Card' && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-sm text-blue-900">
                  Process card payment of UGX {orderTotal.toLocaleString()} using the POS terminal.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-2 justify-end pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={paymentMethod === 'Cash' && numericAmountPaid < orderTotal}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Confirm Payment
          </Button>
          {onCreditPayment && (
            <Button
              onClick={onCreditPayment}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Credit Payment
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}