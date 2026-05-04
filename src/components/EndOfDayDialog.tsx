import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';
import { DaySession, Order, Product, Expense } from '../utils/mockData';
import { EndOfDayReport } from './EndOfDayReport';
import { jsPDF } from 'jspdf';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Package, 
  AlertTriangle,
  CheckCircle2,
  Download,
  FileText,
  Calendar,
  ShoppingCart
} from 'lucide-react';

interface EndOfDaySummaryData {
  session: DaySession;
  orders: Order[];
  products: Product[];
  expenses: Expense[];
  sessionStockSnapshot: Record<string, number>; // productId -> opening stock
}

interface EndOfDayDialogProps {
  open: boolean;
  onClose: () => void;
  data: EndOfDaySummaryData;
  onConfirmEndDay: () => void;
}

export function EndOfDayDialog({ open, onClose, data, onConfirmEndDay }: EndOfDayDialogProps) {
  const { session, orders, products, expenses, sessionStockSnapshot } = data;

  // Calculate summary metrics
  const paidOrders = orders.filter(o => o.status === 'paid');
  const voidedOrders = orders.filter(o => o.status === 'voided');
  const totalOrders = paidOrders.length;
  const totalRevenue = paidOrders.reduce((sum, o) => sum + o.total, 0);
  
  const paymentBreakdown = paidOrders.reduce((acc, order) => {
    const method = order.paymentMethod || 'Unknown';
    acc[method] = (acc[method] || 0) + order.total;
    return acc;
  }, {} as Record<string, number>);

  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  // Top selling products
  const productSales = paidOrders.reduce((acc, order) => {
    order.items.forEach(item => {
      if (!acc[item.productId]) {
        acc[item.productId] = {
          name: item.productName,
          quantity: 0,
          revenue: 0,
        };
      }
      acc[item.productId].quantity += item.quantity;
      acc[item.productId].revenue += item.total;
    });
    return acc;
  }, {} as Record<string, { name: string; quantity: number; revenue: number }>);

  const topByQuantity = Object.entries(productSales)
    .sort(([, a], [, b]) => b.quantity - a.quantity)
    .slice(0, 5);

  const topByRevenue = Object.entries(productSales)
    .sort(([, a], [, b]) => b.revenue - a.revenue)
    .slice(0, 5);

  // Stock analysis
  const lowStockProducts = products.filter(p => p.stock < p.lowStockThreshold);
  const outOfStockProducts = products.filter(p => p.stock === 0);

  // Expenses
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);

  // Net revenue
  const netRevenue = totalRevenue - totalExpenses;

  // Discounts
  const totalDiscounts = paidOrders.reduce((sum, o) => sum + (o.discount || 0), 0);

  // Duration
  const duration = session.endTime 
    ? (new Date(session.endTime).getTime() - new Date(session.startTime).getTime()) / (1000 * 60 * 60)
    : 0;

  const formatCurrency = (amount: number) => `UGX ${amount.toLocaleString()}`;
  const formatDate = (date: Date) => new Date(date).toLocaleDateString('en-UG', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const formatTime = (date: Date) => new Date(date).toLocaleTimeString('en-UG', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    let yPos = 20;

    // Helper function to add text
    const addText = (text: string, x: number, y: number, options?: any) => {
      doc.text(text, x, y, options);
    };

    // Helper to check page break
    const checkPageBreak = (needed: number) => {
      if (yPos + needed > 270) {
        doc.addPage();
        yPos = 20;
      }
    };

    // Header
    doc.setFillColor(0, 0, 0);
    doc.rect(0, 0, pageWidth, 40, 'F');
    doc.setTextColor(255, 140, 0); // Orange
    doc.setFontSize(24);
    addText('BAMPADDE TERRACES', pageWidth / 2, 15, { align: 'center' });
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    addText('Komamboga, Uganda', pageWidth / 2, 22, { align: 'center' });
    addText('End of Day Summary Report', pageWidth / 2, 30, { align: 'center' });
    
    yPos = 50;
    doc.setTextColor(0, 0, 0);

    // Session Info
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    addText('Session Information', 15, yPos);
    yPos += 10;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    addText(`Session Date: ${formatDate(session.date)}`, 15, yPos);
    yPos += 7;
    addText(`Start Time: ${formatTime(session.startTime)}`, 15, yPos);
    yPos += 7;
    if (session.endTime) {
      addText(`End Time: ${formatTime(session.endTime)}`, 15, yPos);
      yPos += 7;
    }
    addText(`Duration: ${duration.toFixed(2)} hours`, 15, yPos);
    yPos += 7;
    addText(`Staff: ${session.staffName}`, 15, yPos);
    yPos += 15;

    // Sales Overview
    checkPageBreak(40);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    addText('Sales Overview', 15, yPos);
    yPos += 10;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    addText(`Total Orders: ${totalOrders}`, 15, yPos);
    yPos += 7;
    addText(`Total Revenue: ${formatCurrency(totalRevenue)}`, 15, yPos);
    yPos += 7;
    addText(`Average Order Value: ${formatCurrency(avgOrderValue)}`, 15, yPos);
    yPos += 7;
    if (totalDiscounts > 0) {
      addText(`Total Discounts: ${formatCurrency(totalDiscounts)}`, 15, yPos);
      yPos += 7;
    }
    if (voidedOrders.length > 0) {
      addText(`Voided Orders: ${voidedOrders.length}`, 15, yPos);
      yPos += 7;
    }
    yPos += 10;

    // Payment Methods
    checkPageBreak(30);
    doc.setFont('helvetica', 'bold');
    addText('Payment Method Breakdown:', 15, yPos);
    yPos += 7;
    doc.setFont('helvetica', 'normal');
    Object.entries(paymentBreakdown).forEach(([method, amount]) => {
      addText(`  ${method}: ${formatCurrency(amount)}`, 15, yPos);
      yPos += 7;
    });
    yPos += 10;

    // Top Selling Products
    checkPageBreak(50);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    addText('Top 5 Products by Quantity', 15, yPos);
    yPos += 10;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    topByQuantity.forEach(([, data], idx) => {
      addText(`${idx + 1}. ${data.name} - ${data.quantity} units`, 15, yPos);
      yPos += 7;
    });
    yPos += 10;

    checkPageBreak(50);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    addText('Top 5 Products by Revenue', 15, yPos);
    yPos += 10;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    topByRevenue.forEach(([, data], idx) => {
      addText(`${idx + 1}. ${data.name} - ${formatCurrency(data.revenue)}`, 15, yPos);
      yPos += 7;
    });
    yPos += 10;

    // Inventory Status
    checkPageBreak(40);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    addText('Inventory Status', 15, yPos);
    yPos += 10;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    addText(`Low Stock Items: ${lowStockProducts.length}`, 15, yPos);
    yPos += 7;
    addText(`Out of Stock Items: ${outOfStockProducts.length}`, 15, yPos);
    yPos += 10;

    if (lowStockProducts.length > 0) {
      doc.setFont('helvetica', 'bold');
      addText('Low Stock Products:', 15, yPos);
      yPos += 7;
      doc.setFont('helvetica', 'normal');
      lowStockProducts.slice(0, 10).forEach(p => {
        checkPageBreak(7);
        addText(`  ${p.name}: ${p.stock} units (threshold: ${p.lowStockThreshold})`, 15, yPos);
        yPos += 7;
      });
      yPos += 5;
    }

    // Expenses
    checkPageBreak(40);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    addText('Expenses', 15, yPos);
    yPos += 10;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    addText(`Total Expenses: ${formatCurrency(totalExpenses)}`, 15, yPos);
    yPos += 7;
    if (expenses.length > 0) {
      expenses.forEach(exp => {
        checkPageBreak(7);
        addText(`  ${exp.description}: ${formatCurrency(exp.amount)}`, 15, yPos);
        yPos += 7;
      });
    }
    yPos += 10;

    // Financial Summary
    checkPageBreak(40);
    doc.setFillColor(240, 240, 240);
    doc.rect(10, yPos - 5, pageWidth - 20, 30, 'F');
    
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    addText('Financial Summary', 15, yPos);
    yPos += 10;
    
    doc.setFontSize(11);
    addText(`Gross Revenue: ${formatCurrency(totalRevenue)}`, 15, yPos);
    yPos += 7;
    addText(`Less Expenses: ${formatCurrency(totalExpenses)}`, 15, yPos);
    yPos += 7;
    doc.setTextColor(netRevenue >= 0 ? 0 : 255, netRevenue >= 0 ? 128 : 0, 0);
    addText(`Net Revenue: ${formatCurrency(netRevenue)}`, 15, yPos);
    doc.setTextColor(0, 0, 0);
    yPos += 15;

    // Footer
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    const footerY = doc.internal.pageSize.height - 10;
    addText(
      `Generated on ${new Date().toLocaleString('en-UG')} by ${session.staffName}`,
      pageWidth / 2,
      footerY,
      { align: 'center' }
    );

    // Save PDF
    const fileName = `DaySummary_${new Date(session.date).toISOString().split('T')[0]}_BampaddeTerraces.pdf`;
    doc.save(fileName);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl">End of Day Summary</DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Review and confirm the end of day summary for {formatDate(session.date)}.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1 min-h-[400px] pr-4">
          <div className="space-y-6">
            {/* Session Info */}
            <div>
              <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">Session Information</h2>
              <Card className="p-4 bg-gradient-to-r from-orange-50 to-white border-orange-100">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Date</p>
                    <p className="font-semibold text-base mt-1">{formatDate(session.date)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Staff</p>
                    <p className="font-semibold text-base mt-1">{session.staffName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Start Time</p>
                    <p className="font-semibold text-base mt-1">{formatTime(session.startTime)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Duration</p>
                    <p className="font-semibold text-base mt-1">{duration.toFixed(2)} hours</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Key Metrics */}
            <div>
              <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">Financial Overview</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Card className="p-4 border-l-4 border-l-blue-500">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Total Orders</p>
                  <p className="text-3xl font-bold text-blue-600">{totalOrders}</p>
                </Card>

                <Card className="p-4 border-l-4 border-l-green-500">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Gross Revenue</p>
                  <p className="text-2xl font-bold text-green-600">{formatCurrency(totalRevenue)}</p>
                </Card>

                <Card className="p-4 border-l-4 border-l-red-500">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Expenses</p>
                  <p className="text-2xl font-bold text-red-600">{formatCurrency(totalExpenses)}</p>
                </Card>

                <Card className="p-4 border-l-4 border-l-purple-500">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Net Revenue</p>
                  <p className={`text-2xl font-bold ${netRevenue >= 0 ? 'text-purple-600' : 'text-red-600'}`}>
                    {formatCurrency(netRevenue)}
                  </p>
                </Card>
              </div>
            </div>

            {/* Payment & Order Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">Payment Methods</h2>
                <Card className="p-4">
                  <div className="space-y-3">
                    {Object.entries(paymentBreakdown).map(([method, amount]) => (
                      <div key={method} className="flex justify-between items-center pb-2 border-b last:border-b-0">
                        <span className="text-gray-600 font-medium">{method}</span>
                        <span className="font-bold text-gray-900">{formatCurrency(amount)}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              <div>
                <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">Order Statistics</h2>
                <Card className="p-4 space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-gray-600">Average Order Value</span>
                    <span className="font-bold">{formatCurrency(avgOrderValue)}</span>
                  </div>
                  {voidedOrders.length > 0 && (
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="text-gray-600">Voided Orders</span>
                      <span className="font-bold text-orange-600">{voidedOrders.length}</span>
                    </div>
                  )}
                  {totalDiscounts > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total Discounts</span>
                      <span className="font-bold text-red-600">{formatCurrency(totalDiscounts)}</span>
                    </div>
                  )}
                </Card>
              </div>
            </div>

            {/* Top Products */}
            <div>
              <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">Top Selling Products</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">By Quantity</h3>
                  <div className="space-y-2">
                    {topByQuantity.map(([, data], idx) => (
                      <div key={idx} className="flex justify-between text-sm items-center">
                        <div>
                          <span className="font-medium text-gray-900">{idx + 1}. {data.name}</span>
                        </div>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded font-semibold">
                          {data.quantity} units
                        </span>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">By Revenue</h3>
                  <div className="space-y-2">
                    {topByRevenue.map(([, data], idx) => (
                      <div key={idx} className="flex justify-between text-sm items-center">
                        <div>
                          <span className="font-medium text-gray-900">{idx + 1}. {data.name}</span>
                        </div>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded font-semibold">
                          {formatCurrency(data.revenue)}
                        </span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>

            {/* Inventory Alerts */}
            {(lowStockProducts.length > 0 || outOfStockProducts.length > 0) && (
              <div>
                <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">Inventory Alerts</h2>
                <Card className="p-4 border-orange-200 bg-orange-50">
                  <div className="space-y-3">
                    {outOfStockProducts.length > 0 && (
                      <div className="pb-3 border-b border-orange-200">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="h-2 w-2 rounded-full bg-red-600"></div>
                          <p className="text-sm font-semibold text-red-700">Out of Stock ({outOfStockProducts.length})</p>
                        </div>
                        <div className="text-sm text-red-600 ml-4">
                          {outOfStockProducts.slice(0, 5).map(p => p.name).join(', ')}
                          {outOfStockProducts.length > 5 && ` +${outOfStockProducts.length - 5} more`}
                        </div>
                      </div>
                    )}
                    {lowStockProducts.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="h-2 w-2 rounded-full bg-orange-600"></div>
                          <p className="text-sm font-semibold text-orange-700">Low Stock ({lowStockProducts.length})</p>
                        </div>
                        <div className="text-sm text-orange-600 ml-4">
                          {lowStockProducts.slice(0, 5).map(p => `${p.name} (${p.stock})`).join(', ')}
                          {lowStockProducts.length > 5 && ` +${lowStockProducts.length - 5} more`}
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-6 border-t mt-4">
              <Button
                onClick={generatePDF}
                className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-semibold"
              >
                <Download className="h-4 w-4 mr-2" />
                Download End of Day Report
              </Button>
              <Button
                onClick={onConfirmEndDay}
                className="flex-1 bg-black hover:bg-gray-800 text-white"
              >
                Confirm & End Day
              </Button>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}