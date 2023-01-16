import './App.css';
import React from "react";
import { useState } from "react";
import axios from "axios";

export default function App() {

  const [value, setValue] = useState('');


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
      console.log(response);
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
        <h1>Hello hi</h1>
        <div className="ui input">
          <input type="text" placeholder="Enter" value={value} 
          onChange={(event) => handleChange(event)} />
        </div>
        <p>{value}</p>
        <button className="ui secondary button" 
          onClick={(value) => onTermSubmit(value)}>
          Okay
        </button>
        <div>
          <img src="http://localhost:8000/static/stock.png" 
          alt="Closing Graph"/>
        </div>
      </div>
    );
}

