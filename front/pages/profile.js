import React, { useEffect } from 'react';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import Head from 'next/head';

import Container from '@material-ui/core/Container';
import NicknameEditForm from '../components/NicknameEditForm';
import AppLayout from '../components/AppLayout';
import FollowList from '../components/FollowList';
import UserProfile from '../components/UserProfile';
import { LOAD_FOLLOWERS_REQUEST } from '../reducers/user';
import { LOAD_FOLLOWINGS_REQUEST } from '../reducers/user';

const Profile = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch({
      type: LOAD_FOLLOWERS_REQUEST,
    });
    dispatch({
      type: LOAD_FOLLOWINGS_REQUEST,
    });
  }, []);

  useEffect(() => {
    if (!(me && me.id)) {
      Router.push('/');
    }
  }, [me && me.id]);

  if (!me) {
    return null;
  }

  return (
    <AppLayout>
      <Head>
        <title>내 프로필 | NodeBird</title>
      </Head>
      <Container maxWidth="xs">
        <UserProfile />
        <NicknameEditForm />
        <FollowList header="팔로잉 목록" data={me?.Followings} />
        <FollowList header="팔로워 목록" data={me?.Followers} />
      </Container>
    </AppLayout>
  );
};

export default Profile;
