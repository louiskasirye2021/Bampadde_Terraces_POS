// Table management utilities for restaurant POS system

import { Order, OrderItem, Table, TableChangeRecord } from './mockData';

/**
 * Change the table for an active order
 * Moves an order from one table to another
 * 
 * @param orderId - The order ID to move
 * @param currentOrder - The current order being modified
 * @param newTableNumber - New table number
 * @param newTableColor - New table color
 * @param performedBy - User performing the action
 * @returns Updated order with new table info
 */
export function changeTable(
  orderId: string,
  currentOrder: OrderItem[],
  oldTableNumber: string,
  oldTableColor: string,
  newTableNumber: string,
  newTableColor: string,
  performedBy: string
): {
  updatedOrder: Partial<Order>;
  changeRecord: TableChangeRecord;
  validationError?: string;
} {
  // Validation: ensure we're not switching to the same table
  if (oldTableNumber === newTableNumber && oldTableColor === newTableColor) {
    return {
      updatedOrder: {},
      changeRecord: {} as TableChangeRecord,
      validationError: 'Cannot change to the same table',
    };
  }

  // Validation: ensure order has items
  if (!currentOrder || currentOrder.length === 0) {
    return {
      updatedOrder: {},
      changeRecord: {} as TableChangeRecord,
      validationError: 'Cannot change table for an empty order',
    };
  }

  const changeRecord: TableChangeRecord = {
    id: `TCR-${Date.now()}`,
    orderId,
    fromTableId: `${oldTableNumber}-${oldTableColor}`,
    fromTableNumber: oldTableNumber,
    toTableId: `${newTableNumber}-${newTableColor}`,
    toTableNumber: newTableNumber,
    timestamp: new Date(),
    changeType: 'manual_change',
    performedBy,
  };

  const updatedOrder: Partial<Order> = {
    tableNumber: newTableNumber,
    tableColor: newTableColor,
    originalTableId: `${oldTableNumber}-${oldTableColor}`,
    mergeHistory: [
      {
        timestamp: new Date(),
        fromTable: `${oldTableNumber} ${oldTableColor}`,
        toTable: `${newTableNumber} ${newTableColor}`,
        action: 'change',
      },
    ],
  };

  return {
    updatedOrder,
    changeRecord,
  };
}

/**
 * Merge orders from one table into another
 * Combines items from source table with target table
 * 
 * @param sourceOrder - Order from source table
 * @param targetOrder - Order at target table (can be null if no existing order)
 * @param targetTableNumber - Target table number
 * @param targetTableColor - Target table color
 * @param mergeBills - If true, combine into single order; if false, keep separate (for future implementation)
 * @param performedBy - User performing the action
 * @returns Merged order and change record
 */
export function mergeTables(
  sourceOrder: Order,
  targetOrder: Order | null,
  targetTableNumber: string,
  targetTableColor: string,
  mergeBills: boolean = true,
  performedBy: string
): {
  mergedOrder: Order;
  changeRecords: TableChangeRecord[];
  validationError?: string;
} {
  // Validation: ensure source order has items
  if (!sourceOrder.items || sourceOrder.items.length === 0) {
    return {
      mergedOrder: {} as Order,
      changeRecords: [],
      validationError: 'Source table has no items to merge',
    };
  }

  // Validation: prevent merging with the same table
  if (sourceOrder.tableNumber === targetTableNumber && sourceOrder.tableColor === targetTableColor) {
    return {
      mergedOrder: {} as Order,
      changeRecords: [],
      validationError: 'Cannot merge a table with itself',
    };
  }

  let mergedItems: OrderItem[] = [];
  let mergedTotal = 0;
  const changeRecords: TableChangeRecord[] = [];

  if (targetOrder && targetOrder.items.length > 0) {
    // Combine items - avoid duplicates by recalculating
    mergedItems = combineOrderItems(sourceOrder.items, targetOrder.items);
    mergedTotal = mergedItems.reduce((sum, item) => sum + item.total, 0);

    // Create change record for the target order
    const targetChangeRecord: TableChangeRecord = {
      id: `TCR-${Date.now()}-target`,
      orderId: targetOrder.id,
      fromTableId: `${targetOrder.tableNumber}-${targetOrder.tableColor}`,
      fromTableNumber: targetOrder.tableNumber,
      toTableId: `${targetTableNumber}-${targetTableColor}`,
      toTableNumber: targetTableNumber,
      timestamp: new Date(),
      changeType: 'merge',
      performedBy,
      reason: `Merged with Table ${sourceOrder.tableNumber} ${sourceOrder.tableColor}`,
    };
    changeRecords.push(targetChangeRecord);
  } else {
    // No existing order at target, just move source items
    mergedItems = [...sourceOrder.items];
    mergedTotal = sourceOrder.total;
  }

  // Create change record for the source order
  const sourceChangeRecord: TableChangeRecord = {
    id: `TCR-${Date.now()}-source`,
    orderId: sourceOrder.id,
    fromTableId: `${sourceOrder.tableNumber}-${sourceOrder.tableColor}`,
    fromTableNumber: sourceOrder.tableNumber,
    toTableId: `${targetTableNumber}-${targetTableColor}`,
    toTableNumber: targetTableNumber,
    timestamp: new Date(),
    changeType: 'merge',
    performedBy,
    reason: `Merged to Table ${targetTableNumber} ${targetTableColor}`,
  };
  changeRecords.push(sourceChangeRecord);

  const mergedOrderId = targetOrder?.id || sourceOrder.id;
  const mergedOrder: Order = {
    id: mergedOrderId,
    tableNumber: targetTableNumber,
    tableColor: targetTableColor,
    waiterName: targetOrder?.waiterName || sourceOrder.waiterName,
    items: mergedItems,
    total: mergedTotal,
    status: 'waiting',
    timestamp: targetOrder?.timestamp || sourceOrder.timestamp,
    mergeTag: `Merged from Table ${sourceOrder.tableNumber} ${sourceOrder.tableColor}`,
    mergeHistory: [
      ...(targetOrder?.mergeHistory || []),
      ...(sourceOrder.mergeHistory || []),
      {
        timestamp: new Date(),
        fromTable: `${sourceOrder.tableNumber} ${sourceOrder.tableColor}`,
        toTable: `${targetTableNumber} ${targetTableColor}`,
        action: 'merge',
      },
    ],
  };

  return {
    mergedOrder,
    changeRecords,
  };
}

/**
 * Combine items from two orders, avoiding duplicates
 * Sums quantities for items with the same product ID
 */
function combineOrderItems(sourceItems: OrderItem[], targetItems: OrderItem[]): OrderItem[] {
  const itemMap = new Map<string, OrderItem>();

  // Add all target items first
  targetItems.forEach(item => {
    itemMap.set(item.productId, { ...item });
  });

  // Add/combine source items
  sourceItems.forEach(sourceItem => {
    const existingItem = itemMap.get(sourceItem.productId);
    if (existingItem) {
      // Item already exists, increase quantity
      existingItem.quantity += sourceItem.quantity;
      existingItem.total = existingItem.quantity * existingItem.price;
    } else {
      // New item, add it
      itemMap.set(sourceItem.productId, { ...sourceItem });
    }
  });

  return Array.from(itemMap.values());
}

/**
 * Get all tables and their status
 * Determines which tables are occupied based on waiting orders
 */
export function getTableStatuses(
  waitingOrders: Order[],
  completedOrders: Order[],
  totalTables: number = 10
): Table[] {
  const tables: Table[] = [];

  // Create mock tables (in a real app, these would come from a database)
  const tableColors = ['White', 'Blue', 'Brown', 'Yellow'];
  let tableIndex = 0;

  for (let i = 1; i <= totalTables; i++) {
    const tableColor = tableColors[(i - 1) % tableColors.length];
    const tableId = `${i}-${tableColor}`;
    
    // Find if this table has an active order
    const activeOrder = waitingOrders.find(
      order => order.tableNumber === String(i) && order.tableColor === tableColor
    );

    tables.push({
      id: tableId,
      tableNumber: String(i),
      tableColor,
      capacity: 4,
      status: activeOrder ? 'occupied' : 'available',
      currentOrderId: activeOrder?.id,
    });

    tableIndex++;
  }

  return tables;
}

/**
 * Validate if a table change is allowed
 */
export function validateTableChange(
  sourceTableNumber: string,
  sourceTableColor: string,
  targetTableNumber: string,
  targetTableColor: string,
  waitingOrders: Order[],
  allowMergeToOccupied: boolean = false
): { valid: boolean; reason?: string } {
  // Check if source table has active order
  const sourceOrder = waitingOrders.find(
    order => order.tableNumber === sourceTableNumber && order.tableColor === sourceTableColor
  );

  if (!sourceOrder) {
    return { valid: false, reason: 'Source table has no active order' };
  }

  // Check if target table is occupied
  const targetOrder = waitingOrders.find(
    order => order.tableNumber === targetTableNumber && order.tableColor === targetTableColor
  );

  if (targetOrder && !allowMergeToOccupied) {
    return { valid: false, reason: 'Target table is already occupied. Use merge instead.' };
  }

  return { valid: true };
}

/**
 * Generate a summary of table change for logging/history
 */
export function generateTableChangeSummary(record: TableChangeRecord): string {
  if (record.changeType === 'manual_change') {
    return `Changed Table ${record.fromTableNumber} ${record.fromTableNumber} → Table ${record.toTableNumber}`;
  } else {
    return `Merged Table ${record.fromTableNumber} → Table ${record.toTableNumber}`;
  }
}
