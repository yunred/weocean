import React, { useRef, useCallback, useState, useEffect } from 'react';
import { Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { BasicButton } from './MaterialStyle';

import { addPost } from '../reducers/post';

const PostForm = () => {
  const { imagePaths, postAdded } = useSelector((state) => state.post);
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const imageInput = useRef();

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

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
      <Input.TextArea
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
        >
          짹짹
        </BasicButton>
      </div>
      <div>
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
