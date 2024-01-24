import './App.css';
import TaskCard from './components/TaskCard';
import { useState, useEffect } from 'react';

function App() {
  
const [cards, addCards] = useState([]);

  const fetchData = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var endpoint = "https://xon5mr6rjg.execute-api.us-west-1.amazonaws.com/test/analysis";

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
    };

    const response = await fetch(endpoint, requestOptions);
    if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
    }
    const result = await response.json();   

    // will not add card if no new requests were made
    if (JSON.stringify(cards[cards.length - 1]) !== JSON.stringify(result) && result["DATA"] !== null) {
      addCards((prevCard) => [...prevCard, result]); // add new card 
    } else if (result["DATA"] === null && cards.length === 0) {
      addCards([]);
    }
    return;
  }

  useEffect(() => {
    fetchData();
  }, [])


  return (
    <>
      <div className="my-1 text-center">
        <button className="btn btn-primary" onClick={fetchData}>Refresh</button>
      </div>      
      <div className="App">
        {cards.map((card, index) => {
          
          let condition = true ? index === cards.length - 1  : false;
          return (
          <TaskCard key={index} 
            field1={card["DATA"]["FIELD1"]} 
            field2={card["DATA"]["FIELD2"]} 
            field3={card["DATA"]["FIELD3"]}
            cond={condition}
            />
          );})}
      </div>
    </>

  );
}

export default App;