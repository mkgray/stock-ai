import React, {useState, useEffect} from 'react';
import axios from 'axios';

const App = () => {

  const [stockSearchSymbol, setStockSearchSymbol] = useState([])
  const [url, setUrl] = useState([])
  const [stockData, setStockData] = useState([])

  const API_KEY = process.env.ALPHA_VANTAGE_API_KEY;

  // Update interactive search bar using Alpha Vantage API
  useEffect(() => {
     fetchStockData()
  }, [url]) // Only update on URL change

  const handleChange = (e) => {
    // Update search bar
    setStockSearchSymbol(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setUrl(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockSearchSymbol}&apikey=${API_KEY}`)
  }

  const fetchStockData = () => {
    fetch(url)
    .then(result => result.json())
    .then(data => console.log(data))
    .catch(error => console.log(error));
  }

  const searchForm = () => (
    <form onSubmit={handleSubmit}>
      <input type="text" value={stockSearchSymbol} onChange={handleChange} />
      <button>Load</button>
    </form>
  )

  // Framework of front end
  return(
    <div>
      <h2>Stock Buddy</h2>
      {searchForm()}
    </div>
  )

}

export default App;
