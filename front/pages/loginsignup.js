import React, { useEffect } from 'react';
import Head from 'next/head';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import AppLayout from '../components/AppLayout';
import LoginForm from '../components/loginform';
import Signup from '../components/signup';
import { SubButton } from '../components/MaterialStyle';
import Container from '@material-ui/core/Container';

const LoginSignup = () => {
  const { isLoggedin } = useSelector((state) => state.user);
  //곧 사라질
  useEffect(() => {
    if (isLoggedin) {
      console.log(isLoggedin);
    }
  }, [isLoggedin]);

  const [newAccount, setNewAccount] = useState(false);
  const toggleLogin = () => setNewAccount((prev) => !prev);
  return (
    <>
      <Head>
        <title>로그인 | Weocean</title>
      </Head>
      <AppLayout>
        <Container maxWidth="xs">
          {newAccount ? <Signup /> : <LoginForm />}
          <SubButton onClick={toggleLogin}>
            {newAccount ? '로그인하기' : '회원가입하기'}
          </SubButton>
        </Container>
      </AppLayout>
    </>
  );
};

export default LoginSignup;
