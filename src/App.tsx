import { useState, useEffect } from 'react';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';
import { toast, Toaster } from 'sonner';
import { 
  ShoppingCart, 
  Clock, 
  Package, 
  BarChart3, 
  Settings, 
  AlertTriangle, 
  CreditCard, 
  Menu, 
  X, 
  LogOut,
  Receipt as ReceiptIcon,
  Power
} from 'lucide-react';
import { LoginScreen } from './components/LoginScreen';
import { TableEntryDialog } from './components/TableEntryDialog';
import { OrderEntry } from './components/OrderEntry';
import { InventoryManagement } from './components/InventoryManagement';
import { Reports } from './components/Reports';
import { AdminDashboard } from './components/AdminDashboard';
import { DamagedProducts } from './components/DamagedProducts';
import { CreditSales } from './components/CreditSales';
import { PaymentDialog } from './components/PaymentDialog';
import { CreditPaymentDialog } from './components/CreditPaymentDialog';
import { ReceiptPrinter, Receipt } from './components/ReceiptPrinter';
import { WaitingList } from './components/WaitingList';
import { BeginDayDialog } from './components/BeginDayDialog';
import { SalesPage } from './components/SalesPage';
import { EndOfDayDialog } from './components/EndOfDayDialog';
import { ChangeTableDialog } from './components/ChangeTableDialog';
import { MergeTablesDialog } from './components/MergeTablesDialog';
import { 
  User, 
  View, 
  OrderItem, 
  Order, 
  Product, 
  Supplier, 
  PurchaseOrder, 
  ActivityLog, 
  Expense, 
  DamagedProduct, 
  CreditSale,
  DaySession,
  mockProducts, 
  mockSuppliers, 
  mockUsers 
} from './utils/mockData';

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<View>('pos');
  const [showTableEntry, setShowTableEntry] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showCreditPayment, setShowCreditPayment] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Table Management state
  const [selectedOrderForTableChange, setSelectedOrderForTableChange] = useState<Order | null>(null);
  const [showChangeTableDialog, setShowChangeTableDialog] = useState(false);
  const [selectedOrderForMerge, setSelectedOrderForMerge] = useState<Order | null>(null);
  const [showMergeTableDialog, setShowMergeTableDialog] = useState(false);
  const [tableChangeHistory, setTableChangeHistory] = useState<Array<{ timestamp: Date; action: string; details: string }>>([]);

  // Day Session state
  const [currentSession, setCurrentSession] = useState<DaySession | null>(null);
  const [allSessions, setAllSessions] = useState<DaySession[]>([]);
  const [showBeginDay, setShowBeginDay] = useState(false);
  const [showEndDay, setShowEndDay] = useState(false);
  const [sessionStockSnapshot, setSessionStockSnapshot] = useState<Record<string, number>>({});

  // Receipt printer state
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptType, setReceiptType] = useState<'pre' | 'post'>('pre');
  const [receiptData, setReceiptData] = useState<Receipt | null>(null);

  // Order state
  const [currentOrder, setCurrentOrder] = useState<OrderItem[]>([]);
  const [tableNumber, setTableNumber] = useState('');
  const [tableColor, setTableColor] = useState('');
  const [waiterName, setWaiterName] = useState('');
  const [waitingOrders, setWaitingOrders] = useState<Order[]>([]);
  const [completedOrders, setCompletedOrders] = useState<Order[]>([]);

  // System state
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [suppliers, setSuppliers] = useState<Supplier[]>(mockSuppliers);
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([]);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [damagedProducts, setDamagedProducts] = useState<DamagedProduct[]>([]);
  const [creditSales, setCreditSales] = useState<CreditSale[]>([]);
  const [users, setUsers] = useState<User[]>(mockUsers);

  const tableInfo = tableNumber && tableColor && waiterName
    ? `${tableNumber} ${tableColor} – ${waiterName}`
    : '';

  const orderTotal = currentOrder.reduce((sum, item) => sum + item.total, 0);

  // Initialize waiter name from logged-in user
  useEffect(() => {
    if (currentUser && currentUser.role === 'waiter') {
      setWaiterName(currentUser.name);
    }
  }, [currentUser]);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setShowBeginDay(true); // Show Begin Day dialog after login
    addActivityLog({
      userId: user.id,
      userName: user.name,
      action: 'User Login',
      details: `${user.name} logged in as ${user.role}`,
    });
    toast.success(`Welcome, ${user.name}!`);
  };

  const handleLogout = () => {
    if (currentUser) {
      addActivityLog({
        userId: currentUser.id,
        userName: currentUser.name,
        action: 'User Logout',
        details: `${currentUser.name} logged out`,
      });
    }
    setCurrentUser(null);
    setCurrentView('pos');
    setCurrentOrder([]);
    setTableNumber('');
    setTableColor('');
    setWaiterName('');
    toast.info('Logged out successfully');
  };

  const handleNewOrder = () => {
    if (!currentSession) {
      toast.error('Please start your day session first');
      return;
    }
    setShowTableEntry(true);
  };

  const handleTableEntrySubmit = (tNumber: string, tColor: string, wName: string) => {
    setTableNumber(tNumber);
    setTableColor(tColor);
    setWaiterName(wName);
    setCurrentOrder([]);
    setCurrentView('pos');
  };

  const handleSaveToWaiting = () => {
    if (currentOrder.length === 0) return;

    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      tableNumber,
      tableColor,
      waiterName,
      items: [...currentOrder],
      total: orderTotal,
      status: 'waiting',
      timestamp: new Date(),
    };

    setWaitingOrders([...waitingOrders, newOrder]);
    
    addActivityLog({
      userId: currentUser!.id,
      userName: currentUser!.name,
      action: 'Order Saved to Waiting List',
      details: `Table ${tableNumber} ${tableColor} - UGX ${orderTotal.toLocaleString()}`,
    });

    toast.success('Order saved to waiting list');
    
    // Reset current order
    setCurrentOrder([]);
    setTableNumber('');
    setTableColor('');
  };

  const handleRetrieveOrder = (order: Order) => {
    setCurrentOrder(order.items);
    setTableNumber(order.tableNumber);
    setTableColor(order.tableColor);
    setWaiterName(order.waiterName);
    setWaitingOrders(waitingOrders.filter(o => o.id !== order.id));
    setCurrentView('pos');
    
    toast.info('Order retrieved for editing');
  };

  const handleDeleteWaitingOrder = (orderId: string) => {
    const order = waitingOrders.find(o => o.id === orderId);
    setWaitingOrders(waitingOrders.filter(o => o.id !== orderId));
    
    if (order) {
      addActivityLog({
        userId: currentUser!.id,
        userName: currentUser!.name,
        action: 'Order Deleted',
        details: `Table ${order.tableNumber} ${order.tableColor} - UGX ${order.total.toLocaleString()}`,
      });
    }
    
    toast.success('Order deleted');
  };

  const handlePayWaitingOrder = (order: Order) => {
    setCurrentOrder(order.items);
    setTableNumber(order.tableNumber);
    setTableColor(order.tableColor);
    setWaiterName(order.waiterName);
    setWaitingOrders(waitingOrders.filter(o => o.id !== order.id));
    setShowPayment(true);
  };

  const handleProcessPayment = () => {
    if (currentOrder.length === 0) return;
    setShowPayment(true);
  };

  const handlePrintProforma = () => {
    if (currentOrder.length === 0) return;
    
    // Create proforma receipt data
    const receipt: Receipt = {
      id: `PRO-${Date.now()}`,
      date: new Date(),
      tableName: `${tableNumber} ${tableColor}`,
      serverName: waiterName,
      items: currentOrder.map(item => ({
        name: item.productName,
        quantity: item.quantity,
        price: item.price,
        total: item.total,
      })),
      subtotal: orderTotal,
      total: orderTotal,
    };
    
    setReceiptData(receipt);
    setReceiptType('pre');
    setShowReceipt(true);
    
    addActivityLog({
      userId: currentUser!.id,
      userName: currentUser!.name,
      action: 'Proforma Receipt Printed',
      details: `Table ${tableNumber} ${tableColor} - UGX ${orderTotal.toLocaleString()}`,
    });
  };

  const handleConfirmPayment = (paymentMethod: string, amountPaid: number, change: number) => {
    const orderId = `ORD-${Date.now()}`;
    
    const completedOrder: Order = {
      id: orderId,
      tableNumber,
      tableColor,
      waiterName,
      items: [...currentOrder],
      total: orderTotal,
      status: 'paid',
      timestamp: new Date(),
      paymentMethod,
      amountPaid,
      change,
      sessionId: currentSession?.id,
      sessionDate: currentSession?.date,
    };

    setCompletedOrders([...completedOrders, completedOrder]);

    // Update product stock
    currentOrder.forEach(item => {
      const product = products.find(p => p.id === item.productId);
      if (product) {
        handleUpdateStock(item.productId, product.stock - item.quantity);
      }
    });

    addActivityLog({
      userId: currentUser!.id,
      userName: currentUser!.name,
      action: 'Payment Processed',
      details: `Table ${tableNumber} ${tableColor} - ${paymentMethod} - UGX ${orderTotal.toLocaleString()}`,
    });

    setShowPayment(false);

    toast.success(`Payment of UGX ${orderTotal.toLocaleString()} received!`);

    // Create final receipt with snapshot before resetting
    const finalReceipt: Receipt = {
      id: orderId,
      date: new Date(),
      tableName: `${tableNumber} ${tableColor}`,
      serverName: waiterName,
      items: currentOrder.map(item => ({
        name: item.productName,
        quantity: item.quantity,
        price: item.price,
        total: item.total,
      })),
      subtotal: orderTotal,
      total: orderTotal,
      paymentDetails: {
        method: paymentMethod,
        amountPaid,
        change,
      },
    };

    // Reset current order
    setCurrentOrder([]);
    setTableNumber('');
    setTableColor('');

    // Show final receipt
    setReceiptData(finalReceipt);
    setReceiptType('post');
    setShowReceipt(true);
  };

  const handleCancelOrder = () => {
    if (currentOrder.length > 0) {
      addActivityLog({
        userId: currentUser!.id,
        userName: currentUser!.name,
        action: 'Order Cancelled',
        details: `Table ${tableNumber} ${tableColor} - UGX ${orderTotal.toLocaleString()}`,
      });
      toast.info('Order cancelled');
    }
    
    setCurrentOrder([]);
    setTableNumber('');
    setTableColor('');
  };

  const handleUpdateStock = (productId: string, newStock: number) => {
    setProducts(products.map(p =>
      p.id === productId ? { ...p, stock: newStock } : p
    ));

    const product = products.find(p => p.id === productId);
    if (product) {
      addActivityLog({
        userId: currentUser!.id,
        userName: currentUser!.name,
        action: 'Stock Updated',
        details: `${product.name}: ${product.stock} → ${newStock}`,
      });
    }
  };

  const handleAddProduct = (product: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...product,
      id: `p${Date.now()}`,
    };
    setProducts([...products, newProduct]);
    
    addActivityLog({
      userId: currentUser!.id,
      userName: currentUser!.name,
      action: 'Product Added',
      details: `${product.name} - ${product.category}`,
    });

    toast.success(`${product.name} added to inventory`);
  };

  const handleUpdateProduct = (productId: string, updates: Partial<Product>) => {
    setProducts(products.map(p =>
      p.id === productId ? { ...p, ...updates } : p
    ));
    
    const product = products.find(p => p.id === productId);
    if (product) {
      addActivityLog({
        userId: currentUser!.id,
        userName: currentUser!.name,
        action: 'Product Updated',
        details: `${product.name} information updated`,
      });
    }

    toast.success('Product updated');
  };

  const handleDeleteProduct = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      setProducts(products.filter(p => p.id !== productId));
      
      addActivityLog({
        userId: currentUser!.id,
        userName: currentUser!.name,
        action: 'Product Deleted',
        details: `${product.name} removed from inventory`,
      });
      
      toast.success('Product deleted successfully');
    }
  };

  const handleAddSupplier = (supplier: Omit<Supplier, 'id'>) => {
    const newSupplier: Supplier = {
      ...supplier,
      id: `s${Date.now()}`,
    };
    setSuppliers([...suppliers, newSupplier]);
    
    addActivityLog({
      userId: currentUser!.id,
      userName: currentUser!.name,
      action: 'Supplier Added',
      details: `${supplier.name}`,
    });

    toast.success(`${supplier.name} added to suppliers`);
  };

  const handleUpdateSupplier = (supplierId: string, updates: Partial<Supplier>) => {
    setSuppliers(suppliers.map(s =>
      s.id === supplierId ? { ...s, ...updates } : s
    ));
    
    const supplier = suppliers.find(s => s.id === supplierId);
    if (supplier) {
      addActivityLog({
        userId: currentUser!.id,
        userName: currentUser!.name,
        action: 'Supplier Updated',
        details: `${supplier.name} information updated`,
      });
    }

    toast.success('Supplier updated');
  };

  const handleDeleteSupplier = (supplierId: string) => {
    const supplier = suppliers.find(s => s.id === supplierId);
    setSuppliers(suppliers.filter(s => s.id !== supplierId));
    
    if (supplier) {
      addActivityLog({
        userId: currentUser!.id,
        userName: currentUser!.name,
        action: 'Supplier Deleted',
        details: `${supplier.name}`,
      });
    }

    toast.success('Supplier deleted');
  };

  const handleAddPurchaseOrder = (purchaseOrder: Omit<PurchaseOrder, 'id' | 'date'>) => {
    const newPO: PurchaseOrder = {
      ...purchaseOrder,
      id: `PO-${Date.now()}`,
      date: new Date(),
    };
    setPurchaseOrders([...purchaseOrders, newPO]);
    
    const supplier = suppliers.find(s => s.id === purchaseOrder.supplierId);
    addActivityLog({
      userId: currentUser!.id,
      userName: currentUser!.name,
      action: 'Purchase Order Created',
      details: `${supplier?.name || 'Unknown'} - UGX ${purchaseOrder.total.toLocaleString()}`,
    });

    toast.success('Purchase order created');
  };

  const handleUpdatePurchaseOrder = (orderId: string, status: 'pending' | 'received' | 'cancelled') => {
    setPurchaseOrders(purchaseOrders.map(po =>
      po.id === orderId ? { ...po, status } : po
    ));
    
    const po = purchaseOrders.find(p => p.id === orderId);
    if (po) {
      addActivityLog({
        userId: currentUser!.id,
        userName: currentUser!.name,
        action: `Purchase Order ${status === 'received' ? 'Received' : 'Cancelled'}`,
        details: `PO #${orderId} - UGX ${po.total.toLocaleString()}`,
      });
    }

    toast.success(`Purchase order ${status}`);
  };

  const addActivityLog = (log: Omit<ActivityLog, 'id' | 'timestamp'>) => {
    const newLog: ActivityLog = {
      ...log,
      id: `LOG-${Date.now()}`,
      timestamp: new Date(),
    };
    setActivityLogs([...activityLogs, newLog]);
  };

  // Table Management Handlers
  const handleOpenChangeTableDialog = (order: Order) => {
    setSelectedOrderForTableChange(order);
    setShowChangeTableDialog(true);
  };

  const handleConfirmChangeTable = (updatedOrder: Partial<Order>, oldTableId: string, newTableId: string) => {
    if (!selectedOrderForTableChange) return;

    // Update the waiting order with new table info
    const updatedOrders = waitingOrders.map(order =>
      order.id === selectedOrderForTableChange.id
        ? {
            ...order,
            tableNumber: updatedOrder.tableNumber!,
            tableColor: updatedOrder.tableColor!,
            originalTableId: updatedOrder.originalTableId,
            mergeTag: updatedOrder.mergeTag,
            mergeHistory: updatedOrder.mergeHistory,
          }
        : order
    );

    setWaitingOrders(updatedOrders);

    // Add to change history
    const changeRecord = {
      timestamp: new Date(),
      action: 'Table Changed',
      details: `Order moved from ${oldTableId.replace('-', ' ')} to ${newTableId.replace('-', ' ')}`,
    };
    setTableChangeHistory([...tableChangeHistory, changeRecord]);

    // Log activity
    addActivityLog({
      userId: currentUser!.id,
      userName: currentUser!.name,
      action: 'Table Changed',
      details: `Order ${selectedOrderForTableChange.id} moved from ${oldTableId.replace('-', ' ')} to ${newTableId.replace('-', ' ')}`,
    });

    toast.success(`Order moved to Table ${updatedOrder.tableNumber} ${updatedOrder.tableColor}`);
    setSelectedOrderForTableChange(null);
  };

  const handleOpenMergeTableDialog = (order: Order) => {
    setSelectedOrderForMerge(order);
    setShowMergeTableDialog(true);
  };

  const handleConfirmMergeTable = (mergedOrder: Order, sourceOrderId: string) => {
    if (!selectedOrderForMerge) return;

    // Find the source and target orders
    const sourceOrder = waitingOrders.find(o => o.id === sourceOrderId);
    const targetOrder = waitingOrders.find(
      o => o.tableNumber === mergedOrder.tableNumber && o.tableColor === mergedOrder.tableColor && o.id !== sourceOrderId
    );

    if (!sourceOrder) return;

    // Remove source order and update target order with merged data
    let updatedOrders = waitingOrders.filter(o => o.id !== sourceOrderId);

    if (targetOrder) {
      // Update the target order with merged information
      updatedOrders = updatedOrders.map(order =>
        order.id === targetOrder.id
          ? {
              ...order,
              items: mergedOrder.items,
              total: mergedOrder.total,
              mergeTag: mergedOrder.mergeTag,
              mergeHistory: mergedOrder.mergeHistory,
            }
          : order
      );
    } else {
      // If no target order exists, add the merged order as a new one
      updatedOrders = [...updatedOrders, mergedOrder];
    }

    setWaitingOrders(updatedOrders);

    // Add to change history
    const changeRecord = {
      timestamp: new Date(),
      action: 'Tables Merged',
      details: `Table ${sourceOrder.tableNumber} ${sourceOrder.tableColor} merged into Table ${mergedOrder.tableNumber} ${mergedOrder.tableColor}`,
    };
    setTableChangeHistory([...tableChangeHistory, changeRecord]);

    // Log activity
    addActivityLog({
      userId: currentUser!.id,
      userName: currentUser!.name,
      action: 'Tables Merged',
      details: `Table ${sourceOrder.tableNumber} ${sourceOrder.tableColor} merged with Table ${mergedOrder.tableNumber} ${mergedOrder.tableColor} - ${mergedOrder.items.length} items combined`,
    });

    toast.success(`Tables merged! ${mergedOrder.items.length} items now on Table ${mergedOrder.tableNumber} ${mergedOrder.tableColor}`);
    setSelectedOrderForMerge(null);
  };

  const handleAddExpense = (expense: Omit<Expense, 'id' | 'date'>) => {
    // Check for existing unpaid/partial balances from the same supplier
    const supplierExpenses = expenses.filter(
      exp => exp.supplier === expense.supplier && 
      exp.paymentStatus !== 'Paid' &&
      exp.id !== expense.id // Exclude current expense if updating
    );

    let carriedForwardBalance = 0;
    let previousExpenseIds: string[] = [];
    let consolidatedFrom: Date | undefined = undefined;

    if (supplierExpenses.length > 0) {
      // Calculate total outstanding balance from all unpaid/partial expenses
      carriedForwardBalance = supplierExpenses.reduce(
        (sum, exp) => sum + exp.balanceRemaining, 
        0
      );
      previousExpenseIds = supplierExpenses.map(exp => exp.id);
      
      // Get the most recent expense date for tracking
      const dates = supplierExpenses.map(exp => new Date(exp.date));
      consolidatedFrom = new Date(Math.max(...dates.map(d => d.getTime())));
    }

    const currentCost = expense.currentExpenseCost || (expense.quantity * expense.costPerItem);
    const totalCost = currentCost + carriedForwardBalance;
    const paid = expense.amountPaid || 0;
    const balance = totalCost - paid;
    const status: 'Paid' | 'Not Paid' | 'Partial' = 
      paid === 0 ? 'Not Paid' :
      paid >= totalCost ? 'Paid' : 'Partial';

    const newExpense: Expense = {
      ...expense,
      id: `EXP-${Date.now()}`,
      date: new Date(),
      currentExpenseCost: currentCost,
      carriedForwardBalance,
      previousExpenseIds,
      totalCost,
      balanceRemaining: balance,
      paymentStatus: status,
      isConsolidated: carriedForwardBalance > 0,
      consolidatedFrom,
      paymentHistory: [],
    };

    // Mark previous expenses as consolidated (paid) since balance is carried forward
    if (previousExpenseIds.length > 0) {
      setExpenses(prevExpenses => 
        prevExpenses.map(exp => {
          if (previousExpenseIds.includes(exp.id)) {
            return {
              ...exp,
              paymentStatus: 'Paid' as const,
              balanceRemaining: 0,
              amountPaid: exp.totalCost,
            };
          }
          return exp;
        })
      );
    }

    setExpenses(prev => [...prev, newExpense]);

    const logDetails = carriedForwardBalance > 0
      ? `${expense.itemPurchased || expense.description} - UGX ${currentCost.toLocaleString()} + Carried Forward UGX ${carriedForwardBalance.toLocaleString()} = Total UGX ${totalCost.toLocaleString()}`
      : `${expense.itemPurchased || expense.description} - UGX ${totalCost.toLocaleString()}`;

    addActivityLog({
      userId: currentUser!.id,
      userName: currentUser!.name,
      action: carriedForwardBalance > 0 ? 'Expense Recorded (Consolidated)' : 'Expense Recorded',
      details: logDetails,
    });

    toast.success(
      carriedForwardBalance > 0 
        ? `Expense recorded with UGX ${carriedForwardBalance.toLocaleString()} carried forward from previous balance`
        : 'Expense recorded'
    );
  };

  const handleRecordPayment = (expenseId: string, payment: Omit<PaymentHistory, 'id' | 'expenseId' | 'dateOfTransaction'>) => {
    setExpenses(prevExpenses => 
      prevExpenses.map(expense => {
        if (expense.id === expenseId) {
          const paymentHistory: PaymentHistory = {
            id: `PAY-${Date.now()}`,
            expenseId: expenseId,
            dateOfTransaction: new Date(),
            ...payment,
          };

          const newStatus: 'Paid' | 'Not Paid' | 'Partial' = 
            payment.balanceAfterPayment === 0 ? 'Paid' :
            payment.newTotalAmountPaid === 0 ? 'Not Paid' : 'Partial';

          return {
            ...expense,
            amountPaid: payment.newTotalAmountPaid,
            balanceRemaining: payment.balanceAfterPayment,
            paymentStatus: newStatus,
            lastPaymentDate: new Date(),
            paymentHistory: [...(expense.paymentHistory || []), paymentHistory],
          };
        }
        return expense;
      })
    );

    addActivityLog({
      userId: currentUser!.id,
      userName: currentUser!.name,
      action: 'Payment Recorded',
      details: `${payment.paymentType} payment of UGX ${payment.additionalAmountPaid.toLocaleString()} for expense ${expenseId}`,
    });
  };

  const handleAddDamagedProduct = (damaged: Omit<DamagedProduct, 'id' | 'date' | 'recordedBy'>) => {
    const newDamagedProduct: DamagedProduct = {
      ...damaged,
      id: `DP-${Date.now()}`,
      date: new Date(),
      recordedBy: currentUser!.name,
    };
    setDamagedProducts([...damagedProducts, newDamagedProduct]);

    // Update stock - subtract damaged quantity
    const product = products.find(p => p.id === damaged.productId);
    if (product) {
      handleUpdateStock(damaged.productId, product.stock - damaged.quantity);
    }

    addActivityLog({
      userId: currentUser!.id,
      userName: currentUser!.name,
      action: 'Damaged Product Recorded',
      details: `${damaged.productName} - ${damaged.quantity} units - ${damaged.reason}`,
    });

    toast.success('Damaged product recorded and stock updated');
  };

  const handleDeleteDamagedProduct = (id: string) => {
    const damaged = damagedProducts.find(d => d.id === id);
    setDamagedProducts(damagedProducts.filter(d => d.id !== id));

    if (damaged) {
      addActivityLog({
        userId: currentUser!.id,
        userName: currentUser!.name,
        action: 'Damaged Product Deleted',
        details: `${damaged.productName} - ${damaged.quantity} units`,
      });
    }

    toast.success('Damaged product record deleted');
  };

  const handlePayCredit = (creditId: string, amount: number) => {
    const credit = creditSales.find(c => c.id === creditId);
    if (!credit) return;

    const newAmountPaid = credit.amountPaid + amount;
    const newAmountOwed = credit.amountOwed - amount;
    const newStatus = newAmountOwed === 0 ? 'paid' : newAmountOwed < credit.total ? 'partial' : 'pending';

    setCreditSales(creditSales.map(c =>
      c.id === creditId
        ? { ...c, amountPaid: newAmountPaid, amountOwed: newAmountOwed, status: newStatus }
        : c
    ));

    addActivityLog({
      userId: currentUser!.id,
      userName: currentUser!.name,
      action: 'Credit Payment Received',
      details: `${credit.customerName} - UGX ${amount.toLocaleString()} paid`,
    });

    toast.success(`Payment of UGX ${amount.toLocaleString()} recorded`);
  };

  const handleCreditPaymentClick = () => {
    setShowPayment(false);
    setShowCreditPayment(true);
  };

  const handleConfirmCreditPayment = (
    customerName: string,
    customerContact: string,
    paymentMethod: string,
    amountPaid: number,
    amountOwed: number
  ) => {
    const orderId = `ORD-${Date.now()}`;
    const status = amountOwed === 0 ? 'paid' : amountPaid > 0 ? 'partial' : 'pending';

    // Create credit sale record
    const newCreditSale: CreditSale = {
      id: `CS-${Date.now()}`,
      customerName,
      customerContact,
      items: [...currentOrder],
      total: orderTotal,
      amountPaid,
      amountOwed,
      date: new Date(),
      status,
      recordedBy: currentUser!.name,
      tableInfo,
    };

    setCreditSales([...creditSales, newCreditSale]);

    // Update product stock
    currentOrder.forEach(item => {
      const product = products.find(p => p.id === item.productId);
      if (product) {
        handleUpdateStock(item.productId, product.stock - item.quantity);
      }
    });

    addActivityLog({
      userId: currentUser!.id,
      userName: currentUser!.name,
      action: 'Credit Sale Recorded',
      details: `${customerName} - Total: UGX ${orderTotal.toLocaleString()}, Owed: UGX ${amountOwed.toLocaleString()}`,
    });

    setShowCreditPayment(false);

    toast.success(`Credit sale recorded! UGX ${amountOwed.toLocaleString()} owed`);

    // Reset current order
    setCurrentOrder([]);
    setTableNumber('');
    setTableColor('');
  };

  const handleAddUser = (user: Omit<User, 'id'>) => {
    const newUser: User = {
      ...user,
      id: `USER-${Date.now()}`,
    };
    setUsers([...users, newUser]);

    addActivityLog({
      userId: currentUser!.id,
      userName: currentUser!.name,
      action: 'User Added',
      details: `New ${user.role} user "${user.name}" created`,
    });

    toast.success(`User "${user.name}" added successfully`);
  };

  const handleEditUser = (userId: string, updates: Partial<User>) => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === userId ? { ...user, ...updates } : user
      )
    );

    addActivityLog({
      userId: currentUser!.id,
      userName: currentUser!.name,
      action: 'User Updated',
      details: `User information updated for "${updates.name || 'user'}"`,
    });

    toast.success('User updated successfully');
  };

  const handleDeleteUser = (userId: string) => {
    const user = users.find(u => u.id === userId);
    setUsers(prevUsers => prevUsers.filter(u => u.id !== userId));

    addActivityLog({
      userId: currentUser!.id,
      userName: currentUser!.name,
      action: 'User Deleted',
      details: `User "${user?.name || 'Unknown'}" removed from system`,
    });

    toast.success('User deleted successfully');
  };

  // Session Management Handlers
  const handleBeginDay = () => {
    if (!currentUser) return;

    const now = new Date();
    const newSession: DaySession = {
      id: `SES-${Date.now()}`,
      date: now,
      startTime: now,
      staffName: currentUser.name,
      staffId: currentUser.id,
      status: 'active',
    };

    // Create stock snapshot
    const snapshot = products.reduce((acc, product) => {
      acc[product.id] = product.stock;
      return acc;
    }, {} as Record<string, number>);

    setCurrentSession(newSession);
    setAllSessions([...allSessions, newSession]);
    setSessionStockSnapshot(snapshot);
    setShowBeginDay(false);

    addActivityLog({
      userId: currentUser.id,
      userName: currentUser.name,
      action: 'Day Session Started',
      details: `${currentUser.name} began day shift`,
    });

    toast.success('Day session started! You can now process orders.');
  };

  const handleInitiateEndDay = () => {
    // Check if can end day
    if (currentOrder.length > 0) {
      toast.error('Please complete or cancel the current order before ending the day');
      return;
    }

    if (waitingOrders.length > 0) {
      toast.error('Please process all waiting orders before ending the day');
      return;
    }

    setShowEndDay(true);
  };

  const handleConfirmEndDay = () => {
    if (!currentSession || !currentUser) return;

    const endedSession: DaySession = {
      ...currentSession,
      endTime: new Date(),
      status: 'ended',
    };

    // Update session
    setAllSessions(allSessions.map(s => s.id === currentSession.id ? endedSession : s));
    setCurrentSession(null);
    setShowEndDay(false);

    addActivityLog({
      userId: currentUser.id,
      userName: currentUser.name,
      action: 'Day Session Ended',
      details: `${currentUser.name} ended day shift`,
    });

    toast.success('Day session ended successfully!');

    // Log out user
    setTimeout(() => {
      handleLogout();
    }, 1500);
  };

  const renderNavButton = (view: View, icon: React.ReactNode, label: string) => {
    const isActive = currentView === view;
    return (
      <Button
        onClick={() => {
          setCurrentView(view);
          setShowMobileMenu(false);
        }}
        className={`w-full justify-start ${
          isActive
            ? 'bg-orange-600 text-white hover:bg-orange-700'
            : 'bg-gray-800 text-white hover:bg-gray-700'
        }`}
      >
        {icon}
        <span className="ml-3">{label}</span>
      </Button>
    );
  };

  if (!currentUser) {
    return (
      <>
        <LoginScreen onLogin={handleLogin} />
        <Toaster position="top-center" />
      </>
    );
  }

  const canAccessAdmin = currentUser.role === 'admin';

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-black to-gray-900 text-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="lg:hidden text-white hover:bg-white/10"
          >
            {showMobileMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          <div>
            <h1 className="text-orange-400">Bampadde Terraces POS</h1>
            <p className="text-xs opacity-75">Komamboga, Uganda</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {waitingOrders.length > 0 && (
            <Badge className="bg-orange-600 text-white">
              {waitingOrders.length} Waiting
            </Badge>
          )}
          <div className="text-right hidden sm:block">
            <p className="text-sm">{currentUser.name}</p>
            <p className="text-xs opacity-75">{currentUser.role.toUpperCase()}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="text-white hover:bg-white/10"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 flex overflow-auto">
        {/* Sidebar Navigation - Desktop */}
        <div className="hidden lg:flex lg:w-64 bg-gray-900 flex-col gap-2 p-4">
          <Button
            onClick={handleNewOrder}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white mb-4"
          >
            + New Order
          </Button>
          
          {renderNavButton('pos', <ShoppingCart className="h-5 w-5" />, 'Point of Sale')}
          {renderNavButton('waiting', <Clock className="h-5 w-5" />, 'Waiting List')}
          {renderNavButton('sales', <ReceiptIcon className="h-5 w-5" />, 'Sales')}
          {renderNavButton('inventory', <Package className="h-5 w-5" />, 'Inventory')}
          {renderNavButton('reports', <BarChart3 className="h-5 w-5" />, 'Reports')}
          {canAccessAdmin && renderNavButton('admin', <Settings className="h-5 w-5" />, 'Admin')}
          {renderNavButton('damaged', <AlertTriangle className="h-5 w-5" />, 'Damaged Products')}
          {renderNavButton('credit', <CreditCard className="h-5 w-5" />, 'Credit Sales')}
          
          {/* End Day Button */}
          {currentSession && (
            <Button
              onClick={handleInitiateEndDay}
              className="w-full bg-red-600 hover:bg-red-700 text-white mt-4"
            >
              <Power className="h-5 w-5 mr-2" />
              End Day
            </Button>
          )}
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black/50" onClick={() => setShowMobileMenu(false)} />
            <div className="absolute left-0 top-0 bottom-0 w-64 bg-gray-900 p-4 flex flex-col gap-2">
              <Button
                onClick={() => {
                  handleNewOrder();
                  setShowMobileMenu(false);
                }}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white mb-4"
              >
                + New Order
              </Button>
              
              {renderNavButton('pos', <ShoppingCart className="h-5 w-5" />, 'Point of Sale')}
              {renderNavButton('waiting', <Clock className="h-5 w-5" />, 'Waiting List')}
              {renderNavButton('sales', <ReceiptIcon className="h-5 w-5" />, 'Sales')}
              {renderNavButton('inventory', <Package className="h-5 w-5" />, 'Inventory')}
              {renderNavButton('reports', <BarChart3 className="h-5 w-5" />, 'Reports')}
              {canAccessAdmin && renderNavButton('admin', <Settings className="h-5 w-5" />, 'Admin')}
              {renderNavButton('damaged', <AlertTriangle className="h-5 w-5" />, 'Damaged Products')}
              {renderNavButton('credit', <CreditCard className="h-5 w-5" />, 'Credit Sales')}
              
              {/* End Day Button */}
              {currentSession && (
                <Button
                  onClick={handleInitiateEndDay}
                  className="w-full bg-red-600 hover:bg-red-700 text-white mt-4"
                >
                  <Power className="h-5 w-5 mr-2" />
                  End Day
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          {currentView === 'pos' && tableInfo ? (
            <OrderEntry
              currentOrder={currentOrder}
              onUpdateOrder={setCurrentOrder}
              onSaveToWaiting={handleSaveToWaiting}
              onProcessPayment={handleProcessPayment}
              onPrintProforma={handlePrintProforma}
              onCancelOrder={handleCancelOrder}
              tableInfo={tableInfo}
            />
          ) : currentView === 'pos' ? (
            <div className="h-full flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-gray-700 mb-2">No Active Order</h3>
                <p className="text-gray-500 mb-4">Start a new order to begin</p>
                <Button
                  onClick={handleNewOrder}
                  className="bg-orange-600 hover:bg-orange-700 text-white"
                >
                  + New Order
                </Button>
              </div>
            </div>
          ) : currentView === 'waiting' ? (
            <WaitingList
              orders={waitingOrders}
              onRetrieveOrder={handleRetrieveOrder}
              onDeleteOrder={handleDeleteWaitingOrder}
              onPayOrder={handlePayWaitingOrder}
              onChangeTable={handleOpenChangeTableDialog}
              onMergeTable={handleOpenMergeTableDialog}
            />
          ) : currentView === 'inventory' ? (
            <InventoryManagement
              products={products}
              suppliers={suppliers}
              purchaseOrders={purchaseOrders}
              onUpdateStock={handleUpdateStock}
              onAddProduct={handleAddProduct}
              onUpdateProduct={handleUpdateProduct}
              onDeleteProduct={handleDeleteProduct}
              onAddSupplier={handleAddSupplier}
              onUpdateSupplier={handleUpdateSupplier}
              onDeleteSupplier={handleDeleteSupplier}
              onAddPurchaseOrder={handleAddPurchaseOrder}
              onUpdatePurchaseOrder={handleUpdatePurchaseOrder}
            />
          ) : currentView === 'reports' ? (
            <Reports
              orders={completedOrders}
              products={products}
              expenses={expenses}
            />
          ) : currentView === 'admin' && canAccessAdmin ? (
            <AdminDashboard
              users={users}
              activityLogs={activityLogs}
              expenses={expenses}
              currentUser={currentUser}
              onAddExpense={handleAddExpense}
              onRecordPayment={handleRecordPayment}
              onAddUser={handleAddUser}
              onEditUser={handleEditUser}
              onDeleteUser={handleDeleteUser}
            />
          ) : currentView === 'damaged' ? (
            <DamagedProducts
              damagedProducts={damagedProducts}
              products={products}
              onAddDamaged={handleAddDamagedProduct}
              onDeleteDamaged={handleDeleteDamagedProduct}
            />
          ) : currentView === 'credit' ? (
            <CreditSales
              creditSales={creditSales}
              onPayCredit={handlePayCredit}
            />
          ) : currentView === 'sales' ? (
            <SalesPage
              orders={completedOrders}
              sessions={allSessions}
            />
          ) : (
            <div className="h-full flex items-center justify-center">
              <p className="text-gray-500">Access denied</p>
            </div>
          )}
        </div>
      </div>

      {/* Dialogs */}
      <TableEntryDialog
        open={showTableEntry}
        onClose={() => setShowTableEntry(false)}
        onSubmit={handleTableEntrySubmit}
        currentWaiterName={waiterName}
      />

      <PaymentDialog
        open={showPayment}
        onClose={() => setShowPayment(false)}
        orderItems={currentOrder}
        orderTotal={orderTotal}
        tableInfo={tableInfo}
        onConfirmPayment={handleConfirmPayment}
        onCreditPayment={handleCreditPaymentClick}
      />

      <CreditPaymentDialog
        open={showCreditPayment}
        onClose={() => setShowCreditPayment(false)}
        orderItems={currentOrder}
        orderTotal={orderTotal}
        tableInfo={tableInfo}
        onConfirmCreditPayment={handleConfirmCreditPayment}
      />

      {/* Table Management Dialogs */}
      <ChangeTableDialog
        open={showChangeTableDialog}
        onClose={() => {
          setShowChangeTableDialog(false);
          setSelectedOrderForTableChange(null);
        }}
        order={selectedOrderForTableChange}
        waitingOrders={waitingOrders}
        performedBy={currentUser?.name || 'Unknown'}
        onConfirm={handleConfirmChangeTable}
      />

      <MergeTablesDialog
        open={showMergeTableDialog}
        onClose={() => {
          setShowMergeTableDialog(false);
          setSelectedOrderForMerge(null);
        }}
        sourceOrder={selectedOrderForMerge}
        waitingOrders={waitingOrders}
        performedBy={currentUser?.name || 'Unknown'}
        onConfirm={handleConfirmMergeTable}
      />

      {receiptData && (
        <ReceiptPrinter
          open={showReceipt}
          onClose={() => setShowReceipt(false)}
          type={receiptType}
          data={receiptData}
        />
      )}

      {/* Day Session Dialogs */}
      {currentUser && (
        <BeginDayDialog
          open={showBeginDay}
          currentUser={currentUser}
          onBeginDay={handleBeginDay}
        />
      )}

      {currentSession && currentUser && (
        <EndOfDayDialog
          open={showEndDay}
          onClose={() => setShowEndDay(false)}
          data={{
            session: currentSession,
            orders: completedOrders.filter(o => o.sessionId === currentSession.id),
            products,
            expenses: expenses.filter(e => {
              const expenseDate = new Date(e.date).toDateString();
              const sessionDate = new Date(currentSession.date).toDateString();
              return expenseDate === sessionDate;
            }),
            sessionStockSnapshot,
          }}
          onConfirmEndDay={handleConfirmEndDay}
        />
      )}

      <Toaster position="top-center" />
    </div>
  );
}