import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import configureStore from './store';
import { restoreCSRF, csrfFetch } from './store/csrf';

(async () => {
  const store = await configureStore();

  // Make the store accessible in the browser console
  window['store'] = store;

  if (import.meta.env.MODE !== 'production') {
    restoreCSRF();
  
    window.csrfFetch = csrfFetch;
    window.store = store;
  }

  // Render the application once the store is ready
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
})();
