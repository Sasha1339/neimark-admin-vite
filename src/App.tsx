import './App.module.css'
import {AppHeader} from "@/components/shared/app-header/app-header.tsx";
import {Route, Routes} from "react-router-dom";
import {PublicationsPage} from "@/pages/publications-page/publications-page.tsx";
import {StudentsPage} from "@/pages/students-page/students-page.tsx";
import {DocumentsPage} from "@/pages/documents-page/documents-page.tsx";
import {ServicesPage} from "@/pages/services-page/services-page.tsx";
import {Cleaning} from "@/components/services/cleaning/cleaning.tsx";
import {Chat} from "@/components/chat/chat.tsx";
import {DryCleaner} from "@/components/services/dry-cleaner/dry-cleaner.tsx";
import {Linen} from "@/components/services/linen/linen.tsx";
import {Laundry} from "@/components/services/laundry/laundry.tsx";
import {Master} from "@/components/services/master/master.tsx";
import {CreatePublication} from "@/components/publications/create-publication/create-publication.tsx";
import {EditPublication} from "@/components/publications/edit-publication/edit-publication.tsx";

function App() {

  return (
    <AppHeader >
      <Routes>
        <Route path="/" element={<></>} />
        <Route path="publications" element={<PublicationsPage/>} >
          <Route path="new" element={<CreatePublication/>} />
          <Route path=":id" element={<EditPublication/>} />
        </Route>
        <Route path="students" element={<StudentsPage/>} />
        <Route path="documents" element={<DocumentsPage/>} />
        <Route path="services" element={<ServicesPage/>} >
          <Route path="cleaning" element={<Cleaning/>} >
            <Route path=":id" element={<Chat/>} />
          </Route>
          <Route path="dry-cleaner" element={<DryCleaner/>} >
            <Route path=":id" element={<Chat/>} />
          </Route>
          <Route path="linen" element={<Linen/>} >
            <Route path=":id" element={<Chat/>} />
          </Route>
          <Route path="laundry" element={<Laundry/>} >
            <Route path=":id" element={<Chat/>} />
          </Route>
          <Route path="master" element={<Master/>} >
            <Route path=":id" element={<Chat/>} />
          </Route>
        </Route>

      </Routes>
    </AppHeader>
  )
}

export default App
