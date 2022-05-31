import React, { useEffect, useState } from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Layout from './components/layout/layout';
import Constructor from './components/constructor/constructor';
import FadeLoader from "react-spinners/FadeLoader";

function App() {
  const url = 'https://norma.nomoreparties.space/api/ingredients';
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setLoading(false);
        if (data.success) {
          setIngredients(data.data);
        } else {
          setHasError(true);
        }
      })
      .catch(e => {
        setLoading(false);
        setHasError(true);
        console.log(e.message);
      });
  }, []);

  return (
    <>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={
          loading ?
            <FadeLoader color="#F2F2F3" loading={loading} />
          : hasError ?
            <p className="text text_type_main-large mt-5 text-center">Во время загрузки данных произошла ошибка. Попробуйте обновить страницу позже.</p>
          : <Constructor ingredients={ingredients} />
        } />
        <Route path="orders" element={<p className="text text_type_main-large mt-5 text-center">Лента заказов</p>} />
        <Route path="profile" element={<p className="text text_type_main-large mt-5 text-center">Личный кабинет</p>} />
      </Route>
    </Routes>
    </>
  );
}

export default App;
