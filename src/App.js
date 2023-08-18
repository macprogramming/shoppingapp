import React from 'react';
import './App.css';
import Routers from './components/Routers';
const App = () => {
  return (
    <div className="App">
      <Routers />
      {/* <button type='button' onClick={ () => dispatch(fetchProducts())}></button> */}
    </div>
  );
}

export default App;
