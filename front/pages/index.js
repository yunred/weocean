import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { END } from 'redux-saga';
// import axios from 'axios';

import Container from '@material-ui/core/Container';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard.js';
import AppLayout from '../components/AppLayout';
import { LOAD_POSTS_REQUEST } from '../reducers/post';
import { LOAD_USER_REQUEST } from '../reducers/user';
// import wrapper from '../store/configureStore';

const Home = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector(
    (state) => state.post
  );
  //컴포넌트가 mount될 때 요청 호출
  useEffect(() => {
    dispatch({
      type: LOAD_USER_REQUEST,
    });
    dispatch({
      type: LOAD_POSTS_REQUEST,
    });
  }, []);

  useEffect(() => {
    function onScroll() {
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (hasMorePosts && !loadPostsLoading) {
          //로딩이 아닐때만 실행
          dispatch({
            type: LOAD_POSTS_REQUEST,
          });
        }
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
    //window.addEventListener 할 때 꼭 return에서 remove해줘야함 메모리에 쌓이지않게
  }, [mainPosts, hasMorePosts, loadPostsLoading]);

  return (
    <AppLayout>
      <Container maxWidth="xs">
        {me && <PostForm />} {/* 로그인한 사람만 글 작성 가능 */}
        {mainPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
        {/* map을 쓰면 key를 적어줘야함(index는 안됨) */}
      </Container>
    </AppLayout>
  );
};

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) =>
//     async ({ req }) => {
//       const cookie = req ? req.headers.cookie : '';
//       axios.defaults.headers.Cookie = '';
//       if (req && cookie) {
//         axios.defaults.headers.Cookie = cookie;
//       }
//       store.dispatch({
//         type: LOAD_MY_INFO_REQUEST,
//       });
//       store.dispatch({
//         type: LOAD_POSTS_REQUEST,
//       });
//       store.dispatch(END);
//       await store.sagaTask.toPromise();
//     }
// );

export default Home;
