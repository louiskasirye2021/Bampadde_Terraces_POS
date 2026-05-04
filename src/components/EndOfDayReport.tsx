import { useEffect, useRef } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { DaySession, Order, Product, Expense } from '../utils/mockData';
import { 
  DollarSign, 
  Receipt, 
  TrendingDown, 
  TrendingUp, 
  ShoppingCart, 
  Package,
  Download,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  PieChart,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

interface EndOfDayReportProps {
  session: DaySession;
  orders: Order[];
  products: Product[];
  expenses: Expense[];
  onDownload?: () => void;
}

export function EndOfDayReport({ session, orders, products, expenses, onDownload }: EndOfDayReportProps) {
  const reportRef = useRef<HTMLDivElement>(null);

  // Calculate metrics
  const sessionOrders = orders.filter(o => o.sessionId === session.id && o.status === 'paid');
  const totalSales = sessionOrders.length;
  const totalIncome = sessionOrders.reduce((sum, o) => sum + o.total, 0);
  const totalExpenses = expenses
    .filter(e => new Date(e.date).toDateString() === new Date(session.date).toDateString())
    .reduce((sum, e) => sum + e.amount, 0);
  const netRevenue = totalIncome - totalExpenses;
  const avgOrderValue = totalSales > 0 ? totalIncome / totalSales : 0;
  const itemsSold = sessionOrders.reduce((sum, o) => sum + o.items.reduce((s, i) => s + i.quantity, 0), 0);

  // Payment method breakdown
  const paymentBreakdown = sessionOrders.reduce((acc, order) => {
    const method = order.paymentMethod || 'Unknown';
    acc[method] = (acc[method] || 0) + order.total;
    return acc;
  }, {} as Record<string, number>);

  // Calculate items sold with details
  // Calculate items sold with details
  const itemsSoldMap = new Map<string, { 
    name: string; 
    category: string; 
    quantity: number; 
    revenue: number; 
    price: number;
  }>();

  sessionOrders.forEach(order => {
    order.items.forEach(item => {
      const existing = itemsSoldMap.get(item.productId);
      if (existing) {
        existing.quantity += item.quantity;
        existing.revenue += item.total;
      } else {
        itemsSoldMap.set(item.productId, {
          name: item.productName,
          category: item.category,
          quantity: item.quantity,
          revenue: item.total,
          price: item.price,
        });
      }
    });
  });

  const itemsSoldArray = Array.from(itemsSoldMap.values()).sort((a, b) => b.revenue - a.revenue);
  const topProducts = itemsSoldArray.slice(0, 10);

  // Category breakdown
  const categoryMap = new Map<string, { name: string; quantity: number; revenue: number }>();
  itemsSoldArray.forEach(item => {
    const existing = categoryMap.get(item.category);
    if (existing) {
      existing.quantity += item.quantity;
      existing.revenue += item.revenue;
    } else {
      categoryMap.set(item.category, {
        name: item.category,
        quantity: item.quantity,
        revenue: item.revenue,
      });
    }
  });

  const categories = Array.from(categoryMap.values()).sort((a, b) => b.revenue - a.revenue);

  // Stock status
  const stockStatus = products.map(product => {
    const sold = itemsSoldMap.get(product.id)?.quantity || 0;
    const remaining = product.stock;
    const status = 
      remaining === 0 ? 'out' :
      remaining <= product.lowStockThreshold ? 'low' :
      sold === 0 ? 'not-sold' : 'good';
    
    return {
      name: product.name,
      category: product.category,
      sold,
      remaining,
      reorderLevel: product.lowStockThreshold,
      status,
    };
  });

  const lowStockItems = stockStatus.filter(s => s.status === 'low').length;
  const outOfStockItems = stockStatus.filter(s => s.status === 'out').length;

  const formatCurrency = (amount: number) => `UGX ${amount.toLocaleString('en-UG', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
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

  // Calculate percentages
  const profitMargin = totalIncome > 0 ? ((netRevenue / totalIncome) * 100).toFixed(1) : 0;

  const downloadPDF = async () => {
    if (!reportRef.current) return;

    const element = reportRef.current;
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;
    
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
    }

    const fileName = `EndOfDayReport_${new Date(session.date).toISOString().split('T')[0]}.pdf`;
    pdf.save(fileName);
    
    if (onDownload) onDownload();
  };

  // Component to render simple horizontal bar chart
  const SimpleBarChart = ({ data, maxValue }: { data: { label: string; value: number }[]; maxValue: number }) => {
    return (
      <div className="space-y-3">
        {data.map((item, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700 truncate">{item.label}</span>
              <span className="text-sm font-bold text-gray-900 ml-2">{formatCurrency(item.value)}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-orange-400 to-orange-600 h-2 rounded-full transition-all"
                style={{ width: `${(item.value / maxValue) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const chartData = topProducts.map(p => ({ label: p.name, value: p.revenue }));
  const maxChartValue = Math.max(...chartData.map(d => d.value), 1);

  return (
    <div className="space-y-4">
      <div className="flex justify-end no-print">
        <Button
          onClick={downloadPDF}
          className="bg-orange-600 hover:bg-orange-700 text-white"
        >
          <Download className="h-4 w-4 mr-2" />
          Download PDF Report
        </Button>
      </div>

      <div ref={reportRef} className="bg-white p-8 space-y-8">
        {/* ======================== PREMIUM HEADER ======================== */}
        <div className="bg-gradient-to-r from-gray-900 via-orange-900 to-gray-900 text-white p-8 rounded-lg border-4 border-orange-600">
          <div className="text-center space-y-3">
            <h1 className="text-5xl font-black tracking-tight">BAMPADDE TERRACES</h1>
            <p className="text-orange-300 text-xl font-semibold">📍 Komamboga, Uganda</p>
            <div className="h-1 w-24 bg-orange-500 mx-auto"></div>
            <h2 className="text-3xl font-bold text-orange-300">END OF DAY SALES REPORT</h2>
          </div>

          <div className="grid grid-cols-4 gap-4 mt-6 text-sm">
            <div className="text-center">
              <p className="text-orange-300 text-xs uppercase tracking-wide">Report Date</p>
              <p className="font-bold text-lg">{formatDate(session.date).split(' ').slice(0, 2).join(' ')}</p>
            </div>
            <div className="text-center">
              <p className="text-orange-300 text-xs uppercase tracking-wide">Time Period</p>
              <p className="font-bold text-lg">{formatTime(session.startTime)} - {session.endTime ? formatTime(session.endTime) : 'Ongoing'}</p>
            </div>
            <div className="text-center">
              <p className="text-orange-300 text-xs uppercase tracking-wide">Reported By</p>
              <p className="font-bold text-lg">{session.staffName}</p>
            </div>
            <div className="text-center">
              <p className="text-orange-300 text-xs uppercase tracking-wide">Generated</p>
              <p className="font-bold text-lg">{new Date().toLocaleTimeString('en-UG', { hour: '2-digit', minute: '2-digit' })}</p>
            </div>
          </div>
        </div>

        {/* ======================== MAIN KPI DASHBOARD ======================== */}
        <div>
          <h3 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
            <div className="w-2 h-8 bg-orange-600 rounded"></div>
            KEY PERFORMANCE INDICATORS
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {/* Total Sales */}
            <Card className="p-4 border-l-4 border-blue-500 bg-gradient-to-br from-blue-50 to-white">
              <div className="flex items-center gap-2">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Receipt className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-black text-blue-600">{totalSales}</p>
                  <p className="text-xs text-gray-600 font-semibold">Total Sales</p>
                </div>
              </div>
            </Card>

            {/* Total Income */}
            <Card className="p-4 border-l-4 border-green-500 bg-gradient-to-br from-green-50 to-white">
              <div className="flex items-center gap-2">
                <div className="p-3 bg-green-100 rounded-lg">
                  <DollarSign className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-lg font-black text-green-600">{totalIncome > 999999 ? (totalIncome / 1000000).toFixed(1) + 'M' : (totalIncome / 1000).toFixed(0) + 'K'}</p>
                  <p className="text-xs text-gray-600 font-semibold">Income</p>
                </div>
              </div>
            </Card>

            {/* Expenses */}
            <Card className="p-4 border-l-4 border-red-500 bg-gradient-to-br from-red-50 to-white">
              <div className="flex items-center gap-2">
                <div className="p-3 bg-red-100 rounded-lg">
                  <TrendingDown className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="text-lg font-black text-red-600">{totalExpenses > 999999 ? (totalExpenses / 1000000).toFixed(1) + 'M' : (totalExpenses / 1000).toFixed(0) + 'K'}</p>
                  <p className="text-xs text-gray-600 font-semibold">Expenses</p>
                </div>
              </div>
            </Card>

            {/* Net Revenue */}
            <Card className="p-4 border-l-4 border-purple-500 bg-gradient-to-br from-purple-50 to-white">
              <div className="flex items-center gap-2">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className={`text-lg font-black ${netRevenue >= 0 ? 'text-purple-600' : 'text-red-600'}`}>
                    {netRevenue > 999999 ? (netRevenue / 1000000).toFixed(1) + 'M' : (netRevenue / 1000).toFixed(0) + 'K'}
                  </p>
                  <p className="text-xs text-gray-600 font-semibold">Revenue</p>
                </div>
              </div>
            </Card>

            {/* Items Sold */}
            <Card className="p-4 border-l-4 border-cyan-500 bg-gradient-to-br from-cyan-50 to-white">
              <div className="flex items-center gap-2">
                <div className="p-3 bg-cyan-100 rounded-lg">
                  <ShoppingCart className="h-5 w-5 text-cyan-600" />
                </div>
                <div>
                  <p className="text-2xl font-black text-cyan-600">{itemsSold}</p>
                  <p className="text-xs text-gray-600 font-semibold">Items Sold</p>
                </div>
              </div>
            </Card>

            {/* Profit Margin */}
            <Card className="p-4 border-l-4 border-amber-500 bg-gradient-to-br from-amber-50 to-white">
              <div className="flex items-center gap-2">
                <div className="p-3 bg-amber-100 rounded-lg">
                  <BarChart3 className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className={`text-2xl font-black ${parseFloat(profitMargin as string) >= 0 ? 'text-amber-600' : 'text-red-600'}`}>
                    {profitMargin}%
                  </p>
                  <p className="text-xs text-gray-600 font-semibold">Margin</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* ======================== SALES BREAKDOWN ======================== */}
        <div className="grid grid-cols-2 gap-6">
          {/* Sales by Category */}
          <div>
            <h3 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-3">
              <PieChart className="h-5 w-5 text-orange-600" />
              SALES BY CATEGORY
            </h3>
            <Card className="p-6">
              <SimpleBarChart 
                data={categories.slice(0, 5).map(c => ({ label: c.name, value: c.revenue }))}
                maxValue={Math.max(...categories.map(c => c.revenue), 1)}
              />
            </Card>
          </div>

          {/* Payment Methods */}
          <div>
            <h3 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-3">
              <DollarSign className="h-5 w-5 text-orange-600" />
              PAYMENT BREAKDOWN
            </h3>
            <Card className="p-6 space-y-4">
              {Object.entries(paymentBreakdown).map(([method, amount]) => {
                const percentage = totalIncome > 0 ? (amount / totalIncome) * 100 : 0;
                const colors = {
                  'Cash': { bg: 'bg-green-500', light: 'bg-green-100', text: 'text-green-600' },
                  'Card': { bg: 'bg-blue-500', light: 'bg-blue-100', text: 'text-blue-600' },
                  'Mobile': { bg: 'bg-purple-500', light: 'bg-purple-100', text: 'text-purple-600' },
                  'Credit': { bg: 'bg-amber-500', light: 'bg-amber-100', text: 'text-amber-600' },
                };
                const color = colors[method as keyof typeof colors] || { bg: 'bg-gray-500', light: 'bg-gray-100', text: 'text-gray-600' };
                
                return (
                  <div key={method}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-gray-700">{method}</span>
                      <span className={`text-sm font-bold ${color.text}`}>{percentage.toFixed(1)}%</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-gray-200 rounded-full h-3">
                        <div 
                          className={`${color.bg} h-3 rounded-full transition-all`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className={`text-sm font-bold ${color.text} min-w-fit`}>{formatCurrency(amount)}</span>
                    </div>
                  </div>
                );
              })}
            </Card>
          </div>
        </div>

        {/* ======================== TOP PRODUCTS ======================== */}
        <div>
          <h3 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-3">
            <BarChart3 className="h-5 w-5 text-orange-600" />
            TOP 10 PRODUCTS BY REVENUE
          </h3>
          <Card className="p-6">
            <SimpleBarChart 
              data={topProducts.map(p => ({ label: p.name, value: p.revenue }))}
              maxValue={maxChartValue}
            />
          </Card>
        </div>
        {/* ======================== DETAILED SALES TABLE ======================== */}
        <div>
          <h3 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-3">
            <Receipt className="h-5 w-5 text-orange-600" />
            COMPLETE SALES LOG ({totalSales} transactions)
          </h3>
          <Card className="overflow-hidden border border-gray-200">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left font-bold">#</th>
                    <th className="px-4 py-3 text-left font-bold">Time</th>
                    <th className="px-4 py-3 text-left font-bold">Table</th>
                    <th className="px-4 py-3 text-left font-bold">Waiter</th>
                    <th className="px-4 py-3 text-center font-bold">Items</th>
                    <th className="px-4 py-3 text-left font-bold">Payment</th>
                    <th className="px-4 py-3 text-right font-bold">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {sessionOrders.slice(0, 15).map((order, index) => (
                    <tr key={order.id} className={index % 2 === 0 ? 'bg-white hover:bg-orange-50' : 'bg-gray-50 hover:bg-orange-50'}>
                      <td className="px-4 py-3 font-bold text-gray-700">{index + 1}</td>
                      <td className="px-4 py-3 text-gray-600">{formatTime(order.timestamp)}</td>
                      <td className="px-4 py-3 font-semibold">{order.tableNumber} <span className="text-orange-600">{order.tableColor}</span></td>
                      <td className="px-4 py-3 text-gray-600">{order.waiterName}</td>
                      <td className="px-4 py-3 text-center"><Badge variant="outline">{order.items.length}</Badge></td>
                      <td className="px-4 py-3">
                        <Badge className={
                          order.paymentMethod === 'Cash' ? 'bg-green-100 text-green-800' :
                          order.paymentMethod === 'Card' ? 'bg-blue-100 text-blue-800' :
                          'bg-purple-100 text-purple-800'
                        }>
                          {order.paymentMethod}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-right font-bold text-green-600">{formatCurrency(order.total)}</td>
                    </tr>
                  ))}
                  {sessionOrders.length > 15 && (
                    <tr className="bg-orange-100 text-gray-700">
                      <td colSpan={7} className="px-4 py-3 text-center font-semibold">
                        ... and {sessionOrders.length - 15} more transactions
                      </td>
                    </tr>
                  )}
                  <tr className="bg-gradient-to-r from-orange-600 to-orange-700 text-white">
                    <td colSpan={6} className="px-4 py-3 text-right font-bold text-lg">TOTAL SALES:</td>
                    <td className="px-4 py-3 text-right font-black text-xl">{formatCurrency(totalIncome)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* ======================== EXPENSES BREAKDOWN ======================== */}
        <div>
          <h3 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-3">
            <TrendingDown className="h-5 w-5 text-orange-600" />
            EXPENSES BREAKDOWN
          </h3>
          {expenses.filter(e => new Date(e.date).toDateString() === new Date(session.date).toDateString()).length === 0 ? (
            <Card className="p-12 text-center">
              <CheckCircle className="h-16 w-16 mx-auto mb-4 text-green-500" />
              <p className="text-lg font-semibold text-gray-700">No expenses recorded today ✅</p>
              <p className="text-sm text-gray-500 mt-2">This is a great day for profit!</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="overflow-hidden border border-gray-200">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
                        <tr>
                          <th className="px-4 py-3 text-left font-bold">#</th>
                          <th className="px-4 py-3 text-left font-bold">Expense</th>
                          <th className="px-4 py-3 text-left font-bold">Category</th>
                          <th className="px-4 py-3 text-left font-bold">Time</th>
                          <th className="px-4 py-3 text-right font-bold">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {expenses
                          .filter(e => new Date(e.date).toDateString() === new Date(session.date).toDateString())
                          .map((expense, index) => (
                            <tr key={expense.id} className={index % 2 === 0 ? 'bg-white hover:bg-red-50' : 'bg-gray-50 hover:bg-red-50'}>
                              <td className="px-4 py-3 font-bold text-gray-700">{index + 1}</td>
                              <td className="px-4 py-3 font-semibold text-gray-800">{expense.description}</td>
                              <td className="px-4 py-3"><Badge variant="outline">{expense.category}</Badge></td>
                              <td className="px-4 py-3 text-gray-600">{formatTime(expense.date)}</td>
                              <td className="px-4 py-3 text-right font-bold text-red-600">{formatCurrency(expense.amount)}</td>
                            </tr>
                          ))}
                        <tr className="bg-gradient-to-r from-red-600 to-red-700 text-white">
                          <td colSpan={4} className="px-4 py-3 text-right font-bold text-lg">TOTAL EXPENSES:</td>
                          <td className="px-4 py-3 text-right font-black text-xl">{formatCurrency(totalExpenses)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Card>
              </div>
              <div>
                <Card className="p-6 bg-gradient-to-br from-red-50 to-red-100 border border-red-200">
                  <h4 className="font-bold text-lg text-red-900 mb-4 flex items-center gap-2">
                    <TrendingDown className="h-5 w-5" />
                    Expenses Summary
                  </h4>
                  <div className="space-y-3">
                    {expenses
                      .filter(e => new Date(e.date).toDateString() === new Date(session.date).toDateString())
                      .reduce((acc, e) => {
                        const cat = acc.find(item => item.category === e.category);
                        if (cat) cat.amount += e.amount;
                        else acc.push({ category: e.category, amount: e.amount });
                        return acc;
                      }, [] as { category: string; amount: number }[])
                      .sort((a, b) => b.amount - a.amount)
                      .map(item => (
                        <div key={item.category} className="flex justify-between items-center">
                          <span className="text-red-900 font-medium">{item.category}</span>
                          <span className="font-bold text-red-700">{formatCurrency(item.amount)}</span>
                        </div>
                      ))}
                  </div>
                </Card>
              </div>
            </div>
          )}
        </div>

        {/* ======================== PRODUCT PERFORMANCE ======================== */}
        <div>
          <h3 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-3">
            <Package className="h-5 w-5 text-orange-600" />
            PRODUCT PERFORMANCE: RANKED BY REVENUE
          </h3>
          <Card className="overflow-hidden border border-gray-200">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left font-bold">Rank</th>
                    <th className="px-4 py-3 text-left font-bold">Product Name</th>
                    <th className="px-4 py-3 text-left font-bold">Category</th>
                    <th className="px-4 py-3 text-center font-bold">Qty</th>
                    <th className="px-4 py-3 text-right font-bold">Unit Price</th>
                    <th className="px-4 py-3 text-right font-bold">Total Revenue</th>
                    <th className="px-4 py-3 text-center font-bold">% of Sales</th>
                  </tr>
                </thead>
                <tbody>
                  {itemsSoldArray.map((item, index) => {
                    const percentage = totalIncome > 0 ? (item.revenue / totalIncome) * 100 : 0;
                    const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '';
                    const color = index < 3 ? 'bg-yellow-50' : index % 2 === 0 ? 'bg-white hover:bg-orange-50' : 'bg-gray-50 hover:bg-orange-50';
                    
                    return (
                      <tr key={item.name} className={color}>
                        <td className="px-4 py-3 font-bold text-xl text-center">{medal} {index + 1}</td>
                        <td className="px-4 py-3 font-semibold text-gray-900">{item.name}</td>
                        <td className="px-4 py-3"><Badge className="bg-orange-100 text-orange-800">{item.category}</Badge></td>
                        <td className="px-4 py-3 text-center font-bold">{item.quantity}</td>
                        <td className="px-4 py-3 text-right text-gray-600">{formatCurrency(item.price)}</td>
                        <td className="px-4 py-3 text-right font-bold text-green-600 text-lg">{formatCurrency(item.revenue)}</td>
                        <td className="px-4 py-3 text-center">
                          <div className="flex items-center gap-2 justify-center">
                            <div className="w-14 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-gradient-to-r from-orange-400 to-orange-600 h-2 rounded-full"
                                style={{ width: `${Math.min(percentage, 100)}%` }}
                              ></div>
                            </div>
                            <span className="text-xs font-bold text-gray-700 min-w-fit">{percentage.toFixed(1)}%</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* ======================== INVENTORY STATUS ======================== */}
        <div>
          <h3 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-3">
            <Package className="h-5 w-5 text-orange-600" />
            INVENTORY STATUS & STOCK LEVELS
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card className="p-4 bg-gradient-to-br from-blue-50 to-white border-l-4 border-blue-500">
              <p className="text-3xl font-black text-blue-600">{products.length}</p>
              <p className="text-sm text-gray-600 font-semibold">Total SKUs</p>
            </Card>
            <Card className="p-4 bg-gradient-to-br from-green-50 to-white border-l-4 border-green-500">
              <p className="text-3xl font-black text-green-600">{itemsSoldArray.length}</p>
              <p className="text-sm text-gray-600 font-semibold">Items Sold Today</p>
            </Card>
            <Card className="p-4 bg-gradient-to-br from-amber-50 to-white border-l-4 border-amber-500">
              <p className="text-3xl font-black text-amber-600">{lowStockItems}</p>
              <p className="text-sm text-gray-600 font-semibold">Low Stock ⚠️</p>
            </Card>
            <Card className="p-4 bg-gradient-to-br from-red-50 to-white border-l-4 border-red-500">
              <p className="text-3xl font-black text-red-600">{outOfStockItems}</p>
              <p className="text-sm text-gray-600 font-semibold">Out of Stock 🔴</p>
            </Card>
          </div>

          <Card className="overflow-hidden border border-gray-200">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left font-bold">Product Name</th>
                    <th className="px-4 py-3 text-left font-bold">Category</th>
                    <th className="px-4 py-3 text-center font-bold">Sold Today</th>
                    <th className="px-4 py-3 text-center font-bold">Remaining Stock</th>
                    <th className="px-4 py-3 text-center font-bold">Threshold</th>
                    <th className="px-4 py-3 text-center font-bold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {stockStatus.map((item, index) => {
                    let statusDisplay = '';
                    let statusColor = '';
                    if (item.status === 'out') {
                      statusDisplay = '🔴 OUT OF STOCK';
                      statusColor = 'bg-red-100';
                    } else if (item.status === 'low') {
                      statusDisplay = '🟡 LOW STOCK';
                      statusColor = 'bg-amber-100';
                    } else if (item.status === 'good') {
                      statusDisplay = '🟢 GOOD';
                      statusColor = 'bg-green-100';
                    } else {
                      statusDisplay = '🔵 NOT SOLD';
                      statusColor = 'bg-blue-100';
                    }
                    
                    return (
                      <tr 
                        key={item.name} 
                        className={statusColor + ' hover:opacity-75'}
                      >
                        <td className="px-4 py-3 font-semibold text-gray-900">{item.name}</td>
                        <td className="px-4 py-3"><Badge variant="outline">{item.category}</Badge></td>
                        <td className="px-4 py-3 text-center font-bold">{item.sold}</td>
                        <td className="px-4 py-3 text-center font-bold text-lg">{item.remaining}</td>
                        <td className="px-4 py-3 text-center text-gray-700">{item.reorderLevel}</td>
                        <td className="px-4 py-3 text-center font-bold text-sm">{statusDisplay}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* ======================== FINANCIAL SUMMARY ======================== */}
        <div>
          <h3 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-3">
            <DollarSign className="h-5 w-5 text-orange-600" />
            FINANCIAL RECONCILIATION & SUMMARY
          </h3>
          <Card className="p-8 bg-gradient-to-br from-gray-900 to-gray-800 text-white border-2 border-orange-600">
            <div className="space-y-6 font-mono text-base">
              <div className="flex justify-between items-center border-b border-gray-500 pb-3">
                <span className="text-lg font-bold">💰 Gross Revenue (All Sales)</span>
                <span className="text-2xl font-black text-green-400">+ {formatCurrency(totalIncome)}</span>
              </div>
              
              {Object.entries(paymentBreakdown).sort((a, b) => b[1] - a[1]).map(([method, amount], idx) => (
                <div key={method} className="flex justify-between items-center pl-6 text-gray-300">
                  <span>{idx + 1}. {method === 'Cash' ? '💵' : '🏧'} {method} Sales</span>
                  <span className="text-lg font-semibold">{formatCurrency(amount)}</span>
                </div>
              ))}

              <div className="border-t-2 border-orange-600 my-4"></div>

              <div className="flex justify-between items-center border-b border-gray-500 pb-3">
                <span className="text-lg font-bold">⚠️ Total Expenses</span>
                <span className="text-2xl font-black text-red-400">- {formatCurrency(totalExpenses)}</span>
              </div>

              <div className="border-t-2 border-orange-600 my-4"></div>

              <div className="flex justify-between items-center bg-orange-600/20 p-6 rounded-lg border-2 border-orange-500">
                <span className="text-xl font-black">🎯 NET REVENUE</span>
                <div className="text-right">
                  <span className={`text-4xl font-black ${netRevenue >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {netRevenue >= 0 ? '+' : '-'} {formatCurrency(Math.abs(netRevenue))}
                  </span>
                  <span className="block text-sm mt-1">{netRevenue >= 0 ? '✅ Profitable' : '❌ Loss'}</span>
                </div>
              </div>

              <div className="mt-6 space-y-2 text-sm text-gray-300">
                <div className="flex justify-between">
                  <span>Profit Margin:</span>
                  <span className="font-bold">{profitMargin}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Average Order Value:</span>
                  <span className="font-bold">{formatCurrency(avgOrderValue)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Items Moved:</span>
                  <span className="font-bold">{itemsSold} units</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* ======================== FOOTER ======================== */}
        <div className="border-t-4 border-orange-600 pt-6 text-center text-xs text-gray-500 space-y-2">
          <div className="flex justify-center gap-6">
            <div>
              <p className="font-bold text-gray-600">Report Generated</p>
              <p>{new Date().toLocaleString('en-UG')}</p>
            </div>
            <div>
              <p className="font-bold text-gray-600">System</p>
              <p>Bampadde Terraces POS v1.0</p>
            </div>
            <div>
              <p className="font-bold text-gray-600">Status</p>
              <p className="text-green-600 font-bold">✅ COMPLETE</p>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-4 italic">Confidential — For Internal Use Only | This report is system-generated</p>
        </div>
      </div>
    </div>
  );
}
