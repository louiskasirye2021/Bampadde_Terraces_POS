import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ScrollArea } from './ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Badge } from './ui/badge';
import { CreditSale } from '../utils/mockData';
import { CreditCard, DollarSign, User, Phone, Eye, Check } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface CreditSalesProps {
  creditSales: CreditSale[];
  onPayCredit: (id: string, amount: number) => void;
}

export function CreditSales({ creditSales, onPayCredit }: CreditSalesProps) {
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [selectedSale, setSelectedSale] = useState<CreditSale | null>(null);
  const [paymentAmount, setPaymentAmount] = useState('');

  const totalOwed = creditSales.reduce((sum, sale) => sum + sale.amountOwed, 0);
  const pendingSales = creditSales.filter(s => s.status === 'pending' || s.status === 'partial').length;

  const handlePayment = (sale: CreditSale) => {
    setSelectedSale(sale);
    setPaymentAmount(sale.amountOwed.toString());
    setShowPaymentDialog(true);
  };

  const handleViewDetails = (sale: CreditSale) => {
    setSelectedSale(sale);
    setShowDetailsDialog(true);
  };

  const handleConfirmPayment = () => {
    if (!selectedSale) return;

    const amount = parseFloat(paymentAmount);
    if (isNaN(amount) || amount <= 0) {
      toast.error('Invalid payment amount');
      return;
    }

    if (amount > selectedSale.amountOwed) {
      toast.error('Payment amount exceeds amount owed');
      return;
    }

    onPayCredit(selectedSale.id, amount);
    setShowPaymentDialog(false);
    setSelectedSale(null);
    setPaymentAmount('');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-700';
      case 'partial':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-orange-100 text-orange-700';
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      <div className="bg-gradient-to-r from-black to-gray-900 text-white p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-orange-400">Credit Sales</h2>
            <p className="text-sm opacity-90">Track customer credit transactions</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4 flex-1 overflow-auto">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card className="p-4 bg-white border-orange-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Amount Owed</p>
                <p className="text-orange-600">UGX {totalOwed.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-orange-600" />
            </div>
          </Card>

          <Card className="p-4 bg-white border-orange-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Credits</p>
                <p className="text-orange-600">{pendingSales} Customers</p>
              </div>
              <CreditCard className="h-8 w-8 text-orange-600" />
            </div>
          </Card>
        </div>

        {/* Credit Sales List */}
        <Card className="flex-1 bg-white">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-gray-900">Credit Transactions</h3>
          </div>
          <ScrollArea className="h-[calc(100vh-400px)]">
            <div className="p-4">
              {creditSales.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <CreditCard className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                  <p>No credit sales recorded</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {creditSales.map((sale) => (
                    <Card key={sale.id} className="p-4 border border-gray-200">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="text-gray-900">{sale.customerName}</h4>
                            <Badge className={getStatusColor(sale.status)}>
                              {sale.status.toUpperCase()}
                            </Badge>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm text-gray-600">
                              <Phone className="h-3 w-3 inline mr-1" />
                              {sale.customerContact}
                            </p>
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Table:</span> {sale.tableInfo}
                            </p>
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Total:</span> UGX {sale.total.toLocaleString()}
                            </p>
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Paid:</span> UGX {sale.amountPaid.toLocaleString()}
                            </p>
                            <p className="text-sm text-orange-600">
                              <span className="font-medium">Amount Owed:</span> UGX {sale.amountOwed.toLocaleString()}
                            </p>
                            <p className="text-xs text-gray-500">
                              {new Date(sale.date).toLocaleString('en-UG')} • {sale.recordedBy}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleViewDetails(sale)}
                          variant="outline"
                          className="flex-1 border-gray-300"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Details
                        </Button>
                        {sale.status !== 'paid' && (
                          <Button
                            size="sm"
                            onClick={() => handlePayment(sale)}
                            className="flex-1 bg-orange-600 hover:bg-orange-700 text-white"
                          >
                            <Check className="h-4 w-4 mr-2" />
                            Record Payment
                          </Button>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </ScrollArea>
        </Card>
      </div>

      {/* Payment Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="bg-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-orange-600">Record Credit Payment</DialogTitle>
            <DialogDescription>
              {selectedSale && `${selectedSale.customerName} - UGX ${selectedSale.amountOwed.toLocaleString()} owed`}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="amount">Payment Amount (UGX)</Label>
              <Input
                id="amount"
                type="number"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                className="bg-white"
                placeholder="Enter amount"
                min="0"
                step="1000"
              />
              {selectedSale && (
                <p className="text-xs text-gray-500 mt-1">
                  Maximum: UGX {selectedSale.amountOwed.toLocaleString()}
                </p>
              )}
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handleConfirmPayment}
                className="flex-1 bg-orange-600 hover:bg-orange-700 text-white"
              >
                Confirm Payment
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowPaymentDialog(false)}
                className="flex-1 border-gray-300"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="bg-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-orange-600">Credit Sale Details</DialogTitle>
            <DialogDescription>
              {selectedSale 
                ? `${selectedSale.customerName} - ${selectedSale.customerContact}`
                : 'View credit sale information'}
            </DialogDescription>
          </DialogHeader>

          {selectedSale && (
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-3">
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-medium">Table:</span> {selectedSale.tableInfo}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-medium">Date:</span> {new Date(selectedSale.date).toLocaleString('en-UG')}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Recorded By:</span> {selectedSale.recordedBy}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2 text-gray-900">Items</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {selectedSale.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm border-b border-gray-100 pb-2">
                      <span className="text-gray-900">
                        {item.productName} x{item.quantity}
                      </span>
                      <span className="text-gray-900">UGX {item.total.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-200 pt-3 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total:</span>
                  <span className="text-gray-900">UGX {selectedSale.total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Paid:</span>
                  <span className="text-gray-900">UGX {selectedSale.amountPaid.toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-2">
                  <span className="font-medium text-gray-900">Amount Owed:</span>
                  <span className="font-medium text-orange-600">
                    UGX {selectedSale.amountOwed.toLocaleString()}
                  </span>
                </div>
              </div>

              <Button
                onClick={() => setShowDetailsDialog(false)}
                variant="outline"
                className="w-full border-gray-300"
              >
                Close
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}