import React from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Lauout from './components/layout/layout';
import Constructor from './components/constructor/constructor';


function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Lauout />}>
        <Route index element={<Constructor />} />
        <Route path="orders" element={<p className="text text_type_main-large mt-5 text-center">Лента заказов</p>} />
        <Route path="profile" element={<p className="text text_type_main-large mt-5 text-center">Личный кабинет</p>} />
      </Route>
    </Routes>
    </>
  );
}

export default App;
