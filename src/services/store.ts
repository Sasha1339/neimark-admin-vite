import {configureStore} from "@reduxjs/toolkit";
import {userReducer} from "@/services/user.ts";
import {type TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {authApi} from "@/middlewares/auth.ts";
import {userApi} from "@/middlewares/user.ts";
import {publicationApi} from "@/middlewares/publication.ts";
import {publicationReducer} from "@/services/publication.ts";
import {imageApi} from "@/middlewares/image.ts";
import {studentApi} from "@/middlewares/student.ts";
import {studentReducer} from "@/services/student.ts";
import {documentApi} from "@/middlewares/document.ts";
import {documentReducer} from "@/services/document.ts";
import {serviceReducer} from "@/services/service.ts";
import {serviceApi} from "@/middlewares/service.ts";

export function createAppStore(preloadedState = {}) {
  return configureStore({
    reducer: {
      user: userReducer,
      publication: publicationReducer,
      student: studentReducer,
      document: documentReducer,
      service: serviceReducer,
      authApi: authApi.reducer,
      userApi: userApi.reducer,
      publicationApi: publicationApi.reducer,
      imageApi: imageApi.reducer,
      studentApi: studentApi.reducer,
      documentApi: documentApi.reducer,
      serviceApi: serviceApi.reducer,
    },
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(authApi.middleware)
        .concat(userApi.middleware)
        .concat(publicationApi.middleware)
        .concat(imageApi.middleware)
        .concat(studentApi.middleware)
        .concat(documentApi.middleware)
        .concat(serviceApi.middleware)
  })
}

export const store = createAppStore();

export type AllStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AllStateType> = useSelector;