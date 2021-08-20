import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import RepeatIcon from '@material-ui/icons/Repeat';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import SmsOutlinedIcon from '@material-ui/icons/SmsOutlined';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useSelector } from 'react-redux';
import { Popover } from '@material-ui/core';
import { BasicButton } from './MaterialStyle';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import PostImages from './PostImages';
import PropTypes from 'prop-types';
import CommentForm from './CommentForm';

const Carddiv = styled.div`
  margin-bottom: 20px;
`;

//배열 안에 jsx를 넣을 때는 key를 붙여줘야한다
const PostCard = ({ post }) => {
  const id = useSelector((state) => state.me?.id);

  const [anchor, setAnchor] = useState(null);
  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const [liked, setLiked] = useState(false);
  const onToggleLike = useCallback(() => {
    setLiked((prev) => !prev);
  }, []);

  const onToggleComment = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
  });

  const openPopover = (event) => {
    setAnchor(event.currentTarget);
  };
  const handleClose = () => {
    setAnchor(null);
  };
  return (
    <Carddiv key={post.id}>
      <Card>
        <CardHeader
          avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
          action={
            <>
              <IconButton aria-label="moreinfo" onClick={openPopover}>
                <MoreVertIcon />
              </IconButton>
              <Popover
                key="more"
                open={Boolean(anchor)}
                anchorEl={anchor}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
              >
                {id && post.User.id === id ? (
                  <>
                    <BasicButton>수정</BasicButton>
                    <BasicButton>삭제</BasicButton>
                  </>
                ) : (
                  <BasicButton>신고</BasicButton>
                )}
              </Popover>
            </>
          }
          title={post.User.nickname}
          subheader="2021.08.16"
        />
        <div>{post.Images[0] && <PostImages images={post.Images} />}</div>
        <CardContent>
          <span>{post.content}</span>
        </CardContent>
        <CardActions>
          <IconButton>
            <RepeatIcon />
          </IconButton>
          {liked ? (
            <IconButton key="heart" onClick={onToggleLike}>
              <FavoriteIcon />
            </IconButton>
          ) : (
            <IconButton key="heart" onClick={onToggleLike}>
              <FavoriteBorderIcon />
            </IconButton>
          )}
          <IconButton key="message" onClick={onToggleComment}>
            <SmsOutlinedIcon />
          </IconButton>
        </CardActions>
      </Card>
      {commentFormOpened && (
        <>
          <CommentForm post={post} />
          {/*댓글은 게시글에 속해있기에 게시글의 id를 받기 위해 props로 넘겨줌*/}
          <List>
            {post.Comments.map((item) => (
              <>
                <ListItem align Items="flex-start">
                  <ListItemAvatar>
                    <Avatar>{item.User.nickname[0]}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    secondary={item.User.nickname}
                    primary={item.content}
                  />
                </ListItem>
              </>
            ))}
          </List>
        </>
      )}
    </Carddiv>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    content: PropTypes.string,
    createdAt: PropTypes.object,
    Comments: PropTypes.arrayOf(PropTypes.any),
    Images: PropTypes.arrayOf(PropTypes.any),
  }),
};

export default PostCard;
