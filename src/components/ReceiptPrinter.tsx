import { Dialog, DialogContent } from './ui/dialog';
import { DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Printer, X } from 'lucide-react';

export interface ReceiptItem {
  name: string;
  quantity: number;
  price: number;
  total: number;
}

export interface PaymentDetails {
  method: string;
  amountPaid: number;
  change: number;
}

export interface Receipt {
  id: string;
  date: Date | string;
  tableName: string;
  serverName: string;
  items: any[]; // allow flexibility
  subtotal?: number;
  tax?: number;
  discount?: number;
  total?: number;
  paymentDetails?: PaymentDetails;
}

interface ReceiptPrinterProps {
  open: boolean;
  onClose: () => void;
  type: 'pre' | 'post';
  data: Receipt;
}

export function ReceiptPrinter({ open, onClose, type, data }: ReceiptPrinterProps) {
  if (!data) return null;

  // ✅ Normalize items (CRITICAL FIX)
  const safeItems: ReceiptItem[] = Array.isArray(data.items)
    ? data.items.map((item: any) => {
        const normalizedItem = {
          name: item.name || item.title || item.productName || 'Unnamed Item',
          quantity: item.quantity ?? item.qty ?? 0,
          price: item.price ?? item.unitPrice ?? 0,
          total:
            item.total ??
            (item.quantity ?? item.qty ?? 0) *
              (item.price ?? item.unitPrice ?? 0),
        };
        // Debug log to check item data
        console.log('Normalized item:', normalizedItem);
        return normalizedItem;
      })
    : [];

  console.log('Receipt data received:', { 
    id: data.id, 
    itemsCount: data.items?.length, 
    safeItemsCount: safeItems.length,
    firstItem: safeItems[0] 
  });

  const computedSubtotal =
    data.subtotal ??
    safeItems.reduce((sum, item) => sum + item.total, 0);

  const computedTotal =
    data.total ??
    computedSubtotal - (data.discount ?? 0) + (data.tax ?? 0);

  const handlePrint = () => {
    // Create a dedicated print window with clean HTML
    const printWindow = window.open('', '_blank', 'width=300,height=600');
    
    if (!printWindow) {
      alert('Please allow pop-ups to print receipts');
      return;
    }

    const itemsHtml = safeItems.length > 0 
      ? safeItems.map(item => `
          <div class="item-row">
            <span class="item-name">${item.name}</span>
            <span style="text-align: right;">${item.quantity}</span>
            <span style="text-align: right;">${formatCurrency(item.price)}</span>
            <span style="text-align: right;">${formatCurrency(item.total)}</span>
          </div>
        `).join('')
      : '<p style="text-align: center; color: #999;">No items in order</p>';

    const paymentHtml = type === 'post' && data.paymentDetails
      ? `
        <hr />
        <p>METHOD: ${data.paymentDetails.method}</p>
        <p>PAID: ${formatCurrency(data.paymentDetails.amountPaid)}</p>
        <p>CHANGE: ${formatCurrency(data.paymentDetails.change)}</p>
      `
      : '';

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>${type === 'pre' ? 'Proforma Receipt' : 'Final Receipt'} - ${data.id}</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
        <style>
          @page {
            size: 80mm 297mm;
            margin: 0;
          }
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            width: 72mm;
            max-width: 72mm;
            padding: 4mm;
            font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            font-size: 11px;
            line-height: 1.5;
            color: #000;
            background: #fff;
          }
          h1 {
            font-size: 18px;
            font-weight: 700;
            margin: 0 0 6px 0;
            letter-spacing: 0.5px;
          }
          p {
            margin: 4px 0;
            font-size: 11px;
          }
          hr {
            border: none;
            border-top: 1px dashed #999;
            margin: 8px 0;
          }
          .status {
            text-align: center;
            font-weight: 600;
            font-size: 11px;
            border: 2px ${type === 'pre' ? 'dashed' : 'solid'} #000;
            padding: 8px;
            margin: 12px 0;
            letter-spacing: 0.5px;
          }
          .items-header {
            display: grid;
            grid-template-columns: 2fr 0.8fr 1.2fr 1.2fr;
            gap: 4px;
            font-weight: 600;
            font-size: 11px;
            margin-bottom: 6px;
          }
          .item-row {
            display: grid;
            grid-template-columns: 2fr 0.8fr 1.2fr 1.2fr;
            gap: 4px;
            margin: 6px 0;
            font-size: 11px;
          }
          .item-name {
            font-weight: 500;
          }
          .total-line {
            font-weight: 600;
            font-size: 13px;
            margin-top: 6px;
          }
        </style>
      </head>
      <body>
        <div style="text-align: center;">
          <h1>BAMPADDE TERRACES</h1>
          <p style="font-size: 11px;">Komamboga, Uganda</p>
          <p style="font-size: 11px;">Tel: 0752622957</p>
          <p style="font-size: 11px;">Tel: 0772661072</p>
          <hr />
        </div>

        <p><strong>Receipt #:</strong> ${data.id}</p>
        <p><strong>Date:</strong> ${formatDate(data.date)}</p>
        <hr />

        <p style="font-weight: 600;"><strong>TABLE:</strong> ${data.tableName}</p>
        <p style="font-weight: 600;"><strong>SERVER:</strong> ${data.serverName}</p>
        <hr />

        <div class="status">
          ${type === 'pre' ? '*** PENDING PAYMENT - PROFORMA ***' : '*** PAID ***'}
        </div>

        <div class="items-header">
          <span>ITEM</span>
          <span style="text-align: right;">QTY</span>
          <span style="text-align: right;">PRICE</span>
          <span style="text-align: right;">TOTAL</span>
        </div>
        <hr style="margin: 4px 0;" />
        ${itemsHtml}

        <hr style="margin-top: 8px;" />
        <p style="font-size: 12px;">SUBTOTAL: ${formatCurrency(computedSubtotal)}</p>
        ${data.tax ? `<p style="font-size: 12px;">TAX: ${formatCurrency(data.tax)}</p>` : ''}
        ${data.discount ? `<p style="font-size: 12px;">DISCOUNT: -${formatCurrency(data.discount)}</p>` : ''}
        <hr />
        <p class="total-line"><strong>TOTAL: ${formatCurrency(computedTotal)}</strong></p>

        ${paymentHtml}

        <hr />
        <p style="text-align: center; font-weight: 600;">Thank you for your visit!</p>
        <p style="text-align: center; font-weight: 500;">Please come again</p>
        ${type === 'pre' ? '<p style="text-align: center; font-size: 9px; font-style: italic; margin-top: 8px;">* This is not a valid receipt for payment</p>' : ''}

        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
              window.onafterprint = function() {
                window.close();
              };
            }, 250);
          };
        </script>
      </body>
      </html>
    `;

    printWindow.document.write(html);
    printWindow.document.close();
  };

  const formatCurrency = (amount: number) => `UGX ${amount.toLocaleString()}`;

  const formatDate = (date: Date | string) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-UG', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-auto">
        <DialogTitle className="sr-only">
          {type === 'pre' ? 'Proforma Receipt Preview' : 'Final Receipt Preview'}
        </DialogTitle>

        <DialogDescription className="sr-only">
          Preview receipt
        </DialogDescription>

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">
            {type === 'pre' ? 'Proforma Receipt' : 'Final Receipt'}
          </h2>

          <div className="flex gap-2">
            <Button onClick={handlePrint}>
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button onClick={onClose} variant="ghost" size="sm">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Receipt */}
        <div className="bg-white border p-4">
          <div id="receipt-content" className="receipt-preview" style={{ fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>

            {/* HEADER */}
            <div style={{ textAlign: 'center', marginBottom: '12px' }}>
              <h1 style={{ fontSize: '20px', fontWeight: '700', margin: '0 0 8px 0', letterSpacing: '0.5px' }}>BAMPADDE TERRACES</h1>
              <p style={{ fontSize: '12px', margin: '4px 0' }}>Komamboga, Uganda</p>
              <p style={{ fontSize: '12px', margin: '4px 0' }}>Tel: 0752622957</p>
              <p style={{ fontSize: '12px', margin: '4px 0' }}>Tel: 0772661072</p>
              <hr style={{ borderTop: '1px dashed #999', margin: '10px 0' }} />
            </div>

            {/* INFO */}
            <p style={{ fontSize: '12px', margin: '5px 0' }}><strong>Receipt #:</strong> {data.id}</p>
            <p style={{ fontSize: '12px', margin: '5px 0' }}><strong>Date:</strong> {formatDate(data.date)}</p>
            <hr style={{ borderTop: '1px dashed #999', margin: '10px 0' }} />

            <p style={{ fontSize: '12px', margin: '5px 0', fontWeight: '600' }}><strong>TABLE:</strong> {data.tableName}</p>
            <p style={{ fontSize: '12px', margin: '5px 0', fontWeight: '600' }}><strong>SERVER:</strong> {data.serverName}</p>
            <hr style={{ borderTop: '1px dashed #999', margin: '10px 0' }} />

            {/* STATUS */}
            <div style={{ 
              textAlign: 'center', 
              fontWeight: '600', 
              fontSize: '12px',
              border: type === 'pre' ? '2px dashed #000' : '2px solid #000',
              padding: '10px',
              margin: '15px 0',
              letterSpacing: '0.5px'
            }}>
              {type === 'pre' ? '*** PENDING PAYMENT - PROFORMA ***' : '*** PAID ***'}
            </div>

            {/* ITEMS */}
            <div>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '2fr 0.8fr 1.2fr 1.2fr',
                gap: '4px',
                fontWeight: '600',
                fontSize: '12px',
                marginBottom: '8px'
              }}>
                <span>ITEM</span>
                <span style={{ textAlign: 'right' }}>QTY</span>
                <span style={{ textAlign: 'right' }}>PRICE</span>
                <span style={{ textAlign: 'right' }}>TOTAL</span>
              </div>
              <hr style={{ borderTop: '1px dashed #999', margin: '6px 0' }} />

              {safeItems.length > 0 ? (
                safeItems.map((item, i) => (
                  <div key={i} style={{ 
                    display: 'grid', 
                    gridTemplateColumns: '2fr 0.8fr 1.2fr 1.2fr',
                    gap: '4px',
                    margin: '8px 0',
                    fontSize: '12px'
                  }}>
                    <span style={{ fontWeight: '500' }}>{item.name}</span>
                    <span style={{ textAlign: 'right' }}>{item.quantity}</span>
                    <span style={{ textAlign: 'right' }}>{formatCurrency(item.price)}</span>
                    <span style={{ textAlign: 'right' }}>{formatCurrency(item.total)}</span>
                  </div>
                ))
              ) : (
                <p style={{ textAlign: 'center', color: '#999', margin: '10px 0' }}>
                  No items in order
                </p>
              )}
            </div>

            {/* SUMMARY */}
            <hr style={{ borderTop: '1px dashed #999', margin: '10px 0' }} />
            <p style={{ fontSize: '13px', margin: '6px 0' }}>SUBTOTAL: {formatCurrency(computedSubtotal)}</p>

            {data.tax ? <p style={{ fontSize: '13px', margin: '6px 0' }}>TAX: {formatCurrency(data.tax)}</p> : null}
            {data.discount ? <p style={{ fontSize: '13px', margin: '6px 0' }}>DISCOUNT: -{formatCurrency(data.discount)}</p> : null}

            <hr style={{ borderTop: '2px solid #000', margin: '10px 0' }} />
            <p style={{ fontWeight: '600', fontSize: '15px', margin: '8px 0' }}><strong>TOTAL: {formatCurrency(computedTotal)}</strong></p>

            {/* PAYMENT */}
            {type === 'post' && data.paymentDetails && (
              <>
                <hr style={{ borderTop: '2px solid #000', margin: '10px 0' }} />
                <p style={{ fontSize: '12px', margin: '5px 0' }}>METHOD: {data.paymentDetails.method}</p>
                <p style={{ fontSize: '12px', margin: '5px 0' }}>PAID: {formatCurrency(data.paymentDetails.amountPaid)}</p>
                <p style={{ fontSize: '12px', margin: '5px 0' }}>CHANGE: {formatCurrency(data.paymentDetails.change)}</p>
              </>
            )}

            {/* FOOTER */}
            <hr style={{ borderTop: '1px dashed #999', margin: '10px 0' }} />
            <p style={{ textAlign: 'center', fontWeight: '600', fontSize: '12px', margin: '6px 0' }}>Thank you for your visit!</p>
            <p style={{ textAlign: 'center', fontWeight: '500', fontSize: '12px', margin: '6px 0' }}>Please come again</p>
            {type === 'pre' && (
              <p style={{ textAlign: 'center', fontSize: '10px', fontStyle: 'italic', marginTop: '10px', color: '#666' }}>
                * This is not a valid receipt for payment
              </p>
            )}

          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}