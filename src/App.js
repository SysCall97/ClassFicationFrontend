import { createContext, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/header/Header';
import Signin from './components/signin/Signin';
import Signup from './components/signup/Signup';

export const context = createContext();
function App() {
  const [loggedInuser, setLoggedInuser] = useState({});

  return (
    <context.Provider value={{
      user: [loggedInuser, setLoggedInuser]
    }}>
      <div className="App">
        <BrowserRouter>
          <Header />
          <div style={{ paddingTop: "80px"}}>
            <Routes>
              <Route path="signin" element={<Signin />} />
              <Route path="signup" element={<Signup />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </context.Provider>
  );
}

export default App;
