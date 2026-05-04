import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ScrollArea } from './ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { User, ActivityLog, Expense, PaymentHistory } from '../utils/mockData';
import { RecordPaymentDialog } from './RecordPaymentDialog';
import { Settings, Users, DollarSign, Activity, Eye, EyeOff, Plus, Shield, Trash2, CreditCard } from 'lucide-react';

interface AdminDashboardProps {
  users: User[];
  activityLogs: ActivityLog[];
  expenses: Expense[];
  currentUser: User;
  onAddExpense: (expense: Omit<Expense, 'id' | 'date'>) => void;
  onRecordPayment: (expenseId: string, payment: Omit<PaymentHistory, 'id' | 'expenseId' | 'dateOfTransaction'>) => void;
  onAddUser: (user: Omit<User, 'id'>) => void;
  onEditUser: (userId: string, updates: Partial<User>) => void;
  onDeleteUser: (userId: string) => void;
}

export function AdminDashboard({ users, activityLogs, expenses, currentUser, onAddExpense, onRecordPayment, onAddUser, onEditUser, onDeleteUser }: AdminDashboardProps) {
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [itemPurchased, setItemPurchased] = useState('');
  const [quantity, setQuantity] = useState('');
  const [costPerItem, setCostPerItem] = useState('');
  const [amountPaid, setAmountPaid] = useState('');
  const [supplier, setSupplier] = useState('');
  const [expenseCategory, setExpenseCategory] = useState('');
  const [showPins, setShowPins] = useState(false);
  
  // User management state
  const [showAddUser, setShowAddUser] = useState(false);
  const [showEditUser, setShowEditUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userName, setUserName] = useState('');
  const [userPin, setUserPin] = useState('');
  const [userRole, setUserRole] = useState<'admin' | 'waiter'>('waiter');

  const expenseCategories = ['Utilities', 'Supplies', 'Maintenance', 'Salaries', 'Marketing', 'Stock Purchase', 'Other'];

  const handleAddExpense = () => {
    if (itemPurchased && quantity && costPerItem && supplier && expenseCategory) {
      const qty = parseFloat(quantity);
      const cost = parseFloat(costPerItem);
      const paid = amountPaid ? parseFloat(amountPaid) : 0;
      const currentCost = qty * cost;

      onAddExpense({
        itemPurchased,
        quantity: qty,
        costPerItem: cost,
        currentExpenseCost: currentCost,
        carriedForwardBalance: 0, // Will be calculated in parent
        previousExpenseIds: [],
        totalCost: currentCost, // Will be recalculated in parent if there's carried balance
        amountPaid: paid,
        balanceRemaining: currentCost - paid,
        supplier,
        paymentStatus: paid === 0 ? 'Not Paid' : paid >= currentCost ? 'Paid' : 'Partial',
        category: expenseCategory,
        addedBy: currentUser.name,
        paymentHistory: [],
        isConsolidated: false,
        // Legacy fields for backward compatibility
        description: itemPurchased,
        amount: currentCost,
      });
      setShowAddExpense(false);
      setItemPurchased('');
      setQuantity('');
      setCostPerItem('');
      setAmountPaid('');
      setSupplier('');
      setExpenseCategory('');
    }
  };

  const handlePaymentClick = (expense: Expense) => {
    setSelectedExpense(expense);
    setShowPaymentDialog(true);
  };

  const handleAddUser = () => {
    if (userName && userPin && userRole) {
      onAddUser({
        name: userName,
        pin: userPin,
        role: userRole,
      });
      setShowAddUser(false);
      setUserName('');
      setUserPin('');
      setUserRole('waiter');
    }
  };

  const handleEditUser = () => {
    if (selectedUser && userName && userPin) {
      onEditUser(selectedUser.id, {
        name: userName,
        pin: userPin,
        role: userRole,
      });
      setShowEditUser(false);
      setSelectedUser(null);
      setUserName('');
      setUserPin('');
      setUserRole('waiter');
    }
  };

  const openEditDialog = (user: User) => {
    setSelectedUser(user);
    setUserName(user.name);
    setUserPin(user.pin);
    setUserRole(user.role);
    setShowEditUser(true);
  };

  const handleDeleteUser = (userId: string, userName: string) => {
    if (window.confirm(`Are you sure you want to delete user "${userName}"? This action cannot be undone.`)) {
      onDeleteUser(userId);
    }
  };

  const totalExpenses = expenses.reduce((sum, exp) => sum + (exp.currentExpenseCost || exp.amount || 0), 0);
  const todayExpenses = expenses.filter(exp => {
    const today = new Date();
    const expDate = new Date(exp.date);
    return expDate.toDateString() === today.toDateString();
  });
  const todayExpensesTotal = todayExpenses.reduce((sum, exp) => sum + (exp.currentExpenseCost || exp.amount || 0), 0);

  return (
    <div className="h-full flex flex-col bg-gray-50">
      <div className="bg-gradient-to-r from-black to-gray-900 text-white p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-orange-400">Admin Dashboard</h2>
            <p className="text-sm opacity-90">System management and control</p>
          </div>
          <Settings className="h-8 w-8 text-orange-400" />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4">
          <Tabs defaultValue="users" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4 bg-gray-200">
              <TabsTrigger value="users" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white">
                Users
              </TabsTrigger>
              <TabsTrigger value="expenses" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white">
                Expenses
              </TabsTrigger>
              <TabsTrigger value="activity" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white">
                Activity Log
              </TabsTrigger>
              <TabsTrigger value="settings" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white">
                Settings
              </TabsTrigger>
            </TabsList>

            {/* Users Management */}
            <TabsContent value="users" className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-gray-900">User Management</h3>
                  <p className="text-sm text-gray-600">{users.length} active users</p>
                </div>
                <Button className="bg-orange-600 hover:bg-orange-700 text-white" onClick={() => setShowAddUser(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add User
                </Button>
              </div>

              <div className="space-y-2">
                {users.map((user) => (
                  <Card key={user.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-100">
                          <Users className="h-5 w-5 text-orange-600" />
                        </div>
                        <div>
                          <p className="text-gray-900">{user.name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge
                              variant="outline"
                              className={
                                user.role === 'admin'
                                  ? 'border-orange-500 text-orange-600'
                                  : 'border-blue-500 text-blue-600'
                              }
                            >
                              {user.role.toUpperCase()}
                            </Badge>
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                              <Shield className="h-3 w-3" />
                              PIN: {showPins ? user.pin : '****'}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" className="border-gray-300" onClick={() => openEditDialog(user)}>
                          Edit
                        </Button>
                        {user.role !== 'admin' && (
                          <Button size="sm" variant="outline" className="border-red-300 text-red-600 hover:bg-red-50" onClick={() => handleDeleteUser(user.id, user.name)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <Button
                variant="outline"
                onClick={() => setShowPins(!showPins)}
                className="w-full border-gray-300"
              >
                {showPins ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
                {showPins ? 'Hide' : 'Show'} PINs
              </Button>
            </TabsContent>

            {/* Expenses Tracking */}
            <TabsContent value="expenses" className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card className="p-4 border-l-4 border-l-red-600">
                  <p className="text-sm text-gray-600">Today's Expenses</p>
                  <p className="text-red-600">
                    UGX {todayExpensesTotal.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{todayExpenses.length} transactions</p>
                </Card>

                <Card className="p-4 border-l-4 border-l-orange-600">
                  <p className="text-sm text-gray-600">Total Expenses</p>
                  <p className="text-orange-600">
                    UGX {totalExpenses.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{expenses.length} transactions</p>
                </Card>

                <Card className="p-4 border-l-4 border-l-amber-600">
                  <p className="text-sm text-gray-600">Unpaid Balance</p>
                  <p className="text-amber-600">
                    UGX {expenses.reduce((sum, exp) => sum + (exp.balanceRemaining || 0), 0).toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {expenses.filter(e => e.paymentStatus === 'Not Paid' || e.paymentStatus === 'Partial').length} pending
                  </p>
                </Card>
              </div>

              <Button
                onClick={() => setShowAddExpense(true)}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Record Expense
              </Button>

              <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-3 py-2 text-left font-semibold">Date</th>
                        <th className="px-3 py-2 text-left font-semibold">Item Purchased</th>
                        <th className="px-3 py-2 text-right font-semibold">Qty</th>
                        <th className="px-3 py-2 text-right font-semibold">Cost/Item</th>
                        <th className="px-3 py-2 text-right font-semibold">Total Cost</th>
                        <th className="px-3 py-2 text-right font-semibold">Paid</th>
                        <th className="px-3 py-2 text-right font-semibold">Balance</th>
                        <th className="px-3 py-2 text-left font-semibold">Supplier</th>
                        <th className="px-3 py-2 text-center font-semibold">Status</th>
                        <th className="px-3 py-2 text-left font-semibold">Category</th>
                        <th className="px-3 py-2 text-center font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {expenses.length === 0 ? (
                        <tr>
                          <td colSpan={11} className="px-3 py-8 text-center text-gray-500">
                            No expenses recorded yet
                          </td>
                        </tr>
                      ) : (
                        expenses.slice().reverse().map((expense, index) => (
                          <tr key={expense.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            <td className="px-3 py-3 text-xs">
                              {new Date(expense.date).toLocaleDateString('en-UG', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric',
                              })}
                            </td>
                            <td className="px-3 py-3">
                              <p className="font-medium text-gray-900">{expense.itemPurchased || expense.description}</p>
                              <p className="text-xs text-gray-500">by {expense.addedBy}</p>
                            </td>
                            <td className="px-3 py-3 text-right">{expense.quantity || '-'}</td>
                            <td className="px-3 py-3 text-right">
                              {expense.costPerItem ? `UGX ${expense.costPerItem.toLocaleString()}` : '-'}
                            </td>
                            <td className="px-3 py-3 text-right font-semibold">
                              UGX {(expense.totalCost || expense.amount || 0).toLocaleString()}
                            </td>
                            <td className="px-3 py-3 text-right text-green-600">
                              {expense.amountPaid !== undefined ? `UGX ${expense.amountPaid.toLocaleString()}` : '-'}
                            </td>
                            <td className="px-3 py-3 text-right font-semibold text-red-600">
                              {expense.balanceRemaining !== undefined ? `UGX ${expense.balanceRemaining.toLocaleString()}` : '-'}
                            </td>
                            <td className="px-3 py-3">
                              <p className="text-sm">{expense.supplier || '-'}</p>
                            </td>
                            <td className="px-3 py-3 text-center">
                              {expense.paymentStatus ? (
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
                              ) : (
                                <span className="text-xs text-gray-400">N/A</span>
                              )}
                            </td>
                            <td className="px-3 py-3">
                              <Badge variant="outline" className="text-xs">
                                {expense.category}
                              </Badge>
                            </td>
                            <td className="px-3 py-3 text-center">
                              <Button
                                size="sm"
                                onClick={() => handlePaymentClick(expense)}
                                className="bg-orange-600 hover:bg-orange-700 text-white text-xs px-2 py-1"
                              >
                                <CreditCard className="h-3 w-3 mr-1" />
                                {expense.paymentStatus === 'Paid' ? 'View' : 'Pay'}
                              </Button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </Card>
            </TabsContent>

            {/* Activity Log */}
            <TabsContent value="activity" className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-gray-900">Activity Log</h3>
                  <p className="text-sm text-gray-600">Recent system activities</p>
                </div>
                <Button variant="outline" size="sm" className="border-gray-300">
                  Clear Log
                </Button>
              </div>

              <div className="space-y-2">
                {activityLogs.slice().reverse().map((log) => (
                  <Card key={log.id} className="p-3">
                    <div className="flex items-start gap-3">
                      <Activity className="h-5 w-5 text-orange-600 mt-0.5" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-gray-900">{log.action}</p>
                          <span className="text-xs text-gray-500">
                            {new Date(log.timestamp).toLocaleTimeString('en-UG', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{log.details}</p>
                        <p className="text-xs text-gray-500 mt-1">by {log.userName}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Settings */}
            <TabsContent value="settings" className="space-y-4">
              <Card className="p-4">
                <h3 className="text-gray-900 mb-4">Business Information</h3>
                <div className="space-y-3">
                  <div>
                    <Label>Business Name</Label>
                    <Input
                      defaultValue="Bampadde Terraces"
                      className="border-gray-300"
                    />
                  </div>
                  <div>
                    <Label>Location</Label>
                    <Input
                      defaultValue="Komamboga, Uganda"
                      className="border-gray-300"
                    />
                  </div>
                  <div>
                    <Label>Contact</Label>
                    <Input
                      defaultValue="+256 700 000000"
                      className="border-gray-300"
                    />
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <h3 className="text-gray-900 mb-4">Receipt Settings</h3>
                <div className="space-y-3">
                  <div>
                    <Label>Receipt Header</Label>
                    <Input
                      defaultValue="BAMPADDE TERRACES"
                      className="border-gray-300"
                    />
                  </div>
                  <div>
                    <Label>Receipt Footer</Label>
                    <Input
                      defaultValue="Thank you for your visit!"
                      className="border-gray-300"
                    />
                  </div>
                  <div>
                    <Label>Tax ID (Optional)</Label>
                    <Input
                      placeholder="Enter tax ID"
                      className="border-gray-300"
                    />
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <h3 className="text-gray-900 mb-4">Multi-Branch Settings</h3>
                <div className="space-y-3">
                  <div>
                    <Label>Current Branch</Label>
                    <Select defaultValue="main">
                      <SelectTrigger className="border-gray-300">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="main">Main Branch - Komamboga</SelectItem>
                        <SelectItem value="branch2">Branch 2 (Coming Soon)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Branch
                  </Button>
                </div>
              </Card>

              <Card className="p-4">
                <h3 className="text-gray-900 mb-4">Data Backup</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Last backup: Never
                </p>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full border-gray-300">
                    Backup Now
                  </Button>
                  <Button variant="outline" className="w-full border-gray-300">
                    Restore from Backup
                  </Button>
                </div>
              </Card>

              <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white">
                Save Settings
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      </ScrollArea>

      {/* Add Expense Dialog */}
      <Dialog open={showAddExpense} onOpenChange={setShowAddExpense}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Record Expense</DialogTitle>
            <DialogDescription>
              Add a new business expense to track spending.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Item Purchased</Label>
              <Input
                value={itemPurchased}
                onChange={(e) => setItemPurchased(e.target.value)}
                placeholder="e.g., Electricity bill"
                className="border-gray-300"
              />
            </div>

            <div className="space-y-2">
              <Label>Quantity</Label>
              <Input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Enter quantity"
                className="border-gray-300"
              />
            </div>

            <div className="space-y-2">
              <Label>Cost Per Item (UGX)</Label>
              <Input
                type="number"
                value={costPerItem}
                onChange={(e) => setCostPerItem(e.target.value)}
                placeholder="Enter cost per item"
                className="border-gray-300"
              />
            </div>

            <div className="space-y-2">
              <Label>Amount Paid (UGX)</Label>
              <Input
                type="number"
                value={amountPaid}
                onChange={(e) => setAmountPaid(e.target.value)}
                placeholder="Enter amount paid"
                className="border-gray-300"
              />
            </div>

            <div className="space-y-2">
              <Label>Supplier</Label>
              <Input
                value={supplier}
                onChange={(e) => setSupplier(e.target.value)}
                placeholder="Enter supplier name"
                className="border-gray-300"
              />
            </div>

            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={expenseCategory} onValueChange={setExpenseCategory}>
                <SelectTrigger className="border-gray-300">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {expenseCategories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setShowAddExpense(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleAddExpense}
              disabled={!itemPurchased || !quantity || !costPerItem || !supplier || !expenseCategory}
              className="bg-orange-600 hover:bg-orange-700 text-white"
            >
              Add Expense
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Record Payment Dialog */}
      <RecordPaymentDialog
        open={showPaymentDialog}
        onOpenChange={setShowPaymentDialog}
        expense={selectedExpense}
        onRecordPayment={onRecordPayment}
      />

      {/* Add User Dialog */}
      <Dialog open={showAddUser} onOpenChange={setShowAddUser}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              Create a new user account for the POS system.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>User Name</Label>
              <Input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter user name"
                className="border-gray-300"
              />
            </div>

            <div className="space-y-2">
              <Label>PIN (4 digits)</Label>
              <Input
                type="number"
                value={userPin}
                onChange={(e) => setUserPin(e.target.value)}
                placeholder="Enter 4-digit PIN"
                maxLength={4}
                className="border-gray-300"
              />
            </div>

            <div className="space-y-2">
              <Label>Role</Label>
              <Select value={userRole} onValueChange={(value: 'admin' | 'waiter') => setUserRole(value)}>
                <SelectTrigger className="border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="waiter">Waiter</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => {
              setShowAddUser(false);
              setUserName('');
              setUserPin('');
              setUserRole('waiter');
            }}>
              Cancel
            </Button>
            <Button
              onClick={handleAddUser}
              disabled={!userName || !userPin || userPin.length !== 4}
              className="bg-orange-600 hover:bg-orange-700 text-white"
            >
              Add User
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={showEditUser} onOpenChange={setShowEditUser}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Update user information for {selectedUser?.name}.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>User Name</Label>
              <Input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter user name"
                className="border-gray-300"
              />
            </div>

            <div className="space-y-2">
              <Label>PIN (4 digits)</Label>
              <Input
                type="number"
                value={userPin}
                onChange={(e) => setUserPin(e.target.value)}
                placeholder="Enter 4-digit PIN"
                maxLength={4}
                className="border-gray-300"
              />
            </div>

            <div className="space-y-2">
              <Label>Role</Label>
              <Select value={userRole} onValueChange={(value: 'admin' | 'waiter') => setUserRole(value)}>
                <SelectTrigger className="border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="waiter">Waiter</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => {
              setShowEditUser(false);
              setSelectedUser(null);
              setUserName('');
              setUserPin('');
              setUserRole('waiter');
            }}>
              Cancel
            </Button>
            <Button
              onClick={handleEditUser}
              disabled={!userName || !userPin || userPin.length !== 4}
              className="bg-orange-600 hover:bg-orange-700 text-white"
            >
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}