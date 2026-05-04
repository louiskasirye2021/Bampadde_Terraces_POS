import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Product, Supplier, PurchaseOrder, categories } from '../utils/mockData';
import { Package, AlertTriangle, Plus, Minus, TrendingUp, Users, Edit, Trash2, ShoppingCart, CheckCircle2, XCircle } from 'lucide-react';

interface InventoryManagementProps {
  products: Product[];
  suppliers: Supplier[];
  purchaseOrders: PurchaseOrder[];
  onUpdateStock: (productId: string, newStock: number) => void;
  onAddProduct: (product: Omit<Product, 'id'>) => void;
  onUpdateProduct: (productId: string, updates: Partial<Product>) => void;
  onDeleteProduct: (productId: string) => void;
  onAddSupplier: (supplier: Omit<Supplier, 'id'>) => void;
  onUpdateSupplier: (supplierId: string, updates: Partial<Supplier>) => void;
  onDeleteSupplier: (supplierId: string) => void;
  onAddPurchaseOrder: (purchaseOrder: Omit<PurchaseOrder, 'id' | 'date'>) => void;
  onUpdatePurchaseOrder: (orderId: string, status: 'pending' | 'received' | 'cancelled') => void;
}

export function InventoryManagement({
  products,
  suppliers,
  purchaseOrders,
  onUpdateStock,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onAddSupplier,
  onUpdateSupplier,
  onDeleteSupplier,
  onAddPurchaseOrder,
  onUpdatePurchaseOrder,
}: InventoryManagementProps) {
  console.log('InventoryManagement render — products:', products.length);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [adjustmentAmount, setAdjustmentAmount] = useState('');
  const [adjustmentType, setAdjustmentType] = useState<'add' | 'remove'>('add');
  const [showAdjustDialog, setShowAdjustDialog] = useState(false);
  
  // Add Product Dialog
  const [showAddProductDialog, setShowAddProductDialog] = useState(false);
  const [newProductName, setNewProductName] = useState('');
  const [newProductCategory, setNewProductCategory] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [newProductCost, setNewProductCost] = useState('');
  const [newProductStock, setNewProductStock] = useState('');
  const [newProductThreshold, setNewProductThreshold] = useState('');
  
  // Purchase Order Dialog
  const [showPurchaseDialog, setShowPurchaseDialog] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState('');
  const [poItems, setPoItems] = useState<{ productId: string; quantity: number; cost: number }[]>([]);
  const [poProductId, setPoProductId] = useState('');
  const [poQuantity, setPoQuantity] = useState('');
  const [poCost, setpoCost] = useState('');
  
  // Product Detail/Edit Dialog
  const [showProductDetailDialog, setShowProductDetailDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editProductName, setEditProductName] = useState('');
  const [editProductCategory, setEditProductCategory] = useState('');
  const [editProductPrice, setEditProductPrice] = useState('');
  const [editProductCost, setEditProductCost] = useState('');
  const [editProductStock, setEditProductStock] = useState('');
  const [editProductThreshold, setEditProductThreshold] = useState('');

  const lowStockProducts = products.filter(p => p.stock <= p.lowStockThreshold);

  const handleStockAdjustment = () => {
    if (selectedProduct && adjustmentAmount) {
      const amount = parseInt(adjustmentAmount);
      const newStock = adjustmentType === 'add'
        ? selectedProduct.stock + amount
        : Math.max(0, selectedProduct.stock - amount);
      
      onUpdateStock(selectedProduct.id, newStock);
      setShowAdjustDialog(false);
      setSelectedProduct(null);
      setAdjustmentAmount('');
    }
  };

  const openAdjustDialog = (product: Product, type: 'add' | 'remove') => {
    setSelectedProduct(product);
    setAdjustmentType(type);
    setShowAdjustDialog(true);
  };

  const handleAddProduct = () => {
    if (newProductName && newProductCategory && newProductPrice && newProductCost && newProductStock && newProductThreshold) {
      onAddProduct({
        name: newProductName,
        category: newProductCategory,
        price: parseFloat(newProductPrice),
        cost: parseFloat(newProductCost),
        stock: parseInt(newProductStock),
        lowStockThreshold: parseInt(newProductThreshold),
      });
      
      // Reset form
      setNewProductName('');
      setNewProductCategory('');
      setNewProductPrice('');
      setNewProductCost('');
      setNewProductStock('');
      setNewProductThreshold('');
      setShowAddProductDialog(false);
    }
  };

  const handleAddPOItem = () => {
    if (poProductId && poQuantity && poCost) {
      setPoItems([...poItems, {
        productId: poProductId,
        quantity: parseInt(poQuantity),
        cost: parseFloat(poCost),
      }]);
      setPoProductId('');
      setPoQuantity('');
      setpoCost('');
    }
  };

  const handleRemovePOItem = (index: number) => {
    setPoItems(poItems.filter((_, i) => i !== index));
  };

  const handleCreatePurchaseOrder = () => {
    if (selectedSupplier && poItems.length > 0) {
      const total = poItems.reduce((sum, item) => sum + (item.quantity * item.cost), 0);
      onAddPurchaseOrder({
        supplierId: selectedSupplier,
        items: poItems,
        total,
        status: 'pending',
      });
      
      // Reset form
      setSelectedSupplier('');
      setPoItems([]);
      setShowPurchaseDialog(false);
    }
  };

  const openSupplierDialog = (supplier?: Supplier) => {
    if (supplier) {
      setEditingSupplier(supplier);
      setSupplierName(supplier.name);
      setSupplierContact(supplier.contact);
      setSupplierEmail(supplier.email);
    } else {
      setEditingSupplier(null);
      setSupplierName('');
      setSupplierContact('');
      setSupplierEmail('');
    }
    setShowSupplierDialog(true);
  };

  const handleSaveSupplier = () => {
    if (supplierName && supplierContact && supplierEmail) {
      if (editingSupplier) {
        onUpdateSupplier(editingSupplier.id, {
          name: supplierName,
          contact: supplierContact,
          email: supplierEmail,
        });
      } else {
        onAddSupplier({
          name: supplierName,
          contact: supplierContact,
          email: supplierEmail,
        });
      }
      setShowSupplierDialog(false);
    }
  };

  const openProductDetailDialog = (product: Product, editMode: boolean = false) => {
    setEditingProduct(product);
    if (editMode) {
      setEditProductName(product.name);
      setEditProductCategory(product.category);
      setEditProductPrice(product.price.toString());
      setEditProductCost(product.cost.toString());
      setEditProductStock(product.stock.toString());
      setEditProductThreshold(product.lowStockThreshold.toString());
    }
    setShowProductDetailDialog(true);
  };

  const handleSaveProduct = () => {
    if (editingProduct && editProductName && editProductCategory && editProductPrice && editProductCost && editProductStock && editProductThreshold) {
      onUpdateProduct(editingProduct.id, {
        name: editProductName,
        category: editProductCategory,
        price: parseFloat(editProductPrice),
        cost: parseFloat(editProductCost),
        stock: parseInt(editProductStock),
        lowStockThreshold: parseInt(editProductThreshold),
      });
      setShowProductDetailDialog(false);
      setEditingProduct(null);
    }
  };

  const handleDeleteProduct = (productId: string) => {
    if (confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      onDeleteProduct(productId);
      setShowProductDetailDialog(false);
      setEditingProduct(null);
    }
  };

  const getSupplierName = (supplierId: string) => {
    return suppliers.find(s => s.id === supplierId)?.name || 'Unknown';
  };

  const getProductName = (productId: string) => {
    return products.find(p => p.id === productId)?.name || 'Unknown';
  };

  const handleReceivePO = (orderId: string, order: PurchaseOrder) => {
    // Update stock for all items in the purchase order
    order.items.forEach(item => {
      const product = products.find(p => p.id === item.productId);
      if (product) {
        onUpdateStock(product.id, product.stock + item.quantity);
      }
    });
    onUpdatePurchaseOrder(orderId, 'received');
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* DEBUG BANNER - remove after diagnosis */}
      <div data-debug-inventory className="text-sm text-red-700 bg-yellow-50 px-3 py-2">INVENTORY DEBUG: products={products.length}</div>
      <div className="bg-gradient-to-r from-black to-gray-900 text-white p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-orange-400">Inventory Management</h2>
            <p className="text-sm opacity-90">{products.length} products tracked</p>
          </div>
          <Package className="h-8 w-8 text-orange-400" />
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <Tabs defaultValue="all" className="h-full flex flex-col">
          <TabsList className="mx-4 mt-4 grid w-auto grid-cols-4 bg-gray-200">
            <TabsTrigger value="all" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white">
              All Stock
            </TabsTrigger>
            <TabsTrigger value="low" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white">
              Low Stock ({lowStockProducts.length})
            </TabsTrigger>
            <TabsTrigger value="purchase" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white">
              Purchase Orders ({purchaseOrders.length})
            </TabsTrigger>
            <TabsTrigger value="suppliers" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white">
              Suppliers ({suppliers.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="flex-1 mt-4 overflow-auto">
            <div className="px-4 mb-4">
              <Button
                onClick={() => setShowAddProductDialog(true)}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New Product
              </Button>
            </div>
            
            <div className="px-4 space-y-4 pb-4">
              {categories.map((category) => {
                const categoryProducts = products.filter(p => p.category === category);
                if (categoryProducts.length === 0) return null;
                
                return (
                  <div key={category}>
                    <h3 className="text-gray-700 mb-2">{category}</h3>
                    <div className="grid gap-2">
                      {categoryProducts.map((product) => (
                        <Card 
                          key={product.id} 
                          className="p-3 cursor-pointer hover:bg-gray-50 transition-colors"
                          onClick={() => openProductDetailDialog(product)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <p className="text-gray-900">{product.name}</p>
                              <div className="flex items-center gap-3 mt-1">
                                <Badge
                                  variant="outline"
                                  className={
                                    product.stock <= product.lowStockThreshold
                                      ? 'border-red-500 text-red-600'
                                      : 'border-green-500 text-green-600'
                                  }
                                >
                                  Stock: {product.stock}
                                </Badge>
                                {product.stock <= product.lowStockThreshold && (
                                  <div className="flex items-center gap-1 text-red-600 text-xs">
                                    <AlertTriangle className="h-3 w-3" />
                                    Low Stock
                                  </div>
                                )}
                                <span className="text-xs text-gray-500">
                                  Threshold: {product.lowStockThreshold}
                                </span>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <div className="text-right mr-3">
                                <p className="text-sm text-gray-600">Cost: UGX {product.cost.toLocaleString()}</p>
                                <p className="text-sm text-orange-600">Price: UGX {product.price.toLocaleString()}</p>
                              </div>
                              <Button
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openAdjustDialog(product, 'add');
                                }}
                                className="bg-green-600 hover:bg-green-700 text-white"
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openAdjustDialog(product, 'remove');
                                }}
                                className="bg-red-600 hover:bg-red-700 text-white"
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openProductDetailDialog(product, true);
                                }}
                                className="border-gray-300"
                              >
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteProduct(product.id);
                                }}
                                className="border-red-300 text-red-600 hover:bg-red-50"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="low" className="flex-1 mt-4">
            <ScrollArea className="h-full px-4">
              <div className="space-y-2 pb-4">
                {lowStockProducts.length === 0 ? (
                  <div className="text-center text-gray-400 py-12">
                    <Package className="h-16 w-16 mx-auto mb-3 opacity-50" />
                    <p>All products are well stocked</p>
                  </div>
                ) : (
                  lowStockProducts.map((product) => (
                    <Card key={product.id} className="p-3 border-2 border-red-200">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4 text-red-600" />
                            <p className="text-gray-900">{product.name}</p>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{product.category}</p>
                          <Badge variant="outline" className="border-red-500 text-red-600 mt-1">
                            Only {product.stock} left (Min: {product.lowStockThreshold})
                          </Badge>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => openAdjustDialog(product, 'add')}
                          className="bg-orange-600 hover:bg-orange-700 text-white"
                        >
                          Restock
                        </Button>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="purchase" className="flex-1 mt-4">
            <div className="px-4 pb-4 h-full flex flex-col">
              <Button
                onClick={() => setShowPurchaseDialog(true)}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white mb-4"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Purchase Order
              </Button>
              
              <ScrollArea className="flex-1">
                {purchaseOrders.length === 0 ? (
                  <div className="text-center text-gray-400 py-12">
                    <TrendingUp className="h-16 w-16 mx-auto mb-3 opacity-50" />
                    <p>No purchase orders yet</p>
                    <p className="text-sm mt-1">Create orders to track incoming stock</p>
                  </div>
                ) : (
                  <div className="space-y-3 pb-4">
                    {purchaseOrders.map((order) => (
                      <Card key={order.id} className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center gap-2">
                                <ShoppingCart className="h-4 w-4 text-orange-600" />
                                <p className="text-gray-900">PO #{order.id}</p>
                              </div>
                              <p className="text-sm text-gray-600 mt-1">
                                Supplier: {getSupplierName(order.supplierId)}
                              </p>
                              <p className="text-xs text-gray-500">
                                {new Date(order.date).toLocaleDateString('en-UG')}
                              </p>
                            </div>
                            <Badge
                              variant="outline"
                              className={
                                order.status === 'received'
                                  ? 'border-green-500 text-green-600'
                                  : order.status === 'cancelled'
                                  ? 'border-red-500 text-red-600'
                                  : 'border-orange-500 text-orange-600'
                              }
                            >
                              {order.status.toUpperCase()}
                            </Badge>
                          </div>

                          <div className="bg-gray-50 rounded p-2 space-y-1">
                            {order.items.map((item, idx) => (
                              <div key={idx} className="flex justify-between text-sm">
                                <span className="text-gray-600">
                                  {getProductName(item.productId)} x {item.quantity}
                                </span>
                                <span className="text-gray-900">
                                  UGX {(item.quantity * item.cost).toLocaleString()}
                                </span>
                              </div>
                            ))}
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t">
                            <span className="text-orange-600">
                              Total: UGX {order.total.toLocaleString()}
                            </span>
                            {order.status === 'pending' && (
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  onClick={() => handleReceivePO(order.id, order)}
                                  className="bg-green-600 hover:bg-green-700 text-white"
                                >
                                  <CheckCircle2 className="h-3 w-3 mr-1" />
                                  Receive
                                </Button>
                                <Button
                                  size="sm"
                                  onClick={() => onUpdatePurchaseOrder(order.id, 'cancelled')}
                                  className="bg-red-600 hover:bg-red-700 text-white"
                                >
                                  <XCircle className="h-3 w-3 mr-1" />
                                  Cancel
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </div>
          </TabsContent>

          <TabsContent value="suppliers" className="flex-1 mt-4">
            <div className="px-4 pb-4 h-full flex flex-col">
              <Button
                onClick={() => openSupplierDialog()}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white mb-4"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New Supplier
              </Button>
              
              <ScrollArea className="flex-1">
                <div className="space-y-2 pb-4">
                  {suppliers.map((supplier) => (
                    <Card key={supplier.id} className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          <Users className="h-5 w-5 text-orange-600 mt-1" />
                          <div className="flex-1">
                            <p className="text-gray-900">{supplier.name}</p>
                            <p className="text-sm text-gray-600 mt-1">{supplier.contact}</p>
                            <p className="text-sm text-gray-600">{supplier.email}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="border-gray-300"
                            onClick={() => openSupplierDialog(supplier)}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="border-red-300 text-red-600 hover:bg-red-50"
                            onClick={() => handleDeleteSupplier(supplier.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Stock Adjustment Dialog */}
      <Dialog open={showAdjustDialog} onOpenChange={setShowAdjustDialog}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>
              {adjustmentType === 'add' ? 'Add Stock' : 'Remove Stock'}
            </DialogTitle>
            <DialogDescription>
              Adjust the stock level for the selected product.
            </DialogDescription>
          </DialogHeader>
          
          {selectedProduct && (
            <div className="space-y-4 py-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Product</p>
                <p className="text-gray-900">{selectedProduct.name}</p>
                <p className="text-sm text-gray-600 mt-1">
                  Current Stock: {selectedProduct.stock}
                </p>
              </div>

              <div className="space-y-2">
                <Label>
                  {adjustmentType === 'add' ? 'Quantity to Add' : 'Quantity to Remove'}
                </Label>
                <Input
                  type="number"
                  value={adjustmentAmount}
                  onChange={(e) => setAdjustmentAmount(e.target.value)}
                  placeholder="Enter quantity"
                  className="border-gray-300"
                />
              </div>

              {adjustmentAmount && (
                <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
                  <p className="text-sm text-gray-600">New Stock Level:</p>
                  <p className="text-orange-600">
                    {adjustmentType === 'add'
                      ? selectedProduct.stock + parseInt(adjustmentAmount)
                      : Math.max(0, selectedProduct.stock - parseInt(adjustmentAmount))}
                  </p>
                </div>
              )}
            </div>
          )}

          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setShowAdjustDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleStockAdjustment}
              disabled={!adjustmentAmount}
              className="bg-orange-600 hover:bg-orange-700 text-white"
            >
              Confirm
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Product Dialog */}
      <Dialog open={showAddProductDialog} onOpenChange={setShowAddProductDialog}>
        <DialogContent className="bg-white max-w-2xl max-h-[90vh] flex flex-col">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle>Add New Product</DialogTitle>
            <DialogDescription>
              Add a new product to your inventory system.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4 overflow-y-auto flex-1">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Product Name *</Label>
                <Input
                  value={newProductName}
                  onChange={(e) => setNewProductName(e.target.value)}
                  placeholder="e.g., Bell Lager"
                  className="border-gray-300"
                />
              </div>

              <div className="space-y-2">
                <Label>Category *</Label>
                <Select value={newProductCategory} onValueChange={setNewProductCategory}>
                  <SelectTrigger className="border-gray-300">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Selling Price (UGX) *</Label>
                <Input
                  type="number"
                  value={newProductPrice}
                  onChange={(e) => setNewProductPrice(e.target.value)}
                  placeholder="e.g., 6000"
                  className="border-gray-300"
                />
              </div>

              <div className="space-y-2">
                <Label>Cost Price (UGX) *</Label>
                <Input
                  type="number"
                  value={newProductCost}
                  onChange={(e) => setNewProductCost(e.target.value)}
                  placeholder="e.g., 4000"
                  className="border-gray-300"
                />
              </div>

              <div className="space-y-2">
                <Label>Initial Stock Quantity *</Label>
                <Input
                  type="number"
                  value={newProductStock}
                  onChange={(e) => setNewProductStock(e.target.value)}
                  placeholder="e.g., 100"
                  className="border-gray-300"
                />
              </div>

              <div className="space-y-2">
                <Label>Low Stock Threshold *</Label>
                <Input
                  type="number"
                  value={newProductThreshold}
                  onChange={(e) => setNewProductThreshold(e.target.value)}
                  placeholder="e.g., 30"
                  className="border-gray-300"
                />
              </div>
            </div>

            {newProductPrice && newProductCost && (
              <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
                <p className="text-sm text-gray-600">Profit Margin:</p>
                <p className="text-orange-600">
                  UGX {(parseFloat(newProductPrice) - parseFloat(newProductCost)).toLocaleString()} per unit 
                  ({(((parseFloat(newProductPrice) - parseFloat(newProductCost)) / parseFloat(newProductPrice)) * 100).toFixed(1)}%)
                </p>
              </div>
            )}
          </div>

          <div className="flex gap-2 justify-end flex-shrink-0 pt-4 border-t">
            <Button variant="outline" onClick={() => setShowAddProductDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleAddProduct}
              disabled={!newProductName || !newProductCategory || !newProductPrice || !newProductCost || !newProductStock || !newProductThreshold}
              className="bg-orange-600 hover:bg-orange-700 text-white"
            >
              Add Product
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Purchase Order Dialog */}
      <Dialog open={showPurchaseDialog} onOpenChange={setShowPurchaseDialog}>
        <DialogContent className="bg-white max-w-3xl max-h-[90vh] flex flex-col">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle>Create Purchase Order</DialogTitle>
            <DialogDescription>
              Create a new purchase order to track incoming stock from suppliers.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4 overflow-y-auto flex-1">
            <div className="space-y-2">
              <Label>Supplier *</Label>
              <Select value={selectedSupplier} onValueChange={setSelectedSupplier}>
                <SelectTrigger className="border-gray-300">
                  <SelectValue placeholder="Select supplier" />
                </SelectTrigger>
                <SelectContent>
                  {suppliers.map((supplier) => (
                    <SelectItem key={supplier.id} value={supplier.id}>
                      {supplier.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="border-t pt-4">
              <h4 className="text-gray-900 mb-3">Add Products</h4>
              <div className="grid grid-cols-12 gap-2 mb-2">
                <div className="col-span-5">
                  <Select value={poProductId} onValueChange={setPoProductId}>
                    <SelectTrigger className="border-gray-300">
                      <SelectValue placeholder="Select product" />
                    </SelectTrigger>
                    <SelectContent>
                      {products.map((product) => (
                        <SelectItem key={product.id} value={product.id}>
                          {product.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-3">
                  <Input
                    type="number"
                    value={poQuantity}
                    onChange={(e) => setPoQuantity(e.target.value)}
                    placeholder="Quantity"
                    className="border-gray-300"
                  />
                </div>
                <div className="col-span-3">
                  <Input
                    type="number"
                    value={poCost}
                    onChange={(e) => setpoCost(e.target.value)}
                    placeholder="Cost per unit"
                    className="border-gray-300"
                  />
                </div>
                <div className="col-span-1">
                  <Button
                    onClick={handleAddPOItem}
                    disabled={!poProductId || !poQuantity || !poCost}
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {poItems.length > 0 && (
                <div className="bg-gray-50 rounded p-3 space-y-2 mt-3">
                  <p className="text-sm text-gray-600">Order Items:</p>
                  {poItems.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-white p-2 rounded">
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">
                          {getProductName(item.productId)}
                        </p>
                        <p className="text-xs text-gray-600">
                          {item.quantity} units @ UGX {item.cost.toLocaleString()} = UGX {(item.quantity * item.cost).toLocaleString()}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleRemovePOItem(idx)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <div className="pt-2 border-t border-gray-200 flex justify-between">
                    <span className="text-gray-700">Total:</span>
                    <span className="text-orange-600">
                      UGX {poItems.reduce((sum, item) => sum + (item.quantity * item.cost), 0).toLocaleString()}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-2 justify-end flex-shrink-0 pt-4 border-t">
            <Button variant="outline" onClick={() => setShowPurchaseDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleCreatePurchaseOrder}
              disabled={!selectedSupplier || poItems.length === 0}
              className="bg-orange-600 hover:bg-orange-700 text-white"
            >
              Create Order
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Supplier Dialog */}
      <Dialog open={showSupplierDialog} onOpenChange={setShowSupplierDialog}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>
              {editingSupplier ? 'Edit Supplier' : 'Add New Supplier'}
            </DialogTitle>
            <DialogDescription>
              {editingSupplier ? 'Update supplier information.' : 'Add a new supplier to your system.'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Supplier Name *</Label>
              <Input
                value={supplierName}
                onChange={(e) => setSupplierName(e.target.value)}
                placeholder="e.g., Uganda Breweries Ltd"
                className="border-gray-300"
              />
            </div>

            <div className="space-y-2">
              <Label>Contact Number *</Label>
              <Input
                value={supplierContact}
                onChange={(e) => setSupplierContact(e.target.value)}
                placeholder="e.g., +256 700 123456"
                className="border-gray-300"
              />
            </div>

            <div className="space-y-2">
              <Label>Email Address *</Label>
              <Input
                type="email"
                value={supplierEmail}
                onChange={(e) => setSupplierEmail(e.target.value)}
                placeholder="e.g., sales@supplier.ug"
                className="border-gray-300"
              />
            </div>
          </div>

          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setShowSupplierDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSaveSupplier}
              disabled={!supplierName || !supplierContact || !supplierEmail}
              className="bg-orange-600 hover:bg-orange-700 text-white"
            >
              {editingSupplier ? 'Update' : 'Add'} Supplier
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Product Detail/Edit Dialog */}
      <Dialog open={showProductDetailDialog} onOpenChange={setShowProductDetailDialog}>
        <DialogContent className="bg-white max-w-2xl max-h-[90vh] flex flex-col">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle>
              {editingProduct ? `${editingProduct.name} - Details` : 'Product Details'}
            </DialogTitle>
            <DialogDescription>
              View and manage product information.
            </DialogDescription>
          </DialogHeader>
          
          {editingProduct && (
            <div className="space-y-6 py-4 overflow-y-auto flex-1">
              {/* Product Overview */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-gray-900 font-medium mb-3">Product Overview</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Product ID</p>
                    <p className="text-gray-900">{editingProduct.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Category</p>
                    <p className="text-gray-900">{editingProduct.category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Current Stock</p>
                    <p className={`text-gray-900 ${editingProduct.stock <= editingProduct.lowStockThreshold ? 'text-red-600' : 'text-green-600'}`}>
                      {editingProduct.stock} units
                      {editingProduct.stock <= editingProduct.lowStockThreshold && ' (LOW STOCK)'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Low Stock Threshold</p>
                    <p className="text-gray-900">{editingProduct.lowStockThreshold} units</p>
                  </div>
                </div>
              </div>

              {/* Pricing Information */}
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <h4 className="text-gray-900 font-medium mb-3">Pricing Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Cost Price</p>
                    <p className="text-gray-900 text-lg">UGX {editingProduct.cost.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Selling Price</p>
                    <p className="text-orange-600 text-lg">UGX {editingProduct.price.toLocaleString()}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-gray-600">Profit Margin</p>
                    <p className="text-green-600 text-lg">
                      UGX {(editingProduct.price - editingProduct.cost).toLocaleString()} 
                      ({(((editingProduct.price - editingProduct.cost) / editingProduct.price) * 100).toFixed(1)}%)
                    </p>
                  </div>
                </div>
              </div>

              {/* Stock Management */}
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="text-gray-900 font-medium mb-3">Stock Management</h4>
                <div className="flex gap-2">
                  <Button
                    onClick={() => {
                      setShowProductDetailDialog(false);
                      openAdjustDialog(editingProduct, 'add');
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Stock
                  </Button>
                  <Button
                    onClick={() => {
                      setShowProductDetailDialog(false);
                      openAdjustDialog(editingProduct, 'remove');
                    }}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    <Minus className="h-4 w-4 mr-2" />
                    Remove Stock
                  </Button>
                </div>
              </div>

              {/* Edit Form */}
              <div className="border-t pt-4">
                <h4 className="text-gray-900 font-medium mb-3">Edit Product Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Product Name *</Label>
                    <Input
                      value={editProductName}
                      onChange={(e) => setEditProductName(e.target.value)}
                      placeholder="Product name"
                      className="border-gray-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Category *</Label>
                    <Select value={editProductCategory} onValueChange={setEditProductCategory}>
                      <SelectTrigger className="border-gray-300">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Selling Price (UGX) *</Label>
                    <Input
                      type="number"
                      value={editProductPrice}
                      onChange={(e) => setEditProductPrice(e.target.value)}
                      placeholder="Selling price"
                      className="border-gray-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Cost Price (UGX) *</Label>
                    <Input
                      type="number"
                      value={editProductCost}
                      onChange={(e) => setEditProductCost(e.target.value)}
                      placeholder="Cost price"
                      className="border-gray-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Current Stock *</Label>
                    <Input
                      type="number"
                      value={editProductStock}
                      onChange={(e) => setEditProductStock(e.target.value)}
                      placeholder="Current stock"
                      className="border-gray-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Low Stock Threshold *</Label>
                    <Input
                      type="number"
                      value={editProductThreshold}
                      onChange={(e) => setEditProductThreshold(e.target.value)}
                      placeholder="Low stock threshold"
                      className="border-gray-300"
                    />
                  </div>
                </div>

                {editProductPrice && editProductCost && (
                  <div className="bg-green-50 p-3 rounded-lg border border-green-200 mt-4">
                    <p className="text-sm text-gray-600">Updated Profit Margin:</p>
                    <p className="text-green-600">
                      UGX {(parseFloat(editProductPrice) - parseFloat(editProductCost)).toLocaleString()} per unit 
                      ({(((parseFloat(editProductPrice) - parseFloat(editProductCost)) / parseFloat(editProductPrice)) * 100).toFixed(1)}%)
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex gap-2 justify-end flex-shrink-0 pt-4 border-t">
            <Button variant="outline" onClick={() => setShowProductDetailDialog(false)}>
              Close
            </Button>
            <Button
              onClick={() => handleDeleteProduct(editingProduct!.id)}
              variant="outline"
              className="border-red-300 text-red-600 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Product
            </Button>
            <Button
              onClick={handleSaveProduct}
              disabled={!editProductName || !editProductCategory || !editProductPrice || !editProductCost || !editProductStock || !editProductThreshold}
              className="bg-orange-600 hover:bg-orange-700 text-white"
            >
              <Edit className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
