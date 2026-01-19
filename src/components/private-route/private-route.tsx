import { Navigate, Outlet, useLocation } from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "@/services/store.ts";
import {userActions, userSelectors} from "@/services/user.ts";

export const PrivateRoute = () => {
  const user = useAppSelector(userSelectors.user);
  const dispatch = useAppDispatch();
  const location = useLocation();

  if (!(user)) {
    dispatch(userActions.rememberNewRoute(location.pathname + location.search));

    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return <Outlet />;
};
