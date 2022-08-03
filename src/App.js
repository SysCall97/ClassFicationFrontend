import { createContext, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import PrivateRoute from './components/common/PrivateRoute';
import Dashboard from './components/dashboard/Dashboard';
import Header from './components/header/Header';
import Signin from './components/signin/Signin';
import Signup from './components/signup/Signup';
import { checkToken } from './services/auth';

export const context = createContext();
function App() {
  const [loggedInUser, setLoggedInUser] = useState({
    isLoggedIn: false
  });

  useEffect(() => {
    const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));

    async function checkTokenAction() {
      const _checkToken = await checkToken();
      if(_checkToken.status === 202) {
        const user = JSON.parse(localStorage.getItem("user"));
        await setLoggedInUser({...user, isLoggedIn: true});
      }
    }
    if(isLoggedIn) checkTokenAction();
  }, []);

  return (
    <context.Provider value={{
      user: [loggedInUser, setLoggedInUser]
    }}>
      <div className="App">
        <BrowserRouter>
          <Header />
          <div style={{ paddingTop: "80px"}}>
            <Routes>
              <Route path="signin" element={<Signin />} />
              <Route path="signup" element={<Signup />} />
              <Route path='/dashboard'
                element={
                  <PrivateRoute isLoggedIn={loggedInUser.isLoggedIn}>
                    <Dashboard />
                  </PrivateRoute>
                }
                />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </context.Provider>
  );
}

export default App;
