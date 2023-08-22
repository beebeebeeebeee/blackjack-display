import '@fontsource/poppins';
import './main.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import {App} from "./components/App.tsx";

import './util/register.service.worker'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
)
