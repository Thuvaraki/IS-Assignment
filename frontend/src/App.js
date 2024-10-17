// client/src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link, useLocation } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Auth from './components/Auth';
import ReservationForm from './components/ReservationForm';
import ReservationList from './components/ReservationList';
import UserProfile from './components/UserProfile';
import './home.css';

const NavigationButtons = () => {
  const location = useLocation();

  return (
    <div className='nav-buttons'>
      {location.pathname === '/' && (
        <>
          <Link to="/add">
            <button>Add Reservation</button>
          </Link>
          <Link to="/profile">
            <button style={{backgroundColor: 'black'}}>Profile</button>
          </Link>
        </>
      )}
      {location.pathname === '/add' && (
        <>
          <Link to="/">
            <button style={{backgroundColor: 'green'}}>All Reservations</button>
          </Link>
          <Link to="/profile">
            <button style={{backgroundColor: 'black'}}>Profile</button>
          </Link>
        </>
      )}
      {location.pathname === '/profile' && (
        <>
          <Link to="/">
            <button style={{backgroundColor: 'green'}}>All Reservations</button>
          </Link>
          <Link to="/add">
            <button>Add Reservation</button>
          </Link>
        </>
      )}
    </div>
  );
};

const App = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <Router>
      <div>
        <h1 className='title'>Vehicle Service Reservation</h1>
        <Auth />
        {isAuthenticated && (
          <div className='form'>
            <NavigationButtons />
            <Switch>
              <Route path="/" component={ReservationList} exact />
              <Route path="/add" exact component={ReservationForm} />
              <Route path="/profile" component={UserProfile} />
            </Switch>
            
            
          </div>
        )}
      </div>
    </Router>
  );
};

export default App;
