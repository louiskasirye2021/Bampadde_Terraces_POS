// Mock data for the POS system

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  cost: number;
  stock: number;
  lowStockThreshold: number;
  image?: string;
}

export interface DaySession {
  id: string;
  date: Date; // The date "Begin Day" was clicked
  startTime: Date;
  endTime?: Date;
  staffName: string;
  staffId: string;
  status: 'active' | 'ended';
}

export interface Order {
  id: string;
  tableNumber: string;
  tableColor: string;
  waiterName: string;
  items: OrderItem[];
  total: number;
  status: 'waiting' | 'paid' | 'cancelled' | 'voided';
  timestamp: Date;
  paymentMethod?: string;
  sessionId?: string; // Link to DaySession
  sessionDate?: Date; // Date of the session, not clock date
  amountPaid?: number;
  change?: number;
  discount?: number;
  discountReason?: string;
  originalTableId?: string; // Track original table before changes
  mergeTag?: string; // Tag indicating this was merged (e.g., "Merged from Table 3")
  mergeHistory?: Array<{
    timestamp: Date;
    fromTable: string;
    toTable: string;
    action: 'change' | 'merge';
  }>;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  total: number;
}

export interface User {
  id: string;
  name: string;
  role: 'admin' | 'waiter';
  pin: string;
}

export interface Supplier {
  id: string;
  name: string;
  contact: string;
  email: string;
}

export interface PurchaseOrder {
  id: string;
  supplierId: string;
  items: { productId: string; quantity: number; cost: number }[];
  total: number;
  status: 'pending' | 'received' | 'cancelled';
  date: Date;
}

export interface PaymentHistory {
  id: string;
  expenseId: string;
  paymentType: 'Partial' | 'Full';
  previousAmountPaid: number;
  additionalAmountPaid: number;
  newTotalAmountPaid: number;
  balanceAfterPayment: number;
  dateOfTransaction: Date;
  recordedBy: string;
  appliesTo?: string; // Description of what this payment covers
}

export interface Expense {
  id: string;
  date: Date;
  itemPurchased: string;
  quantity: number;
  costPerItem: number;
  currentExpenseCost: number; // Just this expense (quantity × costPerItem)
  carriedForwardBalance: number; // Previous unpaid balance from same supplier
  previousExpenseIds: string[]; // IDs of expenses whose balances were carried forward
  totalCost: number; // currentExpenseCost + carriedForwardBalance
  amountPaid: number;
  balanceRemaining: number; // totalCost - amountPaid
  supplier: string;
  paymentStatus: 'Paid' | 'Not Paid' | 'Partial';
  category: string;
  addedBy: string;
  paymentHistory: PaymentHistory[];
  lastPaymentDate?: Date;
  isConsolidated: boolean; // True if this expense includes carried forward balance
  consolidatedFrom?: Date; // Date of the last consolidated expense
  // Legacy fields for backward compatibility
  description?: string;
  amount?: number;
}

export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  timestamp: Date;
  details: string;
}

export interface DamagedProduct {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  reason: string;
  date: Date;
  recordedBy: string;
}

export interface CreditSale {
  id: string;
  customerName: string;
  customerContact: string;
  items: OrderItem[];
  total: number;
  amountPaid: number;
  amountOwed: number;
  date: Date;
  status: 'pending' | 'partial' | 'paid';
  recordedBy: string;
  tableInfo: string;
}

export interface Table {
  id: string;
  tableNumber: string;
  tableColor: string;
  capacity: number;
  status: 'available' | 'occupied' | 'reserved';
  currentOrderId?: string; // Link to current order
}

export interface TableChangeRecord {
  id: string;
  orderId: string;
  fromTableId: string;
  fromTableNumber: string;
  toTableId: string;
  toTableNumber: string;
  timestamp: Date;
  changeType: 'manual_change' | 'merge';
  performedBy: string;
  reason?: string;
}

export const mockProducts: Product[] = [
  // Beer
  { id: 'p1', name: 'Club Pilsner', category: 'Beer', price: 7000, cost: 4500, stock: 120, lowStockThreshold: 30 },
  { id: 'p2', name: 'Nile Special', category: 'Beer', price: 7000, cost: 4500, stock: 100, lowStockThreshold: 30 },
  { id: 'p3', name: 'Bell Lager', category: 'Beer', price: 7000, cost: 4500, stock: 80, lowStockThreshold: 30 },
  { id: 'p4', name: 'Guinness', category: 'Beer', price: 9000, cost: 6500, stock: 45, lowStockThreshold: 20 },
  { id: 'p5', name: 'Tusker Malt', category: 'Beer', price: 8000, cost: 5500, stock: 60, lowStockThreshold: 25 },
  
  // Spirits
  { id: 'p6', name: 'Uganda Waragi', category: 'Spirits', price: 18000, cost: 12000, stock: 25, lowStockThreshold: 10 },
  { id: 'p7', name: 'Bond 7 Whisky', category: 'Spirits', price: 30000, cost: 22000, stock: 15, lowStockThreshold: 8 },
  { id: 'p8', name: 'Smirnoff Vodka', category: 'Spirits', price: 35000, cost: 25000, stock: 12, lowStockThreshold: 8 },
  { id: 'p9', name: 'Johnnie Walker Red', category: 'Spirits', price: 95000, cost: 75000, stock: 8, lowStockThreshold: 5 },
  { id: 'p10', name: 'Gilbeys Gin', category: 'Spirits', price: 25000, cost: 17000, stock: 18, lowStockThreshold: 8 },
  
  // Cocktails
  { id: 'p11', name: 'Mojito', category: 'Cocktails', price: 22000, cost: 10000, stock: 50, lowStockThreshold: 15 },
  { id: 'p12', name: 'Margarita', category: 'Cocktails', price: 24000, cost: 11000, stock: 50, lowStockThreshold: 15 },
  { id: 'p13', name: 'Piña Colada', category: 'Cocktails', price: 26000, cost: 12000, stock: 50, lowStockThreshold: 15 },
  { id: 'p14', name: 'Long Island', category: 'Cocktails', price: 30000, cost: 14000, stock: 50, lowStockThreshold: 15 },
  
  // Soft Drinks
  { id: 'p15', name: 'Coca Cola', category: 'Soft Drinks', price: 3500, cost: 1800, stock: 150, lowStockThreshold: 40 },
  { id: 'p16', name: 'Pepsi', category: 'Soft Drinks', price: 3500, cost: 1800, stock: 120, lowStockThreshold: 40 },
  { id: 'p17', name: 'Fanta Orange', category: 'Soft Drinks', price: 3500, cost: 1800, stock: 100, lowStockThreshold: 40 },
  { id: 'p18', name: 'Sprite', category: 'Soft Drinks', price: 3500, cost: 1800, stock: 110, lowStockThreshold: 40 },
  { id: 'p19', name: 'Minute Maid', category: 'Soft Drinks', price: 4500, cost: 2300, stock: 80, lowStockThreshold: 30 },
];

export const mockUsers: User[] = [
  { id: 'u1', name: 'Admin', role: 'admin', pin: '1234' },
  { id: 'u2', name: 'Rogers', role: 'waiter', pin: '5678' },
  { id: 'u3', name: 'Ivan', role: 'waiter', pin: '9012' },
  { id: 'u4', name: 'Brian', role: 'waiter', pin: '3456' },
  { id: 'u5', name: 'Ansel', role: 'waiter', pin: '7890' },
  { id: 'u6', name: 'Louis', role: 'waiter', pin: '1357' },
];

export const mockSuppliers: Supplier[] = [
  { id: 's1', name: 'Uganda Breweries Ltd', contact: '+256 700 123456', email: 'sales@ubl.ug' },
  { id: 's2', name: 'East African Beverages', contact: '+256 700 234567', email: 'info@eab.ug' },
  { id: 's3', name: 'Quality Snacks Suppliers', contact: '+256 700 345678', email: 'sales@qss.ug' },
];

export const categories = ['Beer', 'Spirits', 'Cocktails', 'Soft Drinks'];
export const tableColors = ['WHITE', 'YELLOW', 'BROWN', 'BLUE'];
export const paymentMethods = ['Cash', 'Card', 'Mobile Money'];

export type View = 'pos' | 'waiting' | 'inventory' | 'reports' | 'admin' | 'damaged' | 'credit' | 'sales';