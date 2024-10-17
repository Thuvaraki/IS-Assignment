
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Auth = () => {
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();

  return (
    <div >
      {!isAuthenticated ? (
        <button className='auth-btn' onClick={loginWithRedirect}>Log In</button>
      ) : (
        <div className='auth'>
          <h2 style={{display: 'inline'}}>Welcome, {user.nickname}</h2>
          <button className='auth-btn' onClick={() => logout({ returnTo: window.location.origin })}>
            Log Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Auth;
