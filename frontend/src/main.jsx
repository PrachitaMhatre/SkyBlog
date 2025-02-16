import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store,persistor } from './redux/Store.js'
import { PersistGate } from 'redux-persist/lib/integration/react.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <App />

      </PersistGate>
    
    </Provider>
  </StrictMode>,
)