import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Menu from './core/components/layouts/Menu';
// import SportLeagueRoutes from './core/routes/SportLeagueRoutes';
import './App.css';
import Footer from './core/components/layouts/Footer';
import { UserContext } from './core/context/AuthContext';

function App() {
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('USER')));

  return (
    <UserContext.Provider value={[user, setUser]}>
      <BrowserRouter>
        <Menu />
        {/* <SportLeagueRoutes /> */}
        <Footer />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
