import {type FC, useEffect, useState} from "react";
import styles from './signin-page.module.css';
import {Controller, useForm} from "react-hook-form";
import {InputEditor} from "@/components/shared/input-editor/input-editor.tsx";
import {zodResolver} from "@hookform/resolvers/zod";
import type {SignInData} from "@/shared/user/types.ts";
import {signinScheme} from "@/entities/signin.ts";
import {Button} from "@/components/shared/button/button.tsx";
import {useAuthMutation} from "@/middlewares/auth.ts";
import {useGetUserMutation, useLogoutMutation} from "@/middlewares/user.ts";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "@/services/store.ts";
import {userSelectors} from "@/services/user.ts";

type Page = {}

export const SigninPage: FC<Page> = ({...props}) => {

  const [auth, authResult] = useAuthMutation();
  const [getUser] = useGetUserMutation();
  const [logout] = useLogoutMutation();
  const [error, setError] = useState<boolean>(false);
  const navigate = useNavigate()
  const rememberRoute = useAppSelector(userSelectors.rememberRoute);
  const user = useAppSelector(userSelectors.user);


  const {control, handleSubmit} = useForm<SignInData>({
    resolver: zodResolver(signinScheme),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  useEffect(() => {
    if (authResult.isError) {
      setError(true);
    } else if (authResult.isSuccess) {
      setError(false);
      getUser()
    }
  }, [authResult]);

  useEffect(() => {
    if (user) {
      navigate(rememberRoute ? rememberRoute : '/');
    }
  }, [user]);

  const onSubmit = (data: SignInData) => {
    setError(false);
    // logout();
    auth(data);
  }


  return (
    <main className={styles.main}>
      <form className={styles.window} onSubmit={handleSubmit(onSubmit)}>
        {/*<div>Вход</div>*/}
        <div className={styles.main_field}>
          <Controller name={'email'} control={control} render={({field, fieldState}) => (
            <InputEditor labelClassName={styles.label} wrapperClassName={styles.wrapper_input}
                         inputClassName={styles.input} mainClassName={styles.main_input} {...field} label={'Логин'}
                         error={fieldState.error?.message?.toString()}
                         placeholder={'Введите логин'}/>
          )}/>
        </div>
        <div className={styles.main_field}>
          <Controller name={'password'} control={control} render={({field, fieldState}) => (
            <InputEditor labelClassName={styles.label} wrapperClassName={styles.wrapper_input}
                         inputClassName={styles.input} mainClassName={styles.main_input} {...field} label={'Пароль'}
                         error={fieldState.error?.message?.toString()}
                         type={'password'}
                         placeholder={'Введите пароль'}/>
          )}/>
        </div>
        <div className={styles.wrapper_button}>
          <Button buttonClassName={styles.button} type={'submit'} title={'Авторизоваться'} size={'small'}
                  color={'main-purple'}/>
          { error && <div className={styles.error}>Неверный логин или пароль</div> }
        </div>

      </form>
    </main>
  )

}