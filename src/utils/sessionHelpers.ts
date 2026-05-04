// Helper functions for session management
import { DaySession, Order, Product, Expense } from './mockData';

export function getSessionOrders(sessionId: string, allOrders: Order[]): Order[] {
  return allOrders.filter(order => order.sessionId === sessionId);
}

export function getSessionExpenses(sessionDate: Date, allExpenses: Expense[]): Expense[] {
  const sessionDateStr = new Date(sessionDate).toDateString();
  return allExpenses.filter(expense => {
    const expenseDateStr = new Date(expense.date).toDateString();
    return expenseDateStr === sessionDateStr;
  });
}

export function createStockSnapshot(products: Product[]): Record<string, number> {
  return products.reduce((acc, product) => {
    acc[product.id] = product.stock;
    return acc;
  }, {} as Record<string, number>);
}

export function canEndDay(currentOrder: any[], waitingOrders: Order[]): { canEnd: boolean; reason?: string } {
  if (currentOrder.length > 0) {
    return { canEnd: false, reason: 'Please complete or cancel the current order first' };
  }
  
  if (waitingOrders.length > 0) {
    return { canEnd: false, reason: 'Please process all waiting orders before ending the day' };
  }
  
  return { canEnd: true };
}
