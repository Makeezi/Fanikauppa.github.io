import React, {useState} from 'react';
import './App.css';
import Carousel from './components/Carousel'
import Nav from './components/Nav'
import Blank from './components/Blank'
import Products from './components/Products'

function App() {
  
  const products = [
    {
      text: "eka",
      link: "https://www.publicdomainpictures.net/pictures/30000/velka/plain-white-background.jpg",
      id: 1,
      amount: 0,
      price: 20
    },
    {
      text: "toka", 
      link: "https://www.publicdomainpictures.net/pictures/200000/velka/plain-red-background.jpg",
      id: 2,
      amount: 0,
      price: 10
    },
    {
      text: "kolmas", 
      link: "https://www.publicdomainpictures.net/pictures/200000/velka/plain-blue-background.jpg",
      id: 3,
      amount: 0,
      price: 50
    }
  ]

  const [orders, setOrders] = useState([]);
 
  const texts = {
    text1: 'Kaikki kauppa tavarat',
    text2: '',
    text3: '',
    text4: '',
  }
 
  const dataGo = {
    products: products,
    orders: orders,
    setOrders: setOrders,
  }
  
  return (
    <div className="App">

      <Nav shopData = {dataGo}/>
      <section className="App-section">
        <Carousel carouselData = {dataGo} />
        <Blank texts = {texts} />
        <Products products = {products}/>
      </section >
      <footer className="App-footer">
      
      </footer>
      

    </div>
  );
}

export default App;
