import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import HomePage from './components/home/HomePage';
import PageNotFound from './components/ui/PageNotFound';
import ProductPage from './components/product/ProductPage';
import api from './api';
import CartPage from './components/cart/CartPage';


function App() {

  const [numCartItems, setNumCartItems] = useState(0);
  const cart_code = localStorage.getItem("cart_code");
  useEffect(() => {
    if (cart_code) {
      api.get(`get_cart_stats?cart_code=${cart_code}`)
      .then(response => {
        console.log(response.data);
        setNumCartItems(response.data.num_of_items);
      })
      .catch(err => {
        console.log(err.message);
      });
    };

}, []);
  api.get()

  return (
    <Router>
      <Routes>
        <Route path='/' element={<MainLayout  numCartItems={numCartItems}/>}>
          <Route index element={<HomePage />} />
          <Route path='products/:slug' element={<ProductPage setNumCartItems={setNumCartItems}/>} />
          <Route path='cart/' element={<CartPage />} />

          <Route path='*' element={<PageNotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
