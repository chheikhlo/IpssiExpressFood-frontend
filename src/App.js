import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Menu from './core/components/layouts/Menu';
import IEFRoutes from './core/routes/IEF-Routes';
import './App.css';
import Footer from './core/components/layouts/Footer';
import { UserContext } from './core/context/AuthContext';

function App() {
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('USER')));

  return (
    <UserContext.Provider value={[user, setUser]}>
      <BrowserRouter>
        <Menu />
        <IEFRoutes />
        <Footer />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
