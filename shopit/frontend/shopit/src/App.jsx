import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import HomePage from './components/home/HomePage';
import PageNotFound from './components/ui/PageNotFound';


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path='*' element={<PageNotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
