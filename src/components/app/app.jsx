import React from 'react';
import { Routes, Route } from "react-router-dom";
import Layout from '../layout/layout';
import Constructor from '../constructor/constructor';
import withFetch from '../hocs/with-fetch';
import { ingredientsUrl } from '../../utils/data';
import Modal from '../modal/modal';

const WithFetchConstructor = withFetch(ingredientsUrl)(Constructor);

const App = () => (
  <>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<WithFetchConstructor />} />
        <Route path="orders" element={<p className="text text_type_main-large">Лента заказов</p>} />
        <Route path="profile" element={<p className="text text_type_main-large">Личный кабинет</p>} />
      </Route>
    </Routes>
    <Modal />
  </>
);

export default App;
