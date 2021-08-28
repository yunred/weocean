import React, { useCallback, useEffect, useRef } from 'react';
import { Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import SendIcon from '@material-ui/icons/Send';
import { BasicButton } from './MaterialStyle';
import { ADD_POST_REQUEST } from '../reducers/post';
import { PostInput } from './style';
import useInput from '../hooks/useInput';

// imagePath에 업로드된 이미지 경로 저장
const PostForm = () => {
  const dispatch = useDispatch();
  const [text, onChangeText, setText] = useInput('');
  const { imagePaths, addPostLoading, addPostDone } = useSelector(
    (state) => state.post
  );

  const imageInput = useRef();
  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  useEffect(() => {
    if (addPostDone) {
      setText('');
    }
  }, [addPostDone]); // post가 정상적으로 올려졌을 때 setText

  const onSubmit = useCallback(() => {
    dispatch({
      type: ADD_POST_REQUEST,
      data: {
        text,
      },
    });
  }, []);

  return (
    <Form
      style={{ margin: '10px 0 20px' }}
      encType="multipart/form-data"
      onFinish={onSubmit}
    >
      <PostInput
        value={text}
        onChange={onChangeText}
        maxLength={140}
        placeholder="어떤 신기한 일이 있었나요?"
      />
      <div>
        <input type="file" multiple hidden ref={imageInput} />
        <BasicButton onClick={onClickImageUpload}>이미지 업로드</BasicButton>
        <BasicButton
          type="primary"
          style={{ float: 'right' }}
          htmlType="submit"
          loading={addPostLoading}
          endIcon={<SendIcon />}
        >
          업로드
        </BasicButton>
      </div>
      <div>
        {/* 이미지 업로드했을 때 이미지경로를 가지고 반복문 표시 */}
        {imagePaths.map((v) => (
          <div key={v} style={{ display: 'inline-block' }}>
            <img
              src={`http://localhost:3065/${v}`}
              style={{ width: '200px' }}
              alt={v}
            />
            <div>
              <BasicButton>제거</BasicButton>
            </div>
          </div>
        ))}
      </div>
    </Form>
  );
};

export default PostForm;
