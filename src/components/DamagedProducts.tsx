import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { ScrollArea } from './ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { DamagedProduct, Product } from '../utils/mockData';
import { AlertTriangle, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface DamagedProductsProps {
  damagedProducts: DamagedProduct[];
  products: Product[];
  onAddDamaged: (damaged: Omit<DamagedProduct, 'id' | 'date' | 'recordedBy'>) => void;
  onDeleteDamaged: (id: string) => void;
}

export function DamagedProducts({ damagedProducts, products, onAddDamaged, onDeleteDamaged }: DamagedProductsProps) {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [reason, setReason] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedProduct || !quantity || !reason) {
      toast.error('Please fill all fields');
      return;
    }

    const product = products.find(p => p.id === selectedProduct);
    if (!product) {
      toast.error('Product not found');
      return;
    }

    const qty = parseInt(quantity);
    if (qty <= 0 || qty > product.stock) {
      toast.error(`Invalid quantity. Available stock: ${product.stock}`);
      return;
    }

    onAddDamaged({
      productId: product.id,
      productName: product.name,
      quantity: qty,
      reason,
    });

    // Reset form
    setSelectedProduct('');
    setQuantity('1');
    setReason('');
    setShowAddDialog(false);
  };

  const totalDamagedValue = damagedProducts.reduce((sum, item) => {
    const product = products.find(p => p.id === item.productId);
    return sum + (product ? product.cost * item.quantity : 0);
  }, 0);

  return (
    <div className="h-full flex flex-col bg-gray-50">
      <div className="bg-gradient-to-r from-black to-gray-900 text-white p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-orange-400">Damaged Products</h2>
            <p className="text-sm opacity-90">Track and manage damaged inventory</p>
          </div>
          <Button
            onClick={() => setShowAddDialog(true)}
            className="bg-orange-600 hover:bg-orange-700 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Record Damaged
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-4 flex-1 overflow-auto">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card className="p-4 bg-white border-orange-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Damaged Items</p>
                <p className="text-orange-600">
                  {damagedProducts.reduce((sum, item) => sum + item.quantity, 0)} Units
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-600" />
            </div>
          </Card>

          <Card className="p-4 bg-white border-orange-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Value Lost</p>
                <p className="text-orange-600">UGX {totalDamagedValue.toLocaleString()}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-600" />
            </div>
          </Card>
        </div>

        {/* Damaged Products List */}
        <Card className="flex-1 bg-white">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-gray-900">Damaged Products History</h3>
          </div>
          <ScrollArea className="h-[calc(100vh-400px)]">
            <div className="p-4">
              {damagedProducts.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <AlertTriangle className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                  <p>No damaged products recorded</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {damagedProducts.map((item) => {
                    const product = products.find(p => p.id === item.productId);
                    const valueLost = product ? product.cost * item.quantity : 0;
                    
                    return (
                      <Card key={item.id} className="p-4 border border-gray-200">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="text-gray-900">{item.productName}</h4>
                              <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs rounded">
                                {item.quantity} units
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-1">
                              <span className="font-medium">Reason:</span> {item.reason}
                            </p>
                            <p className="text-sm text-gray-600 mb-1">
                              <span className="font-medium">Value Lost:</span> UGX {valueLost.toLocaleString()}
                            </p>
                            <p className="text-xs text-gray-500">
                              {new Date(item.date).toLocaleString('en-UG')} • {item.recordedBy}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onDeleteDamaged(item.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              )}
            </div>
          </ScrollArea>
        </Card>
      </div>

      {/* Add Damaged Product Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="bg-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-orange-600">Record Damaged Product</DialogTitle>
            <DialogDescription>
              This will subtract the damaged quantity from inventory
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="product">Product</Label>
              <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                <SelectTrigger id="product" className="bg-white">
                  <SelectValue placeholder="Select product" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {products
                    .filter(p => p.stock > 0)
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((product) => (
                      <SelectItem key={product.id} value={product.id}>
                        {product.name} (Stock: {product.stock})
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="bg-white"
                required
              />
            </div>

            <div>
              <Label htmlFor="reason">Reason</Label>
              <Textarea
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="bg-white"
                placeholder="e.g., Broken bottle, Expired, Spillage..."
                required
                rows={3}
              />
            </div>

            <div className="flex gap-2">
              <Button
                type="submit"
                className="flex-1 bg-orange-600 hover:bg-orange-700 text-white"
              >
                Record Damaged
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowAddDialog(false)}
                className="flex-1 border-gray-300"
              >
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}