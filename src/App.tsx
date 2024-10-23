import React, { useState } from 'react';
import './styles.css'; // Link your CSS file if needed

const App = () => {
  const [amount, setAmount] = useState<number | undefined>();
  const [gstRate, setGstRate] = useState<number | undefined>();
  const [totalAmount, setTotalAmount] = useState<number | null>(null);

  const calculateGST = () => {
    if (amount && gstRate) {
      const gst = (amount * gstRate) / 100;
      const total = amount + gst;
      setTotalAmount(total); // Setting the total amount
    }
  };

  return (
    <div className="app">
      <h1>GST Calculator</h1>
      <input
        type="number"
        placeholder="Enter Amount"
        value={amount || ''}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <input
        type="number"
        placeholder="Enter GST Rate (%)"
        value={gstRate || ''}
        onChange={(e) => setGstRate(Number(e.target.value))}
      />
      <button onClick={calculateGST}>Calculate GST</button>
      {totalAmount !== null && <h2>Total Amount (with GST): {totalAmount}</h2>}
    </div>
  );
};

export default App;
