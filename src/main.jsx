import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import { BrowserRouter } from "react-router";
import { Toaster } from 'react-hot-toast';
import { store } from './strore.js';
import { Provider } from 'react-redux'
import { fetchUser } from './features/user/AuthSlice';

store.dispatch(fetchUser());

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
      <Toaster/>
    </BrowserRouter>
  </StrictMode>,
)
