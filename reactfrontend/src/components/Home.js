import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [stockName, setStockName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Redirect to results page with the stock name
    navigate("/results");
  };

  return (
    <div>
      <h1>Stock Prediction Web App</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={stockName} onChange={(e) => setStockName(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Home;

