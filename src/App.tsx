import React, { useState } from 'react';
import './styles.css'; // Link your CSS file if needed

const App = () => {
  const [amount, setAmount] = useState<number | undefined>();
  const [gstRate, setGstRate] = useState<number | undefined>();
  const [gstType, setGstType] = useState<'inclusive' | 'exclusive'>('exclusive');
  const [totalAmount, setTotalAmount] = useState<number | null>(null);

  const calculateGST = () => {
    if (amount && gstRate) {
      let gst: number;
      let total: number;

      if (gstType === 'exclusive') {
        // GST Exclusive: Add GST on top of the base amount
        gst = (amount * gstRate) / 100;
        total = amount + gst;
      } else {
        // GST Inclusive: The given amount already includes GST
        gst = (amount * gstRate) / (100 + gstRate);
        total = amount; // Total remains the input amount for inclusive GST
      }

      setTotalAmount(total); // Setting the total amount
    }
  };

  return (
    <div className="app">
      <h1>GST Calculator</h1>

      {/* GST Calculator Section */}
      <div className="calculator">
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

        <select value={gstType} onChange={(e) => setGstType(e.target.value as 'inclusive' | 'exclusive')}>
          <option value="exclusive">Exclusive of GST</option>
          <option value="inclusive">Inclusive of GST</option>
        </select>

        <button onClick={calculateGST}>Calculate GST</button>

        {totalAmount !== null && (
          <h2>Total Amount {gstType === 'exclusive' ? '(with GST)' : '(already inclusive of GST)'}: {totalAmount.toFixed(2)}</h2>
        )}
      </div>

      {/* Instructions Section */}
      <div className="instructions">
        <h2>How Can You Calculate GST with This Tool?</h2>
        <ul>
          <li>Enter the price of the goods or services in the <strong>Amount</strong> field.</li>
          <li>Enter the percentage of GST, or the slab that the product comes under, in the <strong>GST %</strong> field.</li>
          <li>Choose if the price that you entered is <strong>inclusive</strong> or <strong>exclusive</strong> of tax in the <strong>Tax</strong> field.</li>
          <li>If the price you've entered is inclusive of tax, the tool automatically calculates and displays the original price of the goods or service after subtracting the GST.</li>
          <li>If the price you've entered is exclusive of tax, the tool automatically calculates and displays the gross price after adding the GST.</li>
        </ul>
      </div>

      {/* Types of GST Boxes */}
      <div className="gst-types">
        <h2>Types of GST in India</h2>
        <div className="gst-box-container">
          <div className="gst-box">
            <h3>CGST</h3>
            <p>Central Goods and Services Tax, collected by the central government.</p>
          </div>
          <div className="gst-box">
            <h3>SGST</h3>
            <p>State Goods and Services Tax, collected by the state government.</p>
          </div>
          <div className="gst-box">
            <h3>IGST</h3>
            <p>Integrated Goods and Services Tax, collected on inter-state transactions.</p>
          </div>
          <div className="gst-box">
            <h3>UTGST</h3>
            <p>Union Territory Goods and Services Tax, applicable in Union Territories.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
