import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Expense, PaymentHistory } from '../utils/mockData';
import { DollarSign, AlertCircle, CheckCircle2, History } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface RecordPaymentDialogProps {
  expense: Expense | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRecordPayment: (expenseId: string, payment: Omit<PaymentHistory, 'id' | 'expenseId' | 'dateOfTransaction'>) => void;
}

export function RecordPaymentDialog({ 
  expense, 
  open, 
  onOpenChange, 
  onRecordPayment,
}: RecordPaymentDialogProps) {
  const [paymentAmount, setPaymentAmount] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [paymentType, setPaymentType] = useState<'Partial' | 'Full' | null>(null);

  if (!expense) return null;

  const formatCurrency = (amount: number) => `UGX ${amount.toLocaleString()}`;

  const handlePartialPayment = () => {
    const amount = parseFloat(paymentAmount);
    
    if (!paymentAmount || isNaN(amount) || amount <= 0) {
      toast.error('Please enter a valid payment amount');
      return;
    }

    if (amount > expense.balanceRemaining) {
      toast.error(`Payment amount cannot exceed balance remaining (${formatCurrency(expense.balanceRemaining)})`);
      return;
    }

    const newTotalPaid = expense.amountPaid + amount;
    const newBalance = expense.totalCost - newTotalPaid;

    onRecordPayment(expense.id, {
      paymentType: newBalance === 0 ? 'Full' : 'Partial',
      previousAmountPaid: expense.amountPaid,
      additionalAmountPaid: amount,
      newTotalAmountPaid: newTotalPaid,
      balanceAfterPayment: newBalance,
      recordedBy: 'Admin', // Will be set by parent
    });

    toast.success(`Payment of ${formatCurrency(amount)} recorded successfully`);
    setPaymentAmount('');
    setShowConfirmation(false);
    onOpenChange(false);
  };

  const handleFullPayment = () => {
    setPaymentType('Full');
    setShowConfirmation(true);
  };

  const confirmFullPayment = () => {
    const remainingBalance = expense.balanceRemaining;
    const newTotalPaid = expense.totalCost;

    onRecordPayment(expense.id, {
      paymentType: 'Full',
      previousAmountPaid: expense.amountPaid,
      additionalAmountPaid: remainingBalance,
      newTotalAmountPaid: newTotalPaid,
      balanceAfterPayment: 0,
      recordedBy: 'Admin', // Will be set by parent
    });

    toast.success('Full payment recorded successfully');
    setShowConfirmation(false);
    setPaymentType(null);
    onOpenChange(false);
  };

  const handleClose = () => {
    setPaymentAmount('');
    setShowConfirmation(false);
    setPaymentType(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-orange-600">Record Payment</DialogTitle>
          <DialogDescription>
            Update payment information for this expense
          </DialogDescription>
        </DialogHeader>

        {!showConfirmation ? (
          <div className="space-y-6">
            {/* Expense Summary */}
            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-gray-900">{expense.itemPurchased || expense.description}</p>
                  <p className="text-sm text-gray-600">Supplier: {expense.supplier || 'N/A'}</p>
                  {expense.isConsolidated && (
                    <Badge className="mt-2 bg-blue-100 text-blue-800">
                      Consolidated Balance
                    </Badge>
                  )}
                </div>
                <Badge
                  className={
                    expense.paymentStatus === 'Paid'
                      ? 'bg-green-100 text-green-800'
                      : expense.paymentStatus === 'Not Paid'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-amber-100 text-amber-800'
                  }
                >
                  {expense.paymentStatus}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-3 border-t">
                {expense.isConsolidated && expense.carriedForwardBalance > 0 && (
                  <>
                    <div className="col-span-2 bg-blue-50 border border-blue-200 rounded p-2">
                      <p className="text-xs text-blue-600 font-semibold">Previous Balance Carried Forward</p>
                      <p className="text-sm font-semibold text-blue-800">{formatCurrency(expense.carriedForwardBalance)}</p>
                      {expense.consolidatedFrom && (
                        <p className="text-xs text-blue-600">
                          From {new Date(expense.consolidatedFrom).toLocaleDateString('en-UG')}
                        </p>
                      )}
                    </div>
                    <div className="col-span-2 bg-green-50 border border-green-200 rounded p-2">
                      <p className="text-xs text-green-600 font-semibold">New Expense Amount</p>
                      <p className="text-sm font-semibold text-green-800">{formatCurrency(expense.currentExpenseCost || 0)}</p>
                      <p className="text-xs text-green-600">
                        {expense.quantity} × {formatCurrency(expense.costPerItem)}
                      </p>
                    </div>
                    <div className="col-span-2 bg-gray-100 border border-gray-300 rounded p-2">
                      <p className="text-xs text-gray-600 font-semibold">Combined Total Payable</p>
                      <p className="font-bold text-gray-900">{formatCurrency(expense.totalCost)}</p>
                    </div>
                  </>
                )}
                {!expense.isConsolidated && (
                  <>
                    <div>
                      <p className="text-xs text-gray-500">Quantity × Unit Cost</p>
                      <p className="text-sm text-gray-700">
                        {expense.quantity} × {formatCurrency(expense.costPerItem)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Total Cost</p>
                      <p className="font-semibold text-gray-900">{formatCurrency(expense.totalCost)}</p>
                    </div>
                  </>
                )}
                <div>
                  <p className="text-xs text-gray-500">Amount Paid</p>
                  <p className="font-semibold text-green-600">{formatCurrency(expense.amountPaid)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Balance Remaining</p>
                  <p className="font-semibold text-red-600">{formatCurrency(expense.balanceRemaining)}</p>
                </div>
              </div>
            </div>

            {/* Payment Options */}
            {expense.balanceRemaining > 0 && (
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Payment Options</h3>

                {/* Partial Payment */}
                <div className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-orange-600" />
                    <h4 className="font-semibold text-gray-900">Record Partial Payment</h4>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Payment Amount</Label>
                    <Input
                      type="number"
                      placeholder="Enter amount"
                      value={paymentAmount}
                      onChange={(e) => setPaymentAmount(e.target.value)}
                      min="0"
                      max={expense.balanceRemaining}
                      step="1000"
                    />
                    <p className="text-xs text-gray-500">
                      Maximum: {formatCurrency(expense.balanceRemaining)}
                    </p>
                  </div>

                  <Button
                    onClick={handlePartialPayment}
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                    disabled={!paymentAmount || parseFloat(paymentAmount) <= 0}
                  >
                    Record Partial Payment
                  </Button>
                </div>

                {/* Full Payment */}
                <div className="border rounded-lg p-4 space-y-3 bg-green-50 border-green-200">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <h4 className="font-semibold text-gray-900">Record Full Payment</h4>
                  </div>
                  
                  <p className="text-sm text-gray-700">
                    This will mark the expense as fully paid by adding {formatCurrency(expense.balanceRemaining)} to the amount paid.
                  </p>

                  <Button
                    onClick={handleFullPayment}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                  >
                    Pay Full Balance ({formatCurrency(expense.balanceRemaining)})
                  </Button>
                </div>
              </div>
            )}

            {expense.balanceRemaining === 0 && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
                <div>
                  <p className="font-semibold text-green-900">Fully Paid</p>
                  <p className="text-sm text-green-700">This expense has been completely paid</p>
                </div>
              </div>
            )}

            {/* Payment History */}
            {expense.paymentHistory && expense.paymentHistory.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <History className="h-5 w-5 text-gray-600" />
                  <h3 className="font-semibold text-gray-900">Payment History</h3>
                </div>

                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-3 py-2 text-left font-semibold">Date</th>
                        <th className="px-3 py-2 text-left font-semibold">Type</th>
                        <th className="px-3 py-2 text-right font-semibold">Amount</th>
                        <th className="px-3 py-2 text-right font-semibold">Balance After</th>
                        <th className="px-3 py-2 text-left font-semibold">Recorded By</th>
                      </tr>
                    </thead>
                    <tbody>
                      {expense.paymentHistory.map((payment, index) => (
                        <tr key={payment.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-3 py-2 text-xs">
                            {new Date(payment.dateOfTransaction).toLocaleDateString('en-UG', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </td>
                          <td className="px-3 py-2">
                            <Badge
                              variant="outline"
                              className={payment.paymentType === 'Full' ? 'text-green-600' : 'text-orange-600'}
                            >
                              {payment.paymentType}
                            </Badge>
                          </td>
                          <td className="px-3 py-2 text-right font-semibold text-green-600">
                            +{formatCurrency(payment.additionalAmountPaid)}
                          </td>
                          <td className="px-3 py-2 text-right">
                            {formatCurrency(payment.balanceAfterPayment)}
                          </td>
                          <td className="px-3 py-2 text-xs">{payment.recordedBy}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        ) : (
          // Confirmation Screen
          <div className="space-y-4">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3">
              <AlertCircle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-amber-900">Confirm Full Payment</p>
                <p className="text-sm text-amber-700 mt-1">
                  Are you sure you want to record a full payment of {formatCurrency(expense.balanceRemaining)}?
                </p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Item:</span>
                <span className="font-semibold">{expense.itemPurchased || expense.description}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Previous Amount Paid:</span>
                <span className="font-semibold">{formatCurrency(expense.amountPaid)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Additional Payment:</span>
                <span className="font-semibold text-green-600">+{formatCurrency(expense.balanceRemaining)}</span>
              </div>
              <div className="border-t pt-2 flex justify-between">
                <span className="text-gray-900 font-semibold">New Total Paid:</span>
                <span className="font-bold text-green-600">{formatCurrency(expense.totalCost)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">New Balance:</span>
                <span className="font-semibold text-green-600">{formatCurrency(0)}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setShowConfirmation(false);
                  setPaymentType(null);
                }}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={confirmFullPayment}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              >
                Confirm Payment
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}