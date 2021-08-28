import React, { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import CheckBox from '@material-ui/core/CheckBox';
import { FormControlLabel } from '@material-ui/core';
import { Input } from './style';
import { MainButton } from './MaterialStyle';
import { SIGN_UP_REQUEST } from '../reducers/user';

// import AppLayout from './AppLayout';
import useInput from '../hooks/useInput';

const Signup = () => {
  const [passwordCheck, setPasswordCheck] = useState('');
  const [term, setTerm] = useState(false);
  const [passwordError, setPasswordError] = useState(false); // true일 때 에러표시
  const [termError, setTermError] = useState(false);

  const [email, onChangeEmail] = useInput('');
  const [nick, onChangeNick] = useInput('');
  const [password, onChangePassword] = useInput('');
  const dispatch = useDispatch();
  const { singUpLoading } = useSelector((state) => state.user);
  const { me } = useSelector((state) => state.user);
  const router = useRouter();

  // 나중에 다시 체크

  useEffect(() => {
    if (me) {
      alert('로그인했으니 메인페이지로 이동합니다.');
      router.push('/');
    }
  }, [me && me.id]);

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordError(e.target.value !== password); // password와 password check랑 다른지
      setPasswordCheck(e.target.value);
    },
    [password]
  );

  const onChangeTerm = useCallback((e) => {
    setTermError(!e.target.checked); // error은 check상태와 반대
    setTerm(e.target.checked); // term의 체크상태 boolean
  }, []);

  // 여기서부터 시작
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    if (!term) {
      return setTermError(true);
    }
    dispatch({
      type: SIGN_UP_REQUEST,
      data: {
        email,
        password,
        nick,
      },
    });
    router.push('/');
  }, [password, passwordCheck, term]);

  return (
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
        {errors.user_email && '이메일를 입력해주세요'}
      </div>
      <div>
        <label htmlFor="user_nick">닉네임</label>
        <Input
          type="text"
          name="user_nick"
          placeholder="닉네임"
          {...register('user_nick', { required: true, maxLength: 10 })}
          value={nick}
          onChange={onChangeNick}
        />
        {errors.user_nick && errors.user_nick.type === 'required' && (
          <span>닉네임을 입력해주세요</span>
        )}
        {errors.user_nick && errors.user_nick.type === 'maxLength' && (
          <span>닉네임을 10자 이내로 입력해주세요</span>
        )}
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
        <label htmlFor="user_password_check">비밀번호체크</label>
        <Input
          type="password"
          name="user_password_check"
          placeholder="비밀번호 체크"
          {...register('user_password_check', { required: true })}
          value={passwordCheck}
          onChange={onChangePasswordCheck}
        />
        {passwordError && (
          <div style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</div>
        )}
      </div>
      <div>
        <FormControlLabel
          control={<CheckBox checked={term} onChange={onChangeTerm} />}
          label="약관에 동의하십니까?"
        />
        {termError && (
          <div style={{ color: 'red' }}>약관에 동의하셔야 합니다.</div>
        )}
      </div>
      <div>
        <MainButton type="submit" loading={singUpLoading}>
          회원가입
        </MainButton>
      </div>
    </form>
  );
};

export default Signup;
