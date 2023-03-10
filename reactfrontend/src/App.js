import './App.css';
import React from "react";
import { useState } from "react";
import axios from "axios";
import ClosingGraph from "./components/ClosingGraph";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

export default function App() {

  const navigate = useNavigate();

  const nav = () => {
    navigate("/results");
  };

  const [value, setValue] = useState('');
  const [showDiv, setShowDiv] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [adjacentUrl, setAdjacentUrl] = useState('');
  const [dailyReturnUrl, setDailyReturnUrl] = useState('');
  const [movingUrl, setMovingUrl] = useState('');
  const [closingPriceUrl, setClosingPriceUrl] = useState('');
  const [predictionUrl, setPredictionUrl] = useState('');


  const handleChange = (event) => {
    setValue(event.target.value);
  }

  const onTermSubmit = async (term) => {
    try {
      const response = await axios.get("https://stock-trend-prediction-backend-production.up.railway.app/api/stock", {
        params: {
          ticker: term,
        },
      });
      const url = "https://stock-trend-prediction-backend-production.up.railway.app/";
      setImageUrl(url+"media/close/"+response.data.file_name);
      setAdjacentUrl(url+"media/adj_close/"+response.data.file_name);
      setDailyReturnUrl(url+"media/daily_return/"+response.data.file_name);
      setMovingUrl(url+"media/ma/"+response.data.file_name);
      setClosingPriceUrl(url+"media/closing_price_history/"+response.data.file_name);
      setPredictionUrl(url+"media/prediction/"+response.data.file_name);
      console.log(url+"media/prediction/"+response.data.file_name);

    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <div className="App">
      <div className="ui raised very padded text container segment">
        <h2 className="ui center aligned icon header">Stock Prediction</h2>
        <div className="ui form">
          <div className="field">
            <div className="ui input">
              <input type="text" placeholder="Enter" value={value} 
              onChange={(event) => handleChange(event)} />
            </div>
            <button className="ui secondary button" 
              onClick={() => {onTermSubmit(value); setShowDiv(!showDiv);}}>
              Okay
            </button>
          </div>
        </div>
      </div>
      <div className="ui container">
        <div className="ui internally celled grid">
          <div id="myDiv" className={showDiv ? "show" : "hide"}>
              <h1>Prediction</h1>
              <ClosingGraph imageUrl={predictionUrl}/>
              <h1>Closing Price</h1>
              <ClosingGraph imageUrl={imageUrl}/>
              <h1>Daily Return</h1>
              <ClosingGraph imageUrl={adjacentUrl}/>
              <ClosingGraph imageUrl={dailyReturnUrl}/>
              <h1>Moving Average</h1>
              <ClosingGraph imageUrl={movingUrl}/>
              <h1>Closing Price</h1>
              <ClosingGraph imageUrl={closingPriceUrl}/>
          </div>
        </div>
      </div>
    </div>
  );
};

