import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Card, CardContent, Button, Pagination } from '@mui/material';
import { collection, query, orderBy, limit, startAfter, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const PAGE_SIZE = 12;
import  COMPANY_LOGO  from '../../assets/car repair shop.jpg'; // Replace with your actual logo path

export default function InvoiceHistory() {
  const [invoices, setInvoices] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [lastVisible, setLastVisible] = useState(null);

  useEffect(() => {
    fetchInvoices();
  }, 
  [page]);

  const fetchInvoices = async () => {
    try {
      let invoicesQuery;
      if (page === 1) {
        invoicesQuery = query(collection(db, 'invoices'), orderBy('createdAt', 'desc'), limit(PAGE_SIZE));
      } else {
        invoicesQuery = query(collection(db, 'invoices'), orderBy('createdAt', 'desc'), startAfter(lastVisible), limit(PAGE_SIZE));
      }

      const invoicesSnapshot = await getDocs(invoicesQuery);
      const invoicesData = await Promise.all(invoicesSnapshot.docs.map(async doc => {
        const data = doc.data();
        const customerDoc = await getDocs(doc(db, 'customers', data.customerId));
        const carDoc = await getDocs(doc(db, 'cars', data.carId));
        return {
          id: doc.id,
          ...data,
          customerName: customerDoc.data().name,
          carMake: carDoc.data().make,
          carRegistration: carDoc.data().registrationNumber
        };
      }));
      setInvoices(invoicesData);

      if (invoicesSnapshot.docs.length > 0) {
        setLastVisible(invoicesSnapshot.docs[invoicesSnapshot.docs.length - 1]);
      }

      // Get total count for pagination
      const totalInvoicesSnapshot = await getDocs(collection(db, 'invoices'));
      setTotalPages(Math.ceil(totalInvoicesSnapshot.size / PAGE_SIZE));
    } catch (error) {
      console.error('Error fetching invoices:', error);
    }
  };

  const handleDownloadPDF = (invoice) => {
    const doc = new jsPDF();
    
    // Add company logo
    doc.addImage(COMPANY_LOGO, 'PNG', 10, 10, 40, 40);
    
    // Add company details
    doc.setFontSize(20);
    doc.text('Car Mechanic Shop', 105, 25, { align: 'center' });
    doc.setFontSize(10);
    doc.text('123 Main Street, City, Country', 105, 32, { align: 'center' });
    doc.text('Phone: +1 234 567 890 | Email: info@carmechanic.com', 105, 37, { align: 'center' });
    
    // Add invoice details
    doc.setFontSize(12);
    doc.text(`Invoice Date: ${new Date(invoice.createdAt.toDate()).toLocaleDateString()}`, 14, 60);
    doc.text(`Customer: ${invoice.customerName}`, 14, 67);
    doc.text(`Car: ${invoice.carMake} (${invoice.carRegistration})`, 14, 74);
    
    // Add parts table
    doc.autoTable({
      startY: 85,
      head: [['Part', 'Quantity', 'Unit Price', 'Total']],
      body: invoice.parts.map(part => [
        part.name,
        part.quantity,
        `$${part.sellingPrice.toFixed(2)}`,
        `$${(part.sellingPrice * part.quantity).toFixed(2)}`
      ]),
      foot: [
        ['Subtotal', '', '', `$${invoice.total.toFixed(2)}`],
        ['Labor Charges', '', '', `$${invoice.serviceCharges.labor.toFixed(2)}`],
        ['VAT', '', `${invoice.serviceCharges.vat}%`, `$${((invoice.total + invoice.serviceCharges.labor) * (invoice.serviceCharges.vat / 100)).toFixed(2)}`],
        ['Discount', '', '', `$${invoice.serviceCharges.discount.toFixed(2)}`],
        ['Total', '', '', `$${invoice.total.toFixed(2)}`]
      ],
      theme: 'striped'
    });
    
    // Add footer
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.text('Thank you for your business!', 105, 290, { align: 'center' });
      doc.text(`Page ${i} of ${pageCount}`, 105, 295, { align: 'center' });
    }
    
    // Save the PDF
    doc.save(`invoice_${invoice.id}.pdf`);
  };

  return (
    <Container maxWidth="lg" className="py-8">
      <Typography variant="h4" className="mb-6">Invoice History</Typography>
      <Grid container spacing={3}>
        {invoices.map(invoice => (
          <Grid item xs={12} sm={6} md={4} key={invoice.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">Invoice #{invoice.id.slice(0, 8)}</Typography>
                <Typography>Date: {new Date(invoice.createdAt.toDate()).toLocaleDateString()}</Typography>
                <Typography>Customer: {invoice.customerName}</Typography>
                <Typography>Car: {invoice.carMake} ({invoice.carRegistration})</Typography>
                <Typography>Total: ${invoice.total.toFixed(2)}</Typography>
                <Button onClick={() => handleDownloadPDF(invoice)} className="mt-2">
                  Download PDF
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={totalPages}
        page={page}
        onChange={(event, value) => setPage(value)}
        className="mt-4 flex justify-center"
      />
    </Container>
  );
}