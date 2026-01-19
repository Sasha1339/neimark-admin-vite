import './App.module.css'
import {Outlet} from "react-router-dom";
import {useGetUserMutation} from "@/middlewares/user.ts";
import {useEffect} from "react";
function App() {

  const [getUser] = useGetUserMutation();

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Outlet />
  )
}

export default App
