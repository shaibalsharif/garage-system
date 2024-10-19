import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, Button } from '@mui/material';
import { collection, getDocs, doc, getDoc, addDoc } from 'firebase/firestore';
import { db, auth } from '../../firebase';
import { toast } from 'react-toastify';
import CarSearch from './CarSearch';
import CustomerInfo from './CustomerInfo';
import PartsSelection from './PartsSelection';
import ServiceCharges from './ServiceCharges';
import Invoice from './Invoice';

export default function Checkout() {
  const [selectedCar, setSelectedCar] = useState(null);
  const [customerInfo, setCustomerInfo] = useState(null);
  const [selectedParts, setSelectedParts] = useState([]);
  const [serviceCharges, setServiceCharges] = useState({ labor: 0, vat: 0, discount: 0 });
  const [isInvoiceReady, setIsInvoiceReady] = useState(false);

  useEffect(() => {
    if (selectedCar) {
      fetchCustomerInfo(selectedCar.customerId);
    }
  }, [selectedCar]);

  const fetchCustomerInfo = async (customerId) => {
    try {
      const customerDoc = await getDoc(doc(db, 'customers', customerId));
      if (customerDoc.exists()) {
        setCustomerInfo({ id: customerDoc.id, ...customerDoc.data() });
      } else {
        toast.error('Customer information not found');
      }
    } catch (error) {
      toast.error('Error fetching customer information');
      console.error('Error fetching customer information:', error);
    }
  };

  const handleCarSelect = (car) => {
    setSelectedCar(car);
  };

  const handlePartsSelect = (parts) => {
    setSelectedParts(parts);
  };

  const handleServiceChargesUpdate = (charges) => {
    setServiceCharges(charges);
  };

  const handleConfirmInvoice = async () => {
    try {
      const invoiceData = {
        carId: selectedCar.id,
        customerId: customerInfo.id,
        parts: selectedParts,
        serviceCharges,
        total: calculateTotal(),
        createdAt: new Date(),
        createdBy: auth.currentUser ? auth.currentUser.uid : 'unknown',
      };

      const docRef = await addDoc(collection(db, 'invoices'), invoiceData);
      toast.success('Invoice saved successfully!');
      setIsInvoiceReady(true);
    } catch (error) {
      toast.error('Error saving invoice');
      console.error('Error saving invoice:', error);
    }
  };

  const calculateTotal = () => {
    const subtotal = selectedParts.reduce((total, part) => total + (part.sellingPrice * part.quantity), 0);
    const laborCharges = serviceCharges.labor;
    const vatAmount = (subtotal + laborCharges) * (serviceCharges.vat / 100);
    return subtotal + laborCharges + vatAmount - serviceCharges.discount;
  };

  const handleEditInvoice = () => {
    setIsInvoiceReady(false);
  };

  return (
    <Container maxWidth="lg" className="py-8">
      <Paper elevation={3} className="p-6">
        <Typography variant="h4" className="mb-6 text-center">Checkout</Typography>
        
        {!isInvoiceReady ? (
          <>
            <CarSearch onSelect={handleCarSelect} />
            {selectedCar && customerInfo && (
              <>
                <CustomerInfo customer={customerInfo} car={selectedCar} />
                <PartsSelection onSelect={handlePartsSelect} />
                <ServiceCharges onUpdate={handleServiceChargesUpdate} />
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={handleConfirmInvoice}
                  className="mt-4 w-full"
                  disabled={!selectedParts.length}
                >
                  Confirm and Generate Invoice
                </Button>
              </>
            )}
          </>
        ) : (
          <Invoice 
            car={selectedCar}
            customer={customerInfo}
            parts={selectedParts}
            serviceCharges={serviceCharges}
            onEdit={handleEditInvoice}
          />
        )}
      </Paper>
    </Container>
  );
}