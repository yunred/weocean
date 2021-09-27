import React, { useCallback } from 'react';
import { BasicButton } from './MaterialStyle';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { FOLLOW_REQUEST, UNFOLLOW_REQUEST } from '../reducers/user';

const FollowButton = ({ post }) => {
  const dispatch = useDispatch();
  const { me, followLoading, unfollowLoading } = useSelector(
    (state) => state.user
  );
  const isFollowing = me?.Followings.find((v) => v.id === post.User.id);
  //본인 팔로우 목록에 post user id 가 있는지
  const onClickButton = useCallback(() => {
    if (isFollowing) {
      dispatch({
        type: UNFOLLOW_REQUEST,
        data: post.User.id,
      });
    } else {
      dispatch({
        type: FOLLOW_REQUEST,
        data: post.User.id,
      });
    }
  }, [isFollowing]);

  if (post.User.id === me.id) {
    return null; //자기 게시물에는 follow 버튼 안뜸
  }

  return (
    <BasicButton
      loading={followLoading || unfollowLoading}
      onClick={onClickButton}
    >
      {isFollowing ? '언팔로우' : '팔로우'}
    </BasicButton>
  );
};

FollowButton.propTypes = {
  post: PropTypes.object.isRequired,
};

export default FollowButton;
