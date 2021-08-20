import React, { useCallback } from 'react';
import useInput from '../hooks/useInput';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { loginAction } from '../reducers/user';
import { MainButton } from './MaterialStyle';
import { Input } from './style';
import { useRouter } from 'next/router';

const LoginForm = () => {
  const [id, onChangeId] = useInput('');
  const [password, onChangePassword] = useInput('');
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const router = useRouter();

  const onSubmit = useCallback(() => {
    dispatch(
      loginAction({
        id,
        password,
      })
    );
    router.push('/');
  }, [id, password]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="user_id">아이디</label>
          <Input
            type="text"
            name="user_id"
            placeholder="아이디"
            {...register('user_id', { required: true })}
            value={id}
            onChange={onChangeId}
          />
          {errors.user_id && '아이디를 입력해주세요'}
        </div>
        <div>
          <label htmlFor="user_password">비밀번호</label>
          <Input
            type="password"
            name="user_password"
            placeholder="비밀번호"
            {...register('user_password', {
              required: '비밀번호를 입력해주세요',
              minLength: { value: 8, message: '8자 이상으로 입력해주세요' },
            })}
            value={password}
            onChange={onChangePassword}
          />
          {errors.user_password && <span>{errors.user_password.message}</span>}
        </div>
        <div>
          <MainButton type="submit">로그인</MainButton>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
