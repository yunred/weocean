import React, { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import CheckBox from '@material-ui/core/CheckBox';
import { FormControlLabel } from '@material-ui/core';
import { Input } from './style';
import { MainButton } from './MaterialStyle';
import { signUpAction } from '../reducers/user';
//import AppLayout from './AppLayout';
import useInput from '../hooks/useInput';
import { useSelector } from 'react-redux'; //react와 redux연결

const Signup = () => {
  const [passwordCheck, setPasswordCheck] = useState('');
  const [term, setTerm] = useState(false);
  const [passwordError, setPasswordError] = useState(false); //true일 때 에러표시
  const [termError, setTermError] = useState(false);

  const [id, onChangeId] = useInput('');
  const [nick, onChangeNick] = useInput('');
  const [password, onChangePassword] = useInput('');
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const router = useRouter();

  //나중에 다시 체크
  useEffect(() => {
    if (user) {
      console.log('go');
      alert('로그인했으니 메인페이지로 이동합니다.');
      router.push('/');
    }
  }, [user && user.id]);

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordError(e.target.value !== password); //password와 password check랑 다른지
      setPasswordCheck(e.target.value);
    },
    [password]
  );

  const onChangeTerm = useCallback((e) => {
    setTermError(!e.target.checked); //error은 check상태와 반대
    setTerm(e.target.checked); //term의 체크상태 boolean
  }, []);

  //여기서부터 시작
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
    dispatch(
      signUpAction({
        id,
        password,
        nick,
      })
    );
    router.push('/');
  }, [password, passwordCheck, term]);

  return (
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
        <MainButton type="submit">회원가입</MainButton>
      </div>
    </form>
  );
};

export default Signup;
