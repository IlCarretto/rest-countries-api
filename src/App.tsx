import React, {createContext, useState, useContext} from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import CountryDetails from './pages/CountryDetails';
import { CountryContextProvider } from './Context/CountryContext';
import Header from './components/Header';
import { Theme } from './type';
import NotFound from './pages/NotFound';

export const ThemeContext = createContext<Theme | null>(null);
export const useTheme = (): Theme => {
  const context = useContext(ThemeContext);
  if (context === null) {
    throw new Error('useTheme error');
  }
  return context;
};

function App() {

  const [currentTheme, setCurrentTheme] = useState("dark");

  const toggleTheme = () => {
    setCurrentTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  }

  return (
    <BrowserRouter>
        <CountryContextProvider>
          <ThemeContext.Provider value={{currentTheme, toggleTheme}}>
            <div className="App" id={currentTheme}>
              <Header/>
              <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/country/:name" element={<CountryDetails />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </ThemeContext.Provider>
        </CountryContextProvider>
    </BrowserRouter>
  );
}

export default App;
