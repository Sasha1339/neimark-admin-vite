import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter as Router} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "@/services/store.ts";
import {RouterModel} from "@/router-model/router-model.tsx";

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <Provider store={store}>
    <Router>
      <RouterModel />
    </Router>
  </Provider>
  // </StrictMode>,
)
