import './App.module.css'
import {AppHeader} from "@/components/shared/app-header/app-header.tsx";
import {Route, Routes} from "react-router-dom";
import {PublicationsPage} from "@/pages/publications-page/publications-page.tsx";

function App() {

  return (
    <AppHeader >
      <Routes>
        <Route path="/" element={<></>} />
        <Route path="/publications" element={<PublicationsPage/>} />

      </Routes>
    </AppHeader>
  )
}

export default App
