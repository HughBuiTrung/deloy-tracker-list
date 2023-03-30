import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css';

// context
import { AppProvider } from './context/AppContext';

ReactDOM.createRoot(document.getElementById('root')).render(
    <AppProvider>
        <App />
    </AppProvider>
)
