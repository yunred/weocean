import React from 'react';
import { useSelector } from 'react-redux';

import Container from '@material-ui/core/Container';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard.js';
import AppLayout from '../components/AppLayout';

const Home = () => {
  const { isLoggedIn } = useSelector((state) => state.user);
  const { mainPosts } = useSelector((state) => state.post);

  return (
    <AppLayout>
      <Container maxWidth="xs">
        {isLoggedIn && <PostForm />} {/*로그인한 사람만 글 작성 가능*/}
        {mainPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
        {/* map을 쓰면 key를 적어줘야함(index는 안됨) */}
      </Container>
    </AppLayout>
  );
};

export default Home;
