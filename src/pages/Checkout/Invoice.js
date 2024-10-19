import React from 'react';
import { Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import { jsPDF } from "jspdf";
import "jspdf-autotable";

import COMPANY_LOGO from '../../assets/car repair shop.jpg' // Replace with your actual logo path

export default function Invoice({ car, customer, parts, serviceCharges, onEdit }) {
  const calculateSubtotal = () => {
    return parts.reduce((total, part) => total + (part.sellingPrice * part.quantity), 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const laborCharges = serviceCharges.labor;
    const vatAmount = (subtotal + laborCharges) * (serviceCharges.vat / 100);
    return subtotal + laborCharges + vatAmount - serviceCharges.discount;
  };

  const handlePrintPDF = () => {
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
    doc.text(`Invoice Date: ${new Date().toLocaleDateString()}`, 14, 60);
    doc.text(`Customer: ${customer.name}`, 14, 67);
    doc.text(`Car: ${car.make} (${car.registrationNumber})`, 14, 74);
    
    // Add parts table
    doc.autoTable({
      startY: 85,
      head: [['Part', 'Quantity', 'Unit Price', 'Total']],
      body: parts.map(part => [
        part.name,
        part.quantity,
        `$${part.sellingPrice.toFixed(2)}`,
        `$${(part.sellingPrice * part.quantity).toFixed(2)}`
      ]),
      foot: [
        ['Subtotal', '', '', `$${calculateSubtotal().toFixed(2)}`],
        ['Labor Charges', '', '', `$${serviceCharges.labor.toFixed(2)}`],
        ['VAT', '', `${serviceCharges.vat}%`, `$${((calculateSubtotal() + serviceCharges.labor) * (serviceCharges.vat / 100)).toFixed(2)}`],
        ['Discount', '', '', `$${serviceCharges.discount.toFixed(2)}`],
        ['Total', '', '', `$${calculateTotal().toFixed(2)}`]
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
    doc.save('invoice.pdf');
  };

  return (
    <Paper className="p-6">
      <img src={COMPANY_LOGO} alt="Company Logo" className="w-32 mb-4" />
      <Typography variant="h5" className="mb-4">Invoice</Typography>
      <Typography><strong>Customer:</strong> {customer.name}</Typography>
      <Typography><strong>Car:</strong> {car.make} ({car.registrationNumber})</Typography>
      <Typography><strong>Date:</strong> {new Date().toLocaleDateString()}</Typography>
      
      <TableContainer className="mt-4">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Part</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Unit Price</TableCell>
              <TableCell align="right">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {parts.map((part) => (
              <TableRow key={part.id}>
                <TableCell>{part.name}</TableCell>
                <TableCell align="right">{part.quantity}</TableCell>
                <TableCell align="right">${part.sellingPrice.toFixed(2)}</TableCell>
                <TableCell align="right">${(part.sellingPrice * part.quantity).toFixed(2)}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={3}>Subtotal</TableCell>
              <TableCell align="right">${calculateSubtotal().toFixed(2)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}>Labor Charges</TableCell>
              <TableCell align="right">${serviceCharges.labor.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}>VAT ({serviceCharges.vat}%)</TableCell>
              <TableCell align="right">
                ${((calculateSubtotal() + serviceCharges.labor) * (serviceCharges.vat / 100)).toFixed(2)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}>Discount</TableCell>
              <TableCell align="right">${serviceCharges.discount.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}><strong>Total</strong></TableCell>
              <TableCell align="right"><strong>${calculateTotal().toFixed(2)}</strong></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      
      <div className="mt-6 flex justify-between">
        <Button variant="outlined" onClick={onEdit}>Edit Invoice</Button>
        <Button variant="contained" color="primary" onClick={handlePrintPDF}>Print PDF</Button>
      </div>
    </Paper>
  );
}