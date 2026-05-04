import { useState, useMemo } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Calendar, Download, DollarSign, Receipt, Filter, X } from 'lucide-react';
import { Order, DaySession } from '../utils/mockData';
import { jsPDF } from 'jspdf';
import { OrderDetailsDialog } from './OrderDetailsDialog';

interface SalesPageProps {
  orders: Order[];
  sessions: DaySession[];
}

export function SalesPage({ orders, sessions }: SalesPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSession, setSelectedSession] = useState<string>('all');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  // Filter orders
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      // Only show paid orders
      if (order.status !== 'paid') return false;

      // Filter by session
      if (selectedSession !== 'all' && order.sessionId !== selectedSession) return false;

      // Filter by payment method
      if (selectedPaymentMethod !== 'all' && order.paymentMethod !== selectedPaymentMethod) return false;

      // Filter by date range
      if (startDate) {
        const orderDate = new Date(order.timestamp).toISOString().split('T')[0];
        if (orderDate < startDate) return false;
      }
      if (endDate) {
        const orderDate = new Date(order.timestamp).toISOString().split('T')[0];
        if (orderDate > endDate) return false;
      }

      // Filter by search term
      if (searchTerm) {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        if (!order.id.toLowerCase().includes(lowerCaseSearchTerm) &&
            !order.waiterName.toLowerCase().includes(lowerCaseSearchTerm) &&
            !order.tableNumber.toString().includes(lowerCaseSearchTerm)) {
          return false;
        }
      }

      return true;
    });
  }, [orders, selectedSession, selectedPaymentMethod, startDate, endDate, searchTerm]);

  // Calculate summary statistics
  const summary = useMemo(() => {
    const totalOrders = filteredOrders.length;
    const totalRevenue = filteredOrders.reduce((sum, order) => sum + order.total, 0);
    
    const paymentMethodBreakdown = filteredOrders.reduce((acc, order) => {
      const method = order.paymentMethod || 'Unknown';
      acc[method] = (acc[method] || 0) + order.total;
      return acc;
    }, {} as Record<string, number>);

    const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    return {
      totalOrders,
      totalRevenue,
      paymentMethodBreakdown,
      avgOrderValue,
    };
  }, [filteredOrders]);

  const clearFilters = () => {
    setSelectedSession('all');
    setSelectedPaymentMethod('all');
    setStartDate('');
    setEndDate('');
    setSearchTerm('');
  };

  const hasActiveFilters = selectedSession !== 'all' || selectedPaymentMethod !== 'all' || startDate || endDate || searchTerm;

  const formatCurrency = (amount: number) => `UGX ${amount.toLocaleString()}`;
  const formatDate = (date: Date) => new Date(date).toLocaleString('en-UG', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const exportSales = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    let yPos = 20;

    // Header
    doc.setFillColor(0, 0, 0);
    doc.rect(0, 0, pageWidth, 40, 'F');
    doc.setTextColor(255, 140, 0);
    doc.setFontSize(24);
    doc.text('BAMPADDE TERRACES', pageWidth / 2, 15, { align: 'center' });
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    doc.text('Sales Report', pageWidth / 2, 30, { align: 'center' });

    yPos = 50;
    doc.setTextColor(0, 0, 0);

    // Summary Section
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Sales Summary', 15, yPos);
    yPos += 10;

    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text(`Total Orders: ${summary.totalOrders}`, 15, yPos);
    yPos += 7;
    doc.text(`Total Revenue: ${formatCurrency(summary.totalRevenue)}`, 15, yPos);
    yPos += 7;
    doc.text(`Average Order Value: ${formatCurrency(summary.avgOrderValue)}`, 15, yPos);
    yPos += 10;

    // Payment Methods
    doc.setFont('helvetica', 'bold');
    doc.text('Payment Method Breakdown:', 15, yPos);
    yPos += 7;
    doc.setFont('helvetica', 'normal');
    Object.entries(summary.paymentMethodBreakdown).forEach(([method, amount]) => {
      doc.text(`  ${method}: ${formatCurrency(amount)}`, 15, yPos);
      yPos += 7;
    });
    yPos += 10;

    // Filters Applied
    if (hasActiveFilters) {
      doc.setFont('helvetica', 'bold');
      doc.text('Filters Applied:', 15, yPos);
      yPos += 7;
      doc.setFont('helvetica', 'normal');
      if (selectedSession !== 'all') {
        const session = sessions.find(s => s.id === selectedSession);
        if (session) {
          doc.text(`  Session: ${new Date(session.date).toLocaleDateString('en-UG')} - ${session.staffName}`, 15, yPos);
          yPos += 7;
        }
      }
      if (selectedPaymentMethod !== 'all') {
        doc.text(`  Payment Method: ${selectedPaymentMethod}`, 15, yPos);
        yPos += 7;
      }
      if (startDate) {
        doc.text(`  Start Date: ${startDate}`, 15, yPos);
        yPos += 7;
      }
      if (endDate) {
        doc.text(`  End Date: ${endDate}`, 15, yPos);
        yPos += 7;
      }
      if (searchTerm) {
        doc.text(`  Search Term: ${searchTerm}`, 15, yPos);
        yPos += 7;
      }
      yPos += 5;
    }

    // Transactions Table
    doc.addPage();
    yPos = 20;
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Sales Transactions', 15, yPos);
    yPos += 5;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Showing ${filteredOrders.length} transaction(s)`, 15, yPos);
    yPos += 10;

    // Table Header
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text('Order ID', 15, yPos);
    doc.text('Date', 50, yPos);
    doc.text('Table', 85, yPos);
    doc.text('Waiter', 110, yPos);
    doc.text('Items', 140, yPos);
    doc.text('Method', 160, yPos);
    doc.text('Amount', 185, yPos, { align: 'right' });
    yPos += 3;
    doc.line(15, yPos, 195, yPos);
    yPos += 5;

    // Table Rows
    doc.setFont('helvetica', 'normal');
    filteredOrders.slice(0, 30).forEach((order) => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }

      const orderDate = new Date(order.timestamp).toLocaleDateString('en-UG', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
      });

      doc.text(order.id, 15, yPos);
      doc.text(orderDate, 50, yPos);
      doc.text(`${order.tableNumber}`, 85, yPos);
      doc.text(order.waiterName.substring(0, 12), 110, yPos);
      doc.text(`${order.items.length}`, 140, yPos);
      doc.text(order.paymentMethod || '', 160, yPos);
      doc.text(formatCurrency(order.total), 185, yPos, { align: 'right' });
      yPos += 7;
    });

    // Footer
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    const footerY = doc.internal.pageSize.height - 10;
    doc.text(
      `Generated on ${new Date().toLocaleString('en-UG')}`,
      pageWidth / 2,
      footerY,
      { align: 'center' }
    );

    // Save
    const fileName = `Sales_Report_${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(fileName);
  };

  return (
    <div className="h-full flex flex-col bg-gray-50 overflow-y-auto">
      <div className="p-6 space-y-6 flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-center justify-between sticky top-0 bg-gray-50 z-10 pb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Sales</h1>
            <p className="text-gray-500 mt-1">View and analyze all completed transactions</p>
          </div>
        </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Receipt className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Orders</p>
              <p className="text-2xl font-bold">{summary.totalOrders}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Revenue</p>
              <p className="text-2xl font-bold">{formatCurrency(summary.totalRevenue)}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <DollarSign className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Avg Order Value</p>
              <p className="text-2xl font-bold">{formatCurrency(summary.avgOrderValue)}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div>
            <p className="text-sm text-gray-500 mb-2">Payment Methods</p>
            <div className="space-y-1">
              {Object.entries(summary.paymentMethodBreakdown).map(([method, amount]) => (
                <div key={method} className="flex justify-between text-sm">
                  <span className="text-gray-600">{method}</span>
                  <span className="font-semibold">{formatCurrency(amount)}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4 space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="h-4 w-4 text-gray-500" />
          <h3 className="font-semibold">Filters</h3>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="ml-auto text-orange-600 hover:text-orange-700"
            >
              <X className="h-4 w-4 mr-1" />
              Clear All
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Session/Day</label>
            <Select value={selectedSession} onValueChange={setSelectedSession}>
              <SelectTrigger>
                <SelectValue placeholder="All Sessions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sessions</SelectItem>
                {sessions.map(session => (
                  <SelectItem key={session.id} value={session.id}>
                    {new Date(session.date).toLocaleDateString('en-UG')} - {session.staffName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Payment Method</label>
            <Select value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod}>
              <SelectTrigger>
                <SelectValue placeholder="All Methods" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Methods</SelectItem>
                <SelectItem value="Cash">Cash</SelectItem>
                <SelectItem value="Card">Card</SelectItem>
                <SelectItem value="Mobile Money">Mobile Money</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Start Date</label>
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">End Date</label>
            <Input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Search</label>
            <Input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Order ID, Waiter Name, Table Number"
            />
          </div>
        </div>
      </Card>

      {/* Sales Table */}
      <Card className="flex flex-col flex-1">
        <div className="p-4 border-b space-y-2">
          <h3 className="font-semibold text-lg">Sales Transactions</h3>
          <p className="text-sm text-gray-500">Showing {filteredOrders.length} transaction(s)</p>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Table</TableHead>
                <TableHead>Waiter</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                    No sales found matching the selected filters
                  </TableCell>
                </TableRow>
              ) : (
                filteredOrders.map((order) => (
                  <TableRow 
                    key={order.id}
                    className="cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => { 
                      setSelectedOrder(order); 
                      setShowOrderDetails(true); 
                    }}
                  >
                    <TableCell className="font-mono text-sm">
                      {order.id}
                    </TableCell>
                    <TableCell className="text-sm">{formatDate(order.timestamp)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span>{order.tableNumber}</span>
                        <Badge variant="outline" className="text-xs">
                          {order.tableColor}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>{order.waiterName}</TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {order.items.length} item(s)
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          order.paymentMethod === 'Cash'
                            ? 'bg-green-100 text-green-800'
                            : order.paymentMethod === 'Card'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-purple-100 text-purple-800'
                        }
                      >
                        {order.paymentMethod}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      {formatCurrency(order.total)}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

        {/* Bottom Action Buttons */}
        <div className="mt-auto pt-6 flex gap-3 border-t">
          <Button className="flex-1 bg-orange-600 hover:bg-orange-700 text-white" onClick={exportSales}>
            <Download className="h-4 w-4 mr-2" />
            Export Sales
          </Button>
        </div>

        {/* Order Details Dialog */}
        <OrderDetailsDialog
          order={selectedOrder}
          open={showOrderDetails}
          onClose={() => setShowOrderDetails(false)}
        />
      </div>
    </div>
  );
}