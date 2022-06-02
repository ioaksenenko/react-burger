import React from 'react';
import { Routes, Route } from "react-router-dom";
import Layout from '../layout/layout';
import Constructor from '../constructor/constructor';
import withFetch from '../hocs/with-fetch';

const url = 'https://norma.nomoreparties.space/api/ingredients';
const WithFetchConstructor = withFetch(url)(Constructor);

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<WithFetchConstructor />} />
        <Route path="orders" element={<p className="text text_type_main-large mt-5 text-center">Лента заказов</p>} />
        <Route path="profile" element={<p className="text text_type_main-large mt-5 text-center">Личный кабинет</p>} />
      </Route>
    </Routes>
    </>
  );
}

export default App;
