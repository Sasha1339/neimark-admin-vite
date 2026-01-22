import {Navigate, Route, Routes} from "react-router-dom";
import {SigninPage} from "@/pages/signin-page/signin-page.tsx";
import {PrivateRoute} from "@/components/private-route/private-route.tsx";
import {AppHeader} from "@/components/shared/app-header/app-header.tsx";
import {PublicationsPage} from "@/pages/publications-page/publications-page.tsx";
import {CreatePublication} from "@/components/publications/create-publication/create-publication.tsx";
import {EditPublication} from "@/components/publications/edit-publication/edit-publication.tsx";
import {StudentsPage} from "@/pages/students-page/students-page.tsx";
import {CreateStudent} from "@/components/students/create-student/create-student.tsx";
import {EditStudent} from "@/components/students/edit-student/edit-student.tsx";
import {DocumentsPage} from "@/pages/documents-page/documents-page.tsx";
import {ServicesPage} from "@/pages/services-page/services-page.tsx";
import {Cleaning} from "@/components/services/cleaning/cleaning.tsx";
import {Chat} from "@/components/chat/chat.tsx";
import {DryCleaner} from "@/components/services/dry-cleaner/dry-cleaner.tsx";
import {Linen} from "@/components/services/linen/linen.tsx";
import {Laundry} from "@/components/services/laundry/laundry.tsx";
import {Master} from "@/components/services/master/master.tsx";
import App from "@/App.tsx";
import {DocumentsViewer} from "@/components/documents/documents-viewer/documents-viewer.tsx";

export const RouterModel = () => {
  return (
    <Routes>

      <Route path="/" element={<App />}>

        <Route
          index={true}
          element={
            <Navigate
              to="/publications"
              replace
            />
          }
        />

        <Route path="login" element={<SigninPage/>}/>
        <Route element={<PrivateRoute/>}>

          <Route element={<AppHeader/>}>
            <Route path="publications" element={<PublicationsPage/>}>
              <Route path="new" element={<CreatePublication/>}/>
              <Route path=":id" element={<EditPublication/>}/>
            </Route>
            <Route path="students" element={<StudentsPage/>}>
              <Route path="new" element={<CreateStudent/>}/>
              <Route path=":id" element={<EditStudent/>}/>
            </Route>
            <Route path="documents" element={<DocumentsPage/>}>
              <Route path=":id" element={<DocumentsViewer/>}/>
            </Route>
            <Route path="services" element={<ServicesPage/>}>
              <Route path="cleaning" element={<Cleaning/>}>
                <Route path=":id" element={<Chat/>}/>
              </Route>
              <Route path="dry-cleaner" element={<DryCleaner/>}>
                <Route path=":id" element={<Chat/>}/>
              </Route>
              <Route path="linen" element={<Linen/>}>
                <Route path=":id" element={<Chat/>}/>
              </Route>
              <Route path="laundry" element={<Laundry/>}>
                <Route path=":id" element={<Chat/>}/>
              </Route>
              <Route path="master" element={<Master/>}>
                <Route path=":id" element={<Chat/>}/>
              </Route>
            </Route>
          </Route>

        </Route>
      </Route>
    </Routes>
  )
}