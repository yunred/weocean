import React from 'react';
import { useSelector } from 'react-redux';

import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard.js';
import AppLayout from '../components/AppLayout';

const Home = () => {
  const { isLoggedin } = useSelector((state) => state.user);
  const { mainPosts } = useSelector((state) => state.post);

  return (
    <AppLayout>
      {isLoggedin && <PostForm />}
      {mainPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
      {/* map을 쓰면 key를 적어줘야함 */}
    </AppLayout>
  );
};

export default Home;
