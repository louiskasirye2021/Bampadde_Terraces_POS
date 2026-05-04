import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { 
  Receipt, 
  Calendar, 
  User, 
  CreditCard, 
  ShoppingBag,
  DollarSign,
  Clock,
  X,
  ArrowRight,
  Combine
} from 'lucide-react';
import { Order } from '../utils/mockData';

interface OrderDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  order: Order | null;
}

export function OrderDetailsDialog({ open, onClose, order }: OrderDetailsDialogProps) {
  if (!order) return null;

  const formatCurrency = (amount: number) => `UGX ${amount.toLocaleString()}`;
  const formatDate = (date: Date) => new Date(date).toLocaleDateString('en-UG', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  const formatTime = (date: Date) => new Date(date).toLocaleTimeString('en-UG', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const subtotal = order.items.reduce((sum, item) => sum + item.total, 0);
  const discount = order.discount || 0;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Receipt className="h-6 w-6 text-orange-600" />
            Order Details
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Complete details for order {order.id}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1 min-h-[400px] pr-4">
          <div className="space-y-6">
            {/* Order Header Info */}
            <div>
              <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">Order Information</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Card className="p-3 border-l-4 border-l-gray-400">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Order ID</p>
                  <p className="font-mono font-semibold text-sm">{order.id}</p>
                </Card>

                <Card className="p-3 border-l-4 border-l-blue-400">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Date & Time</p>
                  <p className="font-semibold text-sm">{formatDate(order.timestamp)}</p>
                  <p className="text-xs text-gray-500">{formatTime(order.timestamp)}</p>
                </Card>

                <Card className="p-3 border-l-4 border-l-purple-400">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Waiter</p>
                  <p className="font-semibold text-sm">{order.waiterName}</p>
                </Card>

                <Card className="p-3 border-l-4 border-l-orange-400">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Table</p>
                  <p className="font-semibold text-sm">
                    {order.tableNumber} <Badge variant="outline" className="text-xs ml-1">{order.tableColor}</Badge>
                  </p>
                </Card>
              </div>
            </div>

            {/* Status & Payment */}
            <div>
              <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">Status</h2>
              <Card className="p-4 flex items-center gap-4">
                <Badge 
                  className={`text-sm px-3 py-2 ${
                    order.status === 'paid' 
                      ? 'bg-green-100 text-green-800' 
                      : order.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {order.status.toUpperCase()}
                </Badge>
                
                {order.paymentMethod && (
                  <div className="flex items-center gap-2 text-sm">
                    <CreditCard className="h-4 w-4 text-orange-600" />
                    <span className="text-gray-600 font-medium">Payment:</span>
                    <span className="font-semibold">{order.paymentMethod}</span>
                  </div>
                )}
              </Card>
            </div>

            {/* Merge/Table Change History */}
            {(order.mergeTag || order.mergeHistory) && (
              <div>
                <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">Table History</h2>
                <Card className="p-4 bg-blue-50 border-blue-200">
                  {order.mergeTag && (
                    <p className="text-sm text-blue-800 mb-3 flex items-center gap-2">
                      ℹ️ {order.mergeTag}
                    </p>
                  )}
                  {order.mergeHistory && order.mergeHistory.length > 0 && (
                    <div className="space-y-2">
                      {order.mergeHistory.map((history, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm p-2 bg-white rounded border border-blue-100">
                          <span className="font-semibold text-gray-900">{history.fromTable}</span>
                          {history.action === 'change' ? (
                            <ArrowRight className="h-4 w-4 text-purple-600" />
                          ) : (
                            <Combine className="h-4 w-4 text-blue-600" />
                          )}
                          <span className="font-semibold text-gray-900">{history.toTable}</span>
                          <span className="text-xs text-gray-500 ml-auto">
                            {new Date(history.timestamp).toLocaleTimeString('en-UG', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
              </div>
            )}

            {/* Items Table */}
            <div>
              <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">Order Items ({order.items.length})</h2>
              <Card className="p-4">
                <Table>
                  <TableHeader>
                    <TableRow className="border-b-2 border-gray-200">
                      <TableHead className="w-[50px] font-semibold">#</TableHead>
                      <TableHead className="font-semibold">Item</TableHead>
                      <TableHead className="font-semibold">Category</TableHead>
                      <TableHead className="text-center font-semibold">Qty</TableHead>
                      <TableHead className="text-right font-semibold">Price</TableHead>
                      <TableHead className="text-right font-semibold">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {order.items.map((item, index) => (
                      <TableRow key={`${item.productId}-${index}`} className="hover:bg-gray-50">
                        <TableCell className="font-semibold text-gray-700">{index + 1}</TableCell>
                        <TableCell className="font-medium text-gray-900">{item.productName}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">
                            {item.category}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center font-semibold">{item.quantity}</TableCell>
                        <TableCell className="text-right text-gray-700">{formatCurrency(item.price)}</TableCell>
                        <TableCell className="text-right font-bold text-gray-900">
                          {formatCurrency(item.total)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">Order Summary</h2>
              <Card className="p-4 bg-gradient-to-r from-orange-50 to-white border-orange-100">
              <div className="space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-orange-200">
                  <span className="text-gray-600 font-medium">Subtotal</span>
                  <span className="font-semibold text-gray-900">{formatCurrency(subtotal)}</span>
                </div>
                
                {discount > 0 && (
                  <div className="flex justify-between items-center pb-2 border-b border-orange-200">
                    <span className="text-gray-600 font-medium">Discount</span>
                    <span className="font-semibold text-red-600">-{formatCurrency(discount)}</span>
                  </div>
                )}
                
                <div className="flex justify-between items-center pt-2 bg-orange-100 -mx-4 -mb-4 px-4 py-3 rounded-b">
                  <span className="font-bold text-lg text-gray-900">Total Amount</span>
                  <span className="font-bold text-2xl text-orange-600">
                    {formatCurrency(order.total)}
                  </span>
                </div>

                {order.status === 'paid' && order.amountPaid !== undefined && (
                  <div className="space-y-2 pt-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Amount Paid</span>
                      <span className="font-semibold text-green-600">{formatCurrency(order.amountPaid)}</span>
                    </div>
                    {order.change !== undefined && order.change > 0 && (
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Change</span>
                        <span className="font-semibold text-green-600">
                          {formatCurrency(order.change)}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </Card>
            </div>

            {/* Session Info */}
            {order.sessionId && (
              <Card className="p-3 bg-gray-50 border-l-4 border-l-gray-300">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <div className="flex flex-wrap gap-3">
                    <div>
                      <span className="text-gray-600 text-xs">Session:</span>
                      <span className="font-mono text-xs ml-1">{order.sessionId}</span>
                    </div>
                    {order.sessionDate && (
                      <div>
                        <span className="text-gray-600 text-xs">Date:</span>
                        <span className="text-xs ml-1">{formatDate(order.sessionDate)}</span>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            )}
          </div>
        </ScrollArea>

      </DialogContent>
    </Dialog>
  );
}
