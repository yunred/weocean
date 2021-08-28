import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import useInput from '../hooks/useInput';
import { PostInput } from './style';
import { BasicButton } from './MaterialStyle';
import { ADD_COMMENT_REQUEST } from '../reducers/post';

const CommentForm = ({ post }) => {
  const [commentText, onChangeCommentText, setCommentText] = useInput('');
  const { addCommentDone, addCommentLoading } = useSelector(
    (state) => state.post
  );
  const id = useSelector((state) => state.user.me?.id); // 로그인 안한 경우도 대비
  const dispatch = useDispatch();

  const {
    handleSubmit,
    register,
    // formState: { error },
  } = useForm();

  useEffect(() => {
    if (addCommentDone) {
      setCommentText('');
    }
  }, [addCommentDone]);

  const onSubmit = useCallback(() => {
    dispatch({
      type: ADD_COMMENT_REQUEST,
      data: { content: commentText, userId: id, postId: post.id },
    });
  }, [commentText, id]);
  // 재사용된다면 함수로 빼는게 좋음
  // but, 컴포넌트 하나에서만 쓰인다면 동적 액션 크리에이터말고 변수를 사용해서 크리에이트해도 됨

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
      <BasicButton type="submit" loading={addCommentLoading}>
        댓글 작성
      </BasicButton>
    </form>
  );
};

export default CommentForm;
