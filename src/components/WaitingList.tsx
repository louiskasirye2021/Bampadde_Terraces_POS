import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Order } from '../utils/mockData';
import { Clock, Edit, Trash2, CreditCard, Eye, ArrowRight, Combine, Search } from 'lucide-react';

interface WaitingListProps {
  orders: Order[];
  onRetrieveOrder: (order: Order) => void;
  onDeleteOrder: (orderId: string) => void;
  onPayOrder: (order: Order) => void;
  onChangeTable?: (order: Order) => void;
  onMergeTable?: (order: Order) => void;
}

export function WaitingList({ 
  orders, 
  onRetrieveOrder, 
  onDeleteOrder, 
  onPayOrder,
  onChangeTable,
  onMergeTable,
}: WaitingListProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('en-UG', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getOrderDuration = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ${minutes % 60}m ago`;
  };

  // Filter orders based on search term
  const filteredOrders = orders.filter(order => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    
    // Search in table number
    if (order.tableNumber.toString().toLowerCase().includes(searchLower)) return true;
    
    // Search in table color
    if (order.tableColor.toLowerCase().includes(searchLower)) return true;
    
    // Search in waiter name
    if (order.waiterName.toLowerCase().includes(searchLower)) return true;
    
    // Search in order items
    return order.items.some(item => 
      item.productName.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="h-full flex flex-col bg-gray-50">
      <div className="bg-gradient-to-r from-black to-gray-900 text-white p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-orange-400">Waiting List</h2>
            <p className="text-sm opacity-90">{filteredOrders.length} orders pending</p>
          </div>
          <Clock className="h-8 w-8 text-orange-400" />
        </div>
        
        {/* Search Bar */}
        <div className="mt-4 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search by table number, color, waiter, or items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20"
          />
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        {filteredOrders.length === 0 ? (
          <div className="text-center text-gray-400 py-12">
            <Clock className="h-16 w-16 mx-auto mb-3 opacity-50" />
            <p>{searchTerm ? 'No orders match your search' : 'No orders in waiting list'}</p>
            <p className="text-sm mt-1">{searchTerm ? 'Try a different search term' : 'Saved orders will appear here'}</p>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filteredOrders.map((order) => (
              <Card key={order.id} className="p-4 border-2 border-orange-200 hover:shadow-lg transition-shadow">
                <div className="space-y-3">
                  {/* Header */}
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-orange-600">
                        {order.tableNumber} {order.tableColor}
                      </p>
                      <p className="text-sm text-gray-600">Waiter: {order.waiterName}</p>
                    </div>
                    <Badge variant="outline" className="border-orange-500 text-orange-600">
                      {order.status}
                    </Badge>
                  </div>

                  {/* Time Info */}
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Clock className="h-3 w-3" />
                    <span>{formatTime(order.timestamp)}</span>
                    <span>•</span>
                    <span>{getOrderDuration(order.timestamp)}</span>
                  </div>

                  {/* Order Items */}
                  <div className="bg-gray-50 rounded p-2 space-y-1 max-h-32 overflow-y-auto">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          {item.quantity}x {item.productName}
                        </span>
                        <span className="text-gray-900">
                          {item.total.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Total */}
                  <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                    <span className="text-gray-700">Total:</span>
                    <span className="text-orange-600">
                      UGX {order.total.toLocaleString()}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-5 gap-1 sm:grid-cols-5 sm:gap-2">
                    <Button
                      size="sm"
                      onClick={() => onRetrieveOrder(order)}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                      title="Edit Order"
                    >
                      <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => onPayOrder(order)}
                      className="bg-green-600 hover:bg-green-700 text-white"
                      title="Process Payment"
                    >
                      <CreditCard className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                    {onChangeTable && (
                      <Button
                        size="sm"
                        onClick={() => onChangeTable(order)}
                        className="bg-purple-600 hover:bg-purple-700 text-white"
                        title="Change Table"
                      >
                        <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
                      </Button>
                    )}
                    {onMergeTable && (
                      <Button
                        size="sm"
                        onClick={() => onMergeTable(order)}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white"
                        title="Merge Table"
                      >
                        <Combine className="h-3 w-3 sm:h-4 sm:w-4" />
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => onDeleteOrder(order.id)}
                      title="Delete Order"
                    >
                      <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
