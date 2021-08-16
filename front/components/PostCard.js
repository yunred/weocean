import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import RepeatIcon from '@material-ui/icons/Repeat';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import SmsOutlinedIcon from '@material-ui/icons/SmsOutlined';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useSelector } from 'react-redux';
import { Popover } from '@material-ui/core';
import { BasicButton } from './MaterialStyle';
import PostImages from './PostImages';
import PropTypes from 'prop-types';

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
        <CardMedia
          image={post.Images[0] && <PostImages image={post.Images} />}
        />
        <CardContent>
          <span>{post.content}</span>
        </CardContent>
        <CardActions disableSpacing>
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
