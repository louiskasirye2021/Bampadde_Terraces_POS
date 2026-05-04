# Table Management System - POS Documentation

## Overview

The table management system enables restaurant staff to efficiently handle dynamic table scenarios including customer relocations and table merging. This document provides a complete guide to the implemented functionality.

## Features Implemented

### 1. Change Table Function

**Purpose**: Move an active order from one table to another when a customer changes seating.

**Function**: `changeTable(orderId, currentOrder, oldTableNumber, oldTableColor, newTableNumber, newTableColor, performedBy)`

**Location**: `src/utils/tableManagement.ts`

**Usage in App**:

```typescript
// Handler in App.tsx
const handleConfirmChangeTable = (updatedOrder, oldTableId, newTableId) => {
  // Updates waiting order with new table info
  // Logs the change for audit trail
};
```

**Behavior**:

- ✅ Prevents switching to the same table
- ✅ Validates order has items before changing
- ✅ Updates table references in order
- ✅ Preserves all items, quantities, and prices
- ✅ Tracks original table in `originalTableId`
- ✅ Records change in merge history with timestamp
- ✅ Logs action for audit trail

**Validation Rules**:

- Cannot change to a table that's already occupied (merge suggested)
- Cannot change to the same table
- Order must contain at least one item

**UI Component**: `src/components/ChangeTableDialog.tsx`

- Shows current order summary
- Dropdown selection for table number and color
- Visual indicators for occupied/available tables
- Confirmation prompt before execution

### 2. Merge Tables Function

**Purpose**: Combine orders from two different tables when customers join each other.

**Function**: `mergeTables(sourceOrder, targetOrder, targetTableNumber, targetTableColor, mergeBills, performedBy)`

**Location**: `src/utils/tableManagement.ts`

**Usage in App**:

```typescript
// Handler in App.tsx
const handleConfirmMergeTable = (mergedOrder, sourceOrderId) => {
  // Removes source order
  // Updates target order with combined items
  // Logs merge action
};
```

**Behavior**:

- ✅ Combines items from both tables intelligently
- ✅ Avoids duplicate items (sums quantities for same product)
- ✅ Recalculates totals automatically
- ✅ Marks source table as available
- ✅ Keeps target table as occupied
- ✅ Tags merged order with reference (e.g., "Merged from Table 3")
- ✅ Records full merge history with timestamps
- ✅ Supports configurable single/multiple bill mode (future)

**Item Combination Logic**:

```typescript
// If merging:
// Table A: 2x Beer (12,000) + 3x Snacks (9,000) = 21,000
// Table B: 1x Beer (6,000) + 2x Cocktails (20,000) = 26,000
// Result: 3x Beer (18,000) + 3x Snacks (9,000) + 2x Cocktails (20,000) = 47,000
```

**UI Component**: `src/components/MergeTablesDialog.tsx`

- Shows source and target order summaries
- Displays merged result preview
- Lists all items with quantities
- Shows combined total
- Visual confirmation with color coding

### 3. Data Structures

#### New Interfaces (mockData.ts):

```typescript
export interface Table {
  id: string;
  tableNumber: string;
  tableColor: string;
  capacity: number;
  status: "available" | "occupied" | "reserved";
  currentOrderId?: string;
}

export interface TableChangeRecord {
  id: string;
  orderId: string;
  fromTableId: string;
  fromTableNumber: string;
  toTableId: string;
  toTableNumber: string;
  timestamp: Date;
  changeType: "manual_change" | "merge";
  performedBy: string;
  reason?: string;
}
```

#### Updated Order Interface:

```typescript
export interface Order {
  // ... existing fields ...

  // New table management fields:
  originalTableId?: string; // Track original table before changes
  mergeTag?: string; // e.g., "Merged from Table 3"
  mergeHistory?: Array<{
    timestamp: Date;
    fromTable: string; // e.g., "3 Red"
    toTable: string; // e.g., "5 Blue"
    action: "change" | "merge";
  }>;
}
```

## User Interface

### Waiting List View

The `WaitingList` component displays all pending orders with action buttons:

**Buttons** (left to right):

1. 🔵 **Edit** - Edit the order items
2. 🟢 **Pay** - Process payment
3. 🟣 **Change Table** (new) - Move to different table
4. 🔷 **Merge Table** (new) - Combine with another table
5. 🔴 **Delete** - Remove order

### Change Table Dialog

**Workflow**:

1. User clicks "Change Table" button on an order
2. Dialog opens showing:
   - Current order summary (items, total, table)
   - Table selection dropdowns (number + color)
   - List of occupied tables (for reference)
   - Selected table status (Available/Occupied)
3. User selects new table
4. System validates:
   - Table is not occupied
   - Not same table as current
5. User confirms change
6. Order updates with new table reference
7. Toast notification confirms success
8. Dialog closes

### Merge Tables Dialog

**Workflow**:

1. User clicks "Merge Table" button on source order
2. Dialog opens showing:
   - Source table order summary
   - Dropdown to select target table
3. User selects target table
4. System displays:
   - Target table order summary
   - Merged result preview with:
     - Total items count
     - Combined total amount
     - All items to be combined
5. User confirms merge
6. System:
   - Removes source order
   - Updates target order with merged items
   - Makes source table available
7. Toast notification shows success
8. Dialog closes

### Order Details Dialog (Enhanced)

New section added: **Table History**

- Shows merge tag if order was merged
- Displays chronological history of table changes
- Shows timestamps for each action
- Visual indicators:
  - 🔄 Arrow icon for table changes
  - 🔀 Merge icon for merges

## Activity Logging

All table management actions are logged in the Activity Log:

**Change Table Log Entry**:

```
Action: "Table Changed"
Details: "Order ORD-1234567890 moved from 3-Red to 5-Blue"
Timestamp: [auto]
User: [current logged-in user]
```

**Merge Tables Log Entry**:

```
Action: "Tables Merged"
Details: "Table 3-Red merged with Table 5-Blue - 8 items combined"
Timestamp: [auto]
User: [current logged-in user]
```

## Validation & Error Handling

### Change Table Validation

| Check              | Rule                           | Message                                                |
| ------------------ | ------------------------------ | ------------------------------------------------------ |
| Same Table         | Cannot change to same table    | "Cannot change to the same table"                      |
| Empty Order        | Cannot change if no items      | "Cannot change table for an empty order"               |
| Occupied Target    | Target table must be available | "Target table is already occupied. Use merge instead." |
| Selection Required | Both table number and color    | "Please select both table number and color"            |

### Merge Tables Validation

| Check            | Rule                           | Message                              |
| ---------------- | ------------------------------ | ------------------------------------ |
| Empty Source     | Source must have items         | "Source table has no items to merge" |
| Same Table       | Cannot merge table with itself | "Cannot merge a table with itself"   |
| Target Selection | Must select target             | "Please select a target table"       |

## State Management (App.tsx)

### New State Variables:

```typescript
// Table Management state
const [selectedOrderForTableChange, setSelectedOrderForTableChange] =
  useState<Order | null>(null);
const [showChangeTableDialog, setShowChangeTableDialog] = useState(false);
const [selectedOrderForMerge, setSelectedOrderForMerge] =
  useState<Order | null>(null);
const [showMergeTableDialog, setShowMergeTableDialog] = useState(false);
const [tableChangeHistory, setTableChangeHistory] = useState<
  Array<{
    timestamp: Date;
    action: string;
    details: string;
  }>
>([]);
```

### New Handlers:

```typescript
// Open dialogs
handleOpenChangeTableDialog(order: Order)
handleOpenMergeTableDialog(order: Order)

// Handle confirmations
handleConfirmChangeTable(updatedOrder, oldTableId, newTableId)
handleConfirmMergeTable(mergedOrder, sourceOrderId)
```

## Integration Points

### Modified Components:

1. **WaitingList.tsx**
   - Added `onChangeTable` callback prop
   - Added `onMergeTable` callback prop
   - Added action buttons with icons
   - Responsive grid layout (5 columns on small screens)

2. **OrderDetailsDialog.tsx**
   - Added table history section
   - Shows merge tag and history timeline
   - Displays change timestamps

3. **App.tsx**
   - Imported new dialog components
   - Added state for table management
   - Added handlers for table operations
   - Passes handlers to WaitingList
   - Renders dialogs with proper props

### New Components:

1. **ChangeTableDialog.tsx**
   - Standalone dialog component
   - Handles table selection UI
   - Shows validation errors
   - Confirmation workflow

2. **MergeTablesDialog.tsx**
   - Standalone dialog component
   - Shows both order summaries
   - Displays merge preview
   - Handles item combination preview

### Utility Functions:

1. **tableManagement.ts**
   - `changeTable()` - Core table change logic
   - `mergeTables()` - Core merge logic
   - `getTableStatuses()` - Get table availability
   - `validateTableChange()` - Validate operations
   - `generateTableChangeSummary()` - Format log messages
   - `combineOrderItems()` - Intelligent item merging

## Usage Examples

### Example 1: Customer Moves to Different Table

**Scenario**: Customer at Table 3 Red wants to move to Table 7 Yellow

```
1. Staff clicks "Change Table" on Table 3 Red order
2. ChangeTableDialog opens
3. Staff selects Table 7 from dropdown, Yellow from color dropdown
4. System checks: Table 7 Yellow is available ✓
5. Staff confirms change
6. Order.tableNumber = "7"
   Order.tableColor = "Yellow"
   Order.originalTableId = "3-Red"
   Order.mergeHistory = [{
     fromTable: "3 Red",
     toTable: "7 Yellow",
     action: "change",
     timestamp: [now]
   }]
7. Toast: "Order moved to Table 7 Yellow"
8. Activity Log: "Table Changed: Order ORD-xxx moved from 3-Red to 7-Yellow"
```

### Example 2: Two Groups Merge Tables

**Scenario**: Group at Table 2 Blue joins friends at Table 6 Green

```
1. Staff clicks "Merge Table" on Table 2 Blue order
2. MergeTablesDialog opens showing Table 2 Blue items
3. Staff selects Table 6 Green from dropdown
4. Preview shows:
   - Table 2 Blue: 3x Beer, 2x Snacks = 24,000
   - Table 6 Green: 2x Beer, 1x Cocktail = 28,000
   - Merged: 5x Beer, 2x Snacks, 1x Cocktail = 52,000
5. Staff confirms merge
6. Order updates:
   - Combines items (5 beers instead of 3+2)
   - Location: Table 6 Green
   - mergeTag: "Merged from Table 2 Blue"
   - mergeHistory includes both actions
7. Table 2 Blue becomes available
8. Toast: "Tables merged! 8 items now on Table 6 Green"
9. Activity Log: "Tables Merged: Table 2-Blue merged with Table 6-Green - 8 items combined"
```

### Example 3: Customer Changes Mind - Multiple Changes

**Scenario**: Customer changes tables twice

```
Order lifecycle:
1. Initial: Table 5 Red
2. Change 1: Customer moves to Table 8 Blue
   - originalTableId: "5-Red"
   - mergeHistory: [{fromTable: "5 Red", toTable: "8 Blue", action: "change", time: 14:30}]
3. Change 2: Customer moves to Table 3 Yellow
   - originalTableId: "5-Red" (unchanged - tracks very first)
   - mergeHistory: [
       {fromTable: "5 Red", toTable: "8 Blue", action: "change", time: 14:30},
       {fromTable: "8 Blue", toTable: "3 Yellow", action: "change", time: 14:45}
     ]
4. Activity Log shows both changes with timestamps
5. Order Details shows full timeline
```

## Best Practices

1. **Always confirm before executing** - Dialogs require explicit confirmation
2. **Check table availability** - System prevents merging with occupied tables
3. **Review merged items** - Preview shows exactly what will be combined
4. **Track history** - Audit trail available in Activity Log and Order Details
5. **Validate totals** - Merged orders recalculate automatically, no manual math needed
6. **Handle edge cases** - System validates against empty orders, same table, etc.

## Performance Considerations

- Table status determination is O(n) where n = number of waiting orders
- Item combination uses Map for O(1) lookups = O(n) overall
- Dialogs are conditionally rendered (not in DOM when closed)
- State updates batched by React

## Future Enhancements

1. **Table Status Dashboard**
   - Visual floor plan showing table status
   - Real-time occupied/available indicators

2. **Split Bills**
   - Option to keep separate bills when merging
   - Individual payment tracking

3. **Automatic Table Suggestions**
   - Recommend nearby available tables
   - Group seating optimization

4. **Bulk Operations**
   - Move multiple tables at once
   - Group customers by party size

5. **Historical Analysis**
   - Track table movements per session
   - Customer flow patterns
   - Average time per table

6. **Integration with Reservations**
   - Link table changes to reservations
   - Auto-release reserved tables when customers move

## Troubleshooting

### Issue: "Cannot change to occupied table" appears

**Solution**: This is by design. Use "Merge Table" instead to combine orders.

### Issue: Items appear duplicated after merge

**Solution**: This should not happen. The system combines items by product ID. If issue persists, check that product IDs match exactly.

### Issue: Merge history not showing

**Solution**: History only shows if:

- Order was merged or changed tables
- Order details dialog is opened
- Merge history array is populated

### Issue: Table change doesn't update waiting list

**Solution**: Check that:

1. Dialog close handler sets selected order to null
2. WaitingList re-renders with updated orders
3. No console errors in browser dev tools

## Testing Checklist

- [ ] Change table to available table successfully
- [ ] Prevent change to occupied table
- [ ] Prevent change to same table
- [ ] Merge two tables successfully
- [ ] Items combine correctly (sums quantities)
- [ ] Totals recalculate after merge
- [ ] Activity log records changes
- [ ] Order details show merge history
- [ ] Source table becomes available after merge
- [ ] Validation errors display correctly
- [ ] Toast notifications appear for actions
- [ ] Dialog closes on confirm
- [ ] Can perform multiple changes/merges on same order
