import React, { useRef, useCallback, useState, useEffect } from 'react';
import { Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { BasicButton } from './MaterialStyle';
import { addPost } from '../reducers/post';
import { PostInput } from './style';
import SendIcon from '@material-ui/icons/Send';

//imagePath에 업로드된 이미지 경로 저장
const PostForm = () => {
  const { imagePaths, postAdded } = useSelector((state) => state.post);
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const imageInput = useRef();

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]); //current를 통해서 input에 접근

  useEffect(() => {
    if (postAdded) {
      setText('');
    }
  }, [postAdded]);

  const onChangeText = useCallback((e) => {
    setText(e.target.value);
  }, []);

  const onSubmit = useCallback(() => {
    dispatch(addPost);
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
          endIcon={<SendIcon />}
        >
          업로드
        </BasicButton>
      </div>
      <div>
        {/* 이미지 업로드했을 때 이미지경로를 가지고 반복문 표시 */}
        {imagePaths.map((v) => {
          return (
            <div key={v} style={{ display: 'inline-block' }}>
              <img
                src={'http://localhost:3065/' + v}
                style={{ width: '200px' }}
                alt={v}
              />
              <div>
                <BasicButton>제거</BasicButton>
              </div>
            </div>
          );
        })}
      </div>
    </Form>
  );
};

export default PostForm;
