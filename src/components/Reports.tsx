import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Order, Product, Expense } from '../utils/mockData';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, DollarSign, ShoppingBag, Calendar, Download } from 'lucide-react';
import { jsPDF } from 'jspdf';

interface ReportsProps {
  orders: Order[];
  products: Product[];
  expenses: Expense[];
}

export function Reports({ orders, products, expenses }: ReportsProps) {
  const [dateRange, setDateRange] = useState('today');

  // Calculate metrics
  const paidOrders = orders.filter(o => o.status === 'paid');
  const totalSales = paidOrders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = paidOrders.length;
  const avgOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0;

  // Calculate total cost and profit
  const totalCost = paidOrders.reduce((sum, order) => {
    return sum + order.items.reduce((itemSum, item) => {
      const product = products.find(p => p.id === item.productId);
      return itemSum + (product ? product.cost * item.quantity : 0);
    }, 0);
  }, 0);
  const totalProfit = totalSales - totalCost;
  const profitMargin = totalSales > 0 ? (totalProfit / totalSales) * 100 : 0;

  // Top selling products
  const productSales = paidOrders.reduce((acc, order) => {
    order.items.forEach(item => {
      if (!acc[item.productId]) {
        acc[item.productId] = {
          id: item.productId,
          name: item.productName,
          quantity: 0,
          revenue: 0,
        };
      }
      acc[item.productId].quantity += item.quantity;
      acc[item.productId].revenue += item.total;
    });
    return acc;
  }, {} as Record<string, { id: string; name: string; quantity: number; revenue: number }>);

  const topProducts = Object.values(productSales)
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 10);

  // Sales by category
  const categorySales = paidOrders.reduce((acc, order) => {
    order.items.forEach(item => {
      const product = products.find(p => p.id === item.productId);
      if (product) {
        if (!acc[product.category]) {
          acc[product.category] = 0;
        }
        acc[product.category] += item.total;
      }
    });
    return acc;
  }, {} as Record<string, number>);

  const categoryData = Object.entries(categorySales).map(([name, value], index) => ({
    name,
    value,
    id: `category-${name}-${index}`,
  }));

  const COLORS = ['#ea580c', '#fb923c', '#fdba74', '#fed7aa', '#1f2937'];

  // Hourly sales (mock data for demonstration)
  const hourlySales = [
    { hour: '12PM', sales: 45000 },
    { hour: '1PM', sales: 52000 },
    { hour: '2PM', sales: 38000 },
    { hour: '3PM', sales: 65000 },
    { hour: '4PM', sales: 78000 },
    { hour: '5PM', sales: 95000 },
    { hour: '6PM', sales: 125000 },
    { hour: '7PM', sales: 145000 },
    { hour: '8PM', sales: 165000 },
    { hour: '9PM', sales: 155000 },
    { hour: '10PM', sales: 142000 },
    { hour: '11PM', sales: 98000 },
  ];

  const exportReportPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    let yPos = 20;

    // Header
    doc.setFillColor(0, 0, 0);
    doc.rect(0, 0, pageWidth, 30, 'F');
    doc.setTextColor(255, 140, 0);
    doc.setFontSize(20);
    doc.text('BAMPADDE TERRACES - REPORTS & ANALYTICS', pageWidth / 2, 15, { align: 'center' });
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    doc.text('Komamboga, Uganda', pageWidth / 2, 23, { align: 'center' });

    yPos = 45;
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text(`Reports for: ${dateRange.charAt(0).toUpperCase() + dateRange.slice(1)}`, 15, yPos);
    yPos += 15;

    // Key Metrics Section
    doc.setFontSize(12);
    doc.text('Key Performance Metrics', 15, yPos);
    yPos += 8;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);

    doc.text(`Total Sales: UGX ${totalSales.toLocaleString()}`, 15, yPos);
    yPos += 6;
    doc.text(`Total Profit: UGX ${totalProfit.toLocaleString()}`, 15, yPos);
    yPos += 6;
    doc.text(`Profit Margin: ${profitMargin.toFixed(2)}%`, 15, yPos);
    yPos += 6;
    doc.text(`Total Orders: ${totalOrders}`, 15, yPos);
    yPos += 6;
    doc.text(`Average Order Value: UGX ${avgOrderValue.toLocaleString()}`, 15, yPos);
    yPos += 12;

    // Sales by Category
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text('Sales by Category', 15, yPos);
    yPos += 8;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);

    categoryData.forEach((category) => {
      if (yPos > 250) {
        doc.addPage();
        yPos = 20;
      }
      doc.text(`${category.name}: UGX ${category.value.toLocaleString()}`, 15, yPos);
      yPos += 6;
    });

    yPos += 5;

    // Top Products
    if (yPos > 240) {
      doc.addPage();
      yPos = 20;
    }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text('Top Selling Products', 15, yPos);
    yPos += 8;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);

    topProducts.forEach((product, idx) => {
      if (yPos > 250) {
        doc.addPage();
        yPos = 20;
      }
      doc.text(
        `${idx + 1}. ${product.name} - Qty: ${product.quantity}, Revenue: UGX ${product.revenue.toLocaleString()}`,
        15,
        yPos
      );
      yPos += 6;
    });

    // Footer
    const pageCount = doc.internal.pages.length - 1;
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.text(
        `Page ${i} of ${pageCount} | Generated on ${new Date().toLocaleString('en-UG')}`,
        pageWidth / 2,
        doc.internal.pageSize.height - 10,
        { align: 'center' }
      );
    }

    // Save PDF
    const fileName = `Reports_${dateRange}_${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(fileName);
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      <div className="bg-gradient-to-r from-black to-gray-900 text-white p-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-orange-400">Reports & Analytics</h2>
            <p className="text-xs sm:text-sm opacity-90 mt-1">Business insights and performance metrics</p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-full sm:w-40 bg-white/10 border-white/20 text-white text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="yesterday">Yesterday</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
            <Button className="w-full sm:w-auto h-auto py-2 px-3 sm:px-4 text-white bg-white/10 hover:bg-white/20 border border-white/20 text-xs sm:text-sm font-medium flex items-center justify-center gap-1 sm:gap-2 whitespace-nowrap" onClick={exportReportPDF}>
              <Download className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
              <span>Export</span>
            </Button>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-4 border-l-4 border-l-orange-600">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Sales</p>
                  <p className="text-orange-600">
                    UGX {totalSales.toLocaleString()}
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-orange-600 opacity-50" />
              </div>
            </Card>

            <Card className="p-4 border-l-4 border-l-green-600">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Profit</p>
                  <p className="text-green-600">
                    UGX {totalProfit.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500">
                    Margin: {profitMargin.toFixed(1)}%
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600 opacity-50" />
              </div>
            </Card>

            <Card className="p-4 border-l-4 border-l-blue-600">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Orders</p>
                  <p className="text-blue-600">{totalOrders}</p>
                </div>
                <ShoppingBag className="h-8 w-8 text-blue-600 opacity-50" />
              </div>
            </Card>

            <Card className="p-4 border-l-4 border-l-purple-600">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg Order Value</p>
                  <p className="text-purple-600">
                    UGX {avgOrderValue.toLocaleString()}
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-purple-600 opacity-50" />
              </div>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Hourly Sales Chart */}
            <Card className="p-4">
              <h3 className="text-gray-900 mb-4">Sales by Hour</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={hourlySales}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip formatter={(value) => `UGX ${Number(value).toLocaleString()}`} />
                  <Line type="monotone" dataKey="sales" stroke="#ea580c" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            {/* Category Distribution */}
            <Card className="p-4">
              <h3 className="text-gray-900 mb-4">Sales by Category</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={entry.id} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `UGX ${Number(value).toLocaleString()}`} />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Top Products */}
          <Card className="p-4">
            <h3 className="text-gray-900 mb-4">Top Selling Products</h3>
            <div className="space-y-2">
              {topProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-600 text-white">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-600">Sold: {product.quantity} units</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-orange-600">
                      UGX {product.revenue.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Inventory Status */}
          <Card className="p-4">
            <h3 className="text-gray-900 mb-4">Inventory Turnover</h3>
            <div className="space-y-2">
              {products.slice(0, 5).map((product) => {
                const sold = productSales[product.id]?.quantity || 0;
                const turnoverRate = product.stock > 0 ? (sold / product.stock) * 100 : 0;
                
                return (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-gray-900">{product.name}</p>
                        <Badge
                          variant="outline"
                          className={
                            product.stock <= product.lowStockThreshold
                              ? 'border-red-500 text-red-600'
                              : 'border-green-500 text-green-600'
                          }
                        >
                          {product.stock} in stock
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-orange-600 h-2 rounded-full"
                            style={{ width: `${Math.min(turnoverRate, 100)}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-600 w-16 text-right">
                          {sold} sold
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
}