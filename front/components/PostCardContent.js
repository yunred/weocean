import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

const PostCardContent = ({ postData }) => (
  <div>
    {postData.split(/(#[^\s#]+)/g).map((v) => {
      if (v.match(/(#[^\s]+)/)) {
        return (
          <Link
            href={{ pathname: '/hashtag', query: { tag: v.slice(1) } }} // slice(1)은 #을 뗀 것
            as={`/hashtag/${v.slice(1)}`} // as는 URL에 표시될 경로
            key={v}
          >
            <a>{v}</a>
          </Link>
        );
      }
      return v; // 해시태그가 아닌애들은 그대로 return
    })}
  </div>
);

PostCardContent.propTypes = {
  postData: PropTypes.string.isRequired,
};

export default PostCardContent;
