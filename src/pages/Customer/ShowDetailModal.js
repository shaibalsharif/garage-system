import React, { useState, useEffect } from 'react';
import { Box, Modal, Typography, Button, Card, CardContent, IconButton, Grid } from '@mui/material';
import { Download as DownloadIcon } from '@mui/icons-material';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { db } from '../../firebase';

const ShowDetailModal = ({ isOpen, handleClose, customer, cars }) => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    if (customer) {
      fetchInvoices();
    }
  }, [customer]);

  const fetchInvoices = async () => {
    if (!customer) return;

    const q = query(collection(db, 'invoices'), where('customerId', '==', customer.id));
    const querySnapshot = await getDocs(q);
    const invoiceData = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setInvoices(invoiceData);
  };

  const handleDownloadInvoice = (invoice) => {
    const doc = new jsPDF();

    // Add company details
    doc.setFontSize(20);
    doc.text('Car Mechanic Shop Invoice', 105, 20, { align: 'center' });
    doc.setFontSize(12);
    doc.text('123 Mechanic Street, City, Country', 105, 30, { align: 'center' });
    doc.text('Phone: +1 234 567 890', 105, 35, { align: 'center' });

    // Add customer details
    doc.setFontSize(14);
    doc.text('Customer Details:', 20, 50);
    doc.setFontSize(12);
    doc.text(`Name: ${customer.name}`, 20, 60);
    doc.text(`Phone: ${customer.phone}`, 20, 65);
    doc.text(`Email: ${customer.email}`, 20, 70);

    // Add car details
    const car = cars.find(c => c.id === invoice.carId);
    doc.setFontSize(14);
    doc.text('Car Details:', 20, 85);
    doc.setFontSize(12);
    if (car) {
      doc.text(`Make: ${car.make}`, 20, 95);
      doc.text(`Model: ${car.model}`, 20, 100);
      doc.text(`Registration: ${car.registrationNumber}`, 20, 105);
    }

    // Add invoice items
    if (invoice.items && Array.isArray(invoice.items) && invoice.items.length > 0) {
      doc.autoTable({
        startY: 120,
        head: [['Item', 'Quantity', 'Price', 'Total']],
        body: invoice.items.map(item => [
          item.name,
          item.quantity,
          `$${item.price.toFixed(2)}`,
          `$${(item.quantity * item.price).toFixed(2)}`
        ]),
      });
    } else {
      doc.text('No items found for this invoice', 20, 120);
    }

    // Add totals
    const finalY = (doc.lastAutoTable && doc.lastAutoTable.finalY) || 130;
    doc.text(`Subtotal: $${(invoice.subtotal || 0).toFixed(2)}`, 140, finalY + 10);
    doc.text(`Tax: $${(invoice.tax || 0).toFixed(2)}`, 140, finalY + 20);
    doc.text(`Total: $${(invoice.total || 0).toFixed(2)}`, 140, finalY + 30);

    // Save the PDF
    doc.save(`invoice_${invoice.id}.pdf`);
  };

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          maxHeight: '90vh',
          overflow: 'auto',
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
      >
        {customer ? (
          <>
            <Typography variant="h6" gutterBottom>
              Details for {customer.name}
            </Typography>
            <Typography variant="body1">Name: {customer.name}</Typography>
            <Typography variant="body1">Sex: {customer.sex}</Typography>
            <Typography variant="body1">Age: {customer.age}</Typography>
            <Typography variant="body1">Phone: {customer.phone}</Typography>
            <Typography variant="body1">Email: {customer.email}</Typography>
            <Typography variant="body1">Address: {customer.address}</Typography>
            <Typography variant="body1">Emergency Contact: {customer.emergencyContact}</Typography>
            <Typography variant="body1">Date of Birth: {new Date(customer.dob).toLocaleDateString()}</Typography>

            {/* Associated Cars */}
            <Typography variant="h6" gutterBottom mt={2}>
              Cars Associated with {customer.name}:
            </Typography>
            {cars.length > 0 ? (
              cars.map((car) => (
                <Box key={car.id} mb={2}>
                  <Typography variant="body1">Make: {car.make}</Typography>
                  <Typography variant="body1">Model: {car.model}</Typography>
                  <Typography variant="body1">Registration: {car.registrationNumber}</Typography>
                </Box>
              ))
            ) : (
              <Typography variant="body2">No cars associated with this customer.</Typography>
            )}

            {/* Invoices */}
            <Typography variant="h6" gutterBottom mt={2}>
              Invoices:
            </Typography>
            <Grid container spacing={2}>
              {invoices.length > 0 ? (
                invoices.map((invoice) => (
                  <Grid item xs={12} sm={6} md={4} key={invoice.id}>
                    <Card
                      sx={{
                        position: 'relative',
                        '&:hover .download-icon': {
                          opacity: 1
                        }
                      }}
                    >
                      <CardContent>
                        <Typography variant="body1">Invoice ID: {invoice.id}</Typography>
                        <Typography variant="body2">
                          Date: {invoice.date && invoice.date.toDate ? new Date(invoice.date.toDate()).toLocaleDateString() : 'N/A'}
                        </Typography>
                        <Typography variant="body2">
                          Car: {cars.find(c => c.id === invoice.carId)?.make || 'N/A'} - {cars.find(c => c.id === invoice.carId)?.registrationNumber || 'N/A'}
                        </Typography>
                        <IconButton
                          className="download-icon"
                          sx={{
                            position: 'absolute',
                            top: 5,
                            right: 5,
                            opacity: 0,
                            transition: 'opacity 0.3s'
                          }}
                          onClick={() => handleDownloadInvoice(invoice)}
                        >
                          <DownloadIcon />
                        </IconButton>
                      </CardContent>
                    </Card>
                  </Grid>
                ))
              ) : (
                <Grid item xs={12}>
                  <Typography variant="body2">No invoices found for this customer.</Typography>
                </Grid>
              )}
            </Grid>

            <Box mt={2}>
              <Button variant="contained" color="primary" onClick={handleClose}>
                Close
              </Button>
            </Box>
          </>
        ) : (
          <Typography variant="body1">No customer selected</Typography>
        )}
      </Box>
    </Modal>
  );
};

export default ShowDetailModal;