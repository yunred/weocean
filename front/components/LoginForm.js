import React, { useCallback } from 'react';
import useInput from '../hooks/useInput';
import { useForm } from 'react-hook-form';
import { loginRequestAction } from '../reducers/user';
import { MainButton } from './MaterialStyle';
import { Input } from './style';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

const LoginForm = () => {
  const dispatch = useDispatch();
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const { logInLoading } = useSelector((state) => state.user);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const onSubmit = useCallback(() => {
    dispatch(
      loginRequestAction({
        email,
        password,
      })
    );
    router.push('/');
  }, [email, password]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="user_email">이메일</label>
          <Input
            type="email"
            name="user_email"
            placeholder="이메일"
            {...register('user_email', { required: true })}
            value={email}
            onChange={onChangeEmail}
          />
          {errors.user_email && '이메일을 입력해주세요'}
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
          <MainButton type="submit" loading={logInLoading}>
            로그인
          </MainButton>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
