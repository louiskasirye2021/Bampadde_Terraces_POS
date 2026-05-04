import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Product, OrderItem, categories, mockProducts } from '../utils/mockData';
import { Plus, Minus, Trash2, ShoppingCart, Search, FileText } from 'lucide-react';

interface OrderEntryProps {
  currentOrder: OrderItem[];
  onUpdateOrder: (items: OrderItem[]) => void;
  onSaveToWaiting: () => void;
  onProcessPayment: () => void;
  onPrintProforma: () => void;
  onCancelOrder: () => void;
  tableInfo: string;
}

export function OrderEntry({
  currentOrder,
  onUpdateOrder,
  onSaveToWaiting,
  onProcessPayment,
  onPrintProforma,
  onCancelOrder,
  tableInfo,
}: OrderEntryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0]);

  const filteredProducts = mockProducts.filter((product) => {
    const matchesCategory = product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToOrder = (product: Product) => {
    const existingItem = currentOrder.find((item) => item.productId === product.id);
    
    if (existingItem) {
      const updatedOrder = currentOrder.map((item) =>
        item.productId === product.id
          ? { ...item, quantity: item.quantity + 1, total: (item.quantity + 1) * item.price }
          : item
      );
      onUpdateOrder(updatedOrder);
    } else {
      const newItem: OrderItem = {
        productId: product.id,
        productName: product.name,
        quantity: 1,
        price: product.price,
        total: product.price,
      };
      onUpdateOrder([...currentOrder, newItem]);
    }
  };

  const updateQuantity = (productId: string, delta: number) => {
    const updatedOrder = currentOrder
      .map((item) => {
        if (item.productId === productId) {
          const newQuantity = item.quantity + delta;
          if (newQuantity <= 0) return null;
          return { ...item, quantity: newQuantity, total: newQuantity * item.price };
        }
        return item;
      })
      .filter((item): item is OrderItem => item !== null);
    
    onUpdateOrder(updatedOrder);
  };

  const removeItem = (productId: string) => {
    onUpdateOrder(currentOrder.filter((item) => item.productId !== productId));
  };

  const orderTotal = currentOrder.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-black to-gray-900 text-white p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-orange-400">New Order</h2>
            <p className="text-sm opacity-90">{tableInfo}</p>
          </div>
          <ShoppingCart className="h-8 w-8 text-orange-400" />
        </div>
      </div>

      <div className="flex-1 overflow-auto flex">
        {/* Products Section */}
        <div className="flex-1 flex flex-col p-4">
          {/* Search */}
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-gray-300"
              />
            </div>
          </div>

          {/* Category Tabs */}
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="flex-1 flex flex-col">
            <TabsList className="grid grid-cols-5 w-full bg-gray-200">
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="data-[state=active]:bg-orange-600 data-[state=active]:text-white"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>

            <ScrollArea className="flex-1 mt-4">
              <TabsContent value={selectedCategory} className="mt-0">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {filteredProducts.map((product) => (
                    <Card
                      key={product.id}
                      className="p-3 cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-orange-400"
                      onClick={() => addToOrder(product)}
                    >
                      <div className="space-y-2">
                        <div>
                          <p className="text-sm text-gray-900">{product.name}</p>
                          <p className="text-orange-600">
                            UGX {product.price.toLocaleString()}
                          </p>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <Badge
                            variant="outline"
                            className={product.stock <= product.lowStockThreshold ? 'border-red-500 text-red-600' : 'border-green-500 text-green-600'}
                          >
                            Stock: {product.stock}
                          </Badge>
                          <Plus className="h-4 w-4 text-orange-600" />
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </div>

        {/* Order Summary Section */}
        <div className="w-96 bg-white border-l border-gray-200 flex flex-col">
          <div className="bg-gray-900 text-white p-4">
            <h3 className="text-orange-400">Current Order</h3>
            <p className="text-sm opacity-80">{currentOrder.length} items</p>
          </div>

          <ScrollArea className="flex-1 p-4">
            {currentOrder.length === 0 ? (
              <div className="text-center text-gray-400 py-8">
                <ShoppingCart className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>No items added</p>
              </div>
            ) : (
              <div className="space-y-2">
                {currentOrder.map((item) => (
                  <Card key={item.productId} className="p-3 border-gray-200">
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <p className="text-sm text-gray-900">{item.productName}</p>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeItem(item.productId)}
                          className="h-6 w-6 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            onClick={() => updateQuantity(item.productId, -1)}
                            className="h-7 w-7 p-0 bg-gray-200 hover:bg-gray-300 text-gray-900"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-gray-900">{item.quantity}</span>
                          <Button
                            size="sm"
                            onClick={() => updateQuantity(item.productId, 1)}
                            className="h-7 w-7 p-0 bg-orange-600 hover:bg-orange-700 text-white"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <p className="text-orange-600">
                          UGX {item.total.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </ScrollArea>

          {/* Total and Actions */}
          <div className="border-t border-gray-200 p-4 space-y-3 bg-gray-50">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Total:</span>
              <span className="text-orange-600">
                UGX {orderTotal.toLocaleString()}
              </span>
            </div>

            <div className="space-y-2">
              <Button
                onClick={onProcessPayment}
                disabled={currentOrder.length === 0}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                Process Payment
              </Button>
              <Button
                onClick={onSaveToWaiting}
                disabled={currentOrder.length === 0}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white"
              >
                Save to Waiting List
              </Button>
              <Button
                onClick={onPrintProforma}
                disabled={currentOrder.length === 0}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                Print Proforma
              </Button>
              <Button
                onClick={onCancelOrder}
                variant="outline"
                className="w-full border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Cancel Order
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}