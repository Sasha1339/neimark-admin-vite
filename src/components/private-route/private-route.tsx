import { Navigate, Outlet, useLocation } from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "@/services/store.ts";
import {userActions, userSelectors} from "@/services/user.ts";
import {useEffect} from "react";

export const PrivateRoute = () => {
  const user = useAppSelector(userSelectors.user);
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    if (!user) {
      dispatch(userActions.rememberNewRoute(location.pathname + location.search));
    }
  }, [user, location, dispatch]);

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return <Outlet />;
};
