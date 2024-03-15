import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import CalendarContextProvider, { CalendarContext } from './AppContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(

  <CalendarContextProvider>
    <div className="fill-window">
      <App />
    </div>
  </CalendarContextProvider>

);

