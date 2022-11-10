import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { DropdownMenuContextProvider } from './context/DropdownMenuContext';
import { LikedMealsContextProvider } from './context/LikedMealsContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <DropdownMenuContextProvider>
      <LikedMealsContextProvider>
        <App />
      </LikedMealsContextProvider>
    </DropdownMenuContextProvider>
  </BrowserRouter>
);
