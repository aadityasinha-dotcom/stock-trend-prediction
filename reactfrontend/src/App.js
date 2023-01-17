import './App.css';
import React from "react";
import { useState } from "react";
import axios from "axios";
import ClosingGraph from "./components/ClosingGraph";
import styled from "styled-components";

export default function App() {

  const [value, setValue] = useState('');
  const [showDiv, setShowDiv] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [adjacentUrl, setAdjacentUrl] = useState('');
  const [dailyReturnUrl, setDailyReturnUrl] = useState('');
  const [movingUrl, setMovingUrl] = useState('');
  const [closingPriceUrl, setClosingPriceUrl] = useState('');


  const handleChange = (event) => {
    setValue(event.target.value);
  }

  const onTermSubmit = async (term) => {
    try {
      const response = await axios.get("http://localhost:8000/api/stock", {
        params: {
          ticker: term,
        },
      });
      const url = "http://localhost:8000/";
      setImageUrl(url+"media/close/"+response.data.file_name);
      setAdjacentUrl(url+"media/adj_close/"+response.data.file_name);
      setDailyReturnUrl(url+"media/daily_return/"+response.data.file_name);
      setMovingUrl(url+"media/ma/"+response.data.file_name);
      setClosingPriceUrl(url+"media/closing_price_history/"+response.data.file_name);

    } catch (error) {
      console.log(error);
    }
  };

  /* useEffect(() => {
    async function getAllStudents(){
      try {
        const students = await axios.get("http://127.0.0.1:8000/api/student")
        console.log(students.data);
        setStudents(students.data);
      } catch (error) {
        console.log(error);
      }
    }
    getAllStudents();
  }, []);*/

  
  return (
      <div className="App">
        <h1>Stock Prediction</h1>
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
        <div id="myDiv" className={showDiv ? "show" : "hide"}>
          <div className="ui grid">
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
  );
};

