import React, { useCallback, useEffect, useRef } from 'react';
import { Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import SendIcon from '@material-ui/icons/Send';
import { BasicButton } from './MaterialStyle';
import {
  ADD_POST_REQUEST,
  UPLOAD_IMAGES_REQUEST,
  REMOVE_IMAGE,
} from '../reducers/post';
import { PostInput } from './style';
import useInput from '../hooks/useInput';

// imagePath에 업로드된 이미지 경로 저장
const PostForm = () => {
  const dispatch = useDispatch();
  const [text, onChangeText, setText] = useInput('');
  const { imagePaths, addPostLoading, addPostDone } = useSelector(
    (state) => state.post
  );

  useEffect(() => {
    if (addPostDone) {
      setText('');
    }
  }, [addPostDone]); // post가 정상적으로 올려졌을 때 setText

  const onSubmit = useCallback(() => {
    if (!text || !text.trim()) {
      return alert('게시글을 작성하세요.');
    }
    const formData = new FormData();
    imagePaths.forEach((p) => {
      formData.append('image', p);
    });
    formData.append('content', text);
    return dispatch({
      type: ADD_POST_REQUEST,
      data: formData,
    });
  }, [text, imagePaths]);

  const imageInput = useRef();
  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onChangeImages = useCallback((e) => {
    console.log('images', e.target.files); //e.target.files 안에 선택한 이미지에 대한 정보 들어있음
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (f) => {
      //배열에 forEach 매서드를 빌려씀
      imageFormData.append('image', f); // key와 백엔드의 post/images router의 upload.array('image;)가 일치해야함
    });
    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFormData,
    });
  }, []);

  const onRemoveImage = useCallback(
    (index) => () => {
      dispatch({
        type: REMOVE_IMAGE,
        data: index,
      });
    },
    []
  );

  return (
    <Form
      style={{ margin: '10px 0 20px' }}
      encType="multipart/form-data" //이미지를 올리면 multipart/form-data 형식으로 올라감
      onFinish={onSubmit}
    >
      <PostInput
        value={text}
        onChange={onChangeText}
        maxLength={140}
        placeholder="어떤 신기한 일이 있었나요?"
      />
      <div>
        <input
          type="file"
          name="image"
          multiple
          hidden
          ref={imageInput}
          onChange={onChangeImages}
        />
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
        {imagePaths.map((v, i) => (
          <div key={v} style={{ display: 'inline-block' }}>
            <img
              src={`http://localhost:3065/${v}`}
              style={{ width: '200px' }}
              alt={v}
            />
            <div>
              <BasicButton onClick={onRemoveImage(i)}>제거</BasicButton>
            </div>
          </div>
        ))}
      </div>
    </Form>
  );
};

export default PostForm;
