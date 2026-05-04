# Quick Start: Table Management Features

## 🎯 What You Can Do Now

### 1. **Change a Customer's Table**

From the Waiting List, click the **purple arrow button** (🟣) on any order:

- Select new table number and color
- System confirms table is available
- Click "Confirm Change"
- Order moves to new table instantly

### 2. **Merge Multiple Tables**

From the Waiting List, click the **indigo merge button** (🔷) on any order:

- Select which table to merge into
- Preview shows combined items and total
- Click "Confirm Merge"
- Items automatically combine (no duplicates)
- Source table becomes available

### 3. **View Order History**

Click the **eye icon** (👁️) on any order in Waiting List, then look for the **"Table History"** section in the dialog:

- See all table changes and merges
- Timestamps for each action
- Helps track customer movements

## 📂 New Files Added

| File                                   | Purpose                     |
| -------------------------------------- | --------------------------- |
| `src/utils/tableManagement.ts`         | Core table management logic |
| `src/components/ChangeTableDialog.tsx` | UI for changing tables      |
| `src/components/MergeTablesDialog.tsx` | UI for merging tables       |
| `src/TABLE_MANAGEMENT_GUIDE.md`        | Detailed documentation      |
| `TABLE_MANAGEMENT_IMPLEMENTATION.md`   | Implementation details      |

## 🔧 Modified Files

| File                                    | Changes                               |
| --------------------------------------- | ------------------------------------- |
| `src/App.tsx`                           | Added state, handlers, dialogs        |
| `src/components/WaitingList.tsx`        | Added new action buttons              |
| `src/components/OrderDetailsDialog.tsx` | Added table history section           |
| `src/utils/mockData.ts`                 | Added Table interface + Order updates |

## 🚦 How Orders Work Now

### Change Table Example

```
Customer at Table 3 Red → moves to Table 7 Yellow

Before: Table 3 Red | 5 items | 50,000
After:  Table 7 Yellow | 5 items | 50,000
        (same items, different table)
```

### Merge Tables Example

```
Group 1: Table 2 Blue  | 3x Beer, 2x Snacks | 24,000
Group 2: Table 6 Green | 2x Beer, 1x Cocktail | 28,000

After merge:
Result:   Table 6 Green | 5x Beer, 2x Snacks, 1x Cocktail | 52,000
          (items combined, no duplicates)
```

## ✅ Key Features

- ✅ **Move customers** between tables without re-entering items
- ✅ **Merge groups** with automatic item combination
- ✅ **Smart validation** prevents occupied/same table mistakes
- ✅ **Full audit trail** tracks all changes with timestamps
- ✅ **Visual history** shows table movement journey
- ✅ **Error prevention** with clear validation messages
- ✅ **Responsive UI** works on all screen sizes

## 🎨 Visual Guide

### Waiting List Buttons (left to right)

```
[Edit] [Pay] [Change Table] [Merge Table] [Delete]
  🔵    🟢      🟣            🔷           🔴
```

### Dialog Color Coding

```
🔵 Blue   = Current state / Information
🟢 Green  = Success / Available
🟡 Yellow = Warning / Be careful
🔴 Red    = Error / Cannot proceed
🟣 Purple = Change action
🔷 Indigo = Merge action
```

## 🚫 Validation Rules

**Change Table** ❌ BLOCKED if:

- Target table is already occupied (use merge instead)
- Target table is the same as current table
- Order has no items

**Merge Tables** ❌ BLOCKED if:

- Source table is the same as target table
- Source table has no items
- No target table selected

**Both** ✅ REQUIRE:

- Explicit user confirmation
- Activity logged for audit

## 📱 Mobile-Friendly

- Buttons scale down on mobile
- Touch-friendly sizes
- Responsive dialogs
- All features work on phones/tablets

## 🔍 Audit Trail

All table changes recorded in:

1. **Activity Log** - Complete history of changes
2. **Order Details** - Table history timeline
3. **Each Order** - Merge history array

## ⚡ Performance

- O(n) table status check (n = orders)
- Fast item combining with Map data structure
- Dialogs lazy-loaded (not in DOM when closed)
- Batch updates by React

## 🆘 Need Help?

**Can't find the buttons?**

- Make sure you're on "Waiting List" view
- Orders must have status "waiting"

**Getting validation errors?**

- Check if target table is occupied
- Ensure you're not selecting the same table
- Verify order has items

**Want to see history?**

- Click the eye icon (👁️) on any order
- Look for "Table History" section in details dialog

## 🎯 Common Scenarios

### Scenario 1: Customer Wants to Sit Elsewhere

1. Find order in Waiting List
2. Click purple change table button
3. Select new table
4. Done! Order moved

### Scenario 2: Two Groups Join Together

1. Find first group's order
2. Click indigo merge button
3. Select second group's table
4. See preview
5. Confirm
6. Items combined, first table now available

### Scenario 3: Track Where Customer Moved

1. Click eye icon on order
2. Scroll to "Table History" section
3. See timeline of all changes
4. Know complete customer journey

## 💡 Pro Tips

- Use **Change Table** for single customers moving
- Use **Merge Table** when groups combine
- Check **Activity Log** to verify changes
- View **Order History** for complete tracking
- Use **Toast notifications** as confirmation

## 🔄 Data Preserved

When changing/merging tables:

- ✅ All items stay
- ✅ Quantities stay same
- ✅ Prices unchanged
- ✅ Original table tracked
- ✅ Change history saved
- ✅ Total recalculated (if merge)

## 📊 What's Tracked

For each table change/merge:

- ✅ From table (number + color)
- ✅ To table (number + color)
- ✅ Action type (change/merge)
- ✅ Timestamp (exact time)
- ✅ User who did it
- ✅ Order ID affected

## 🎓 Training Tip

For team:

1. Show "Change Table" feature first (simple 3-step process)
2. Then show "Merge Table" (with preview)
3. Emphasize confirmation dialogs prevent mistakes
4. Point out Activity Log for accountability
5. Show Order History for tracking

## ❓ FAQ

**Q: Will items disappear when I change tables?**
A: No! Items stay exactly the same, just the table location changes.

**Q: Can I undo a table change?**
A: You can change back to the previous table anytime.

**Q: What if I merge wrong tables?**
A: You can undo by moving items back, or create a new order for one group.

**Q: Where do I see the change history?**
A: In Order Details dialog under "Table History" section.

**Q: Can multiple people be at different tables but same bill?**
A: Yes! Use Merge to combine into one order for one table.

---

**Ready to use?** Start with a simple table change, then try a merge. The dialogs guide you through everything!
