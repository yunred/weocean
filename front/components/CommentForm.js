import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import useInput from '../hooks/useInput';
import { PostInput } from './style';
import { BasicButton } from './MaterialStyle';
import { useSelector } from 'react-redux';
const CommentForm = ({ post }) => {
  const [commentText, onChangeCommentText] = useInput('');
  const id = useSelector((state) => state.user.me?.id); //로그인 안한 경우도 대비

  const {
    handleSubmit,
    register,
    formState: { error },
  } = useForm();

  const onSubmit = useCallback(() => {
    console.log(post.id, commentText);
  }, [commentText]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <PostInput
        type="text"
        name="comment"
        placeholder="댓글을 작성하세요"
        {...register('comment', { require: true })}
        value={commentText}
        onChange={onChangeCommentText}
      />
      <BasicButton type="submit">댓글 작성</BasicButton>
    </form>
  );
};

export default CommentForm;
