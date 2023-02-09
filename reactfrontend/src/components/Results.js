import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import img1 from "../media/adj_close/TSLA.png";
import img2 from "../media/ma/TSLA.png";

const Results = (props) => {
  const [predictionData, setPredictionData] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    navigate("/home");
  };

  const fetchData = async (term) => {
    try {
      const response = await axios.get("https://stock-trend-prediction-backend-production.up.railway.app/api/stock", {
        params: {
          ticker: term,
        },
      });
      const url = "https://stock-trend-prediction-backend-production.up.railway.app/";
      setImageUrl(url+"media/close/"+response.data.file_name);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Fetch the prediction data for the given stock name
    // Example: const predictionData = await fetch(`https://api.example.com/stock/${props.stockName}/prediction`);
    // setPredictionData(predictionData);
  }, []);

  const url = "https://stock-trend-prediction-backend-production.up.railway.app/";

  return (
    <div className="ui container">
      <div className="ui segment">
        <div className="ui small header">
          <h1>{props.stockName} Prediction Results</h1>
        </div>
      </div>
      <div className="ui internally celled grid">
        <div className="row">
          <div className="column">
            <img src={url+"media/close/TSLA.png"} />
          </div>
        </div>
        <div className="row">
          <div className="column">
            <img src={url+"media/adj_close/TSLA.png"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;

