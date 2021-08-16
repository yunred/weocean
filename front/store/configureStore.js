import { createWrapper } from 'next-redux-wrapper';
import { applyMiddleware, createStore, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from '../reducers';

const configureStore = () => {
  const middlewares = []; //배열을 spread해서 넣어야함
  const enhancer =
    process.env.NODE_ENV === 'production'
      ? compose(applyMiddleware(...middlewares)) // 배포용
      : composeWithDevTools(applyMiddleware(...middlewares)); //개발용 devtool 연결
  const store = createStore(reducer, enhancer);
  return store;
  //store는 state와 reducer포함한 것
};

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === 'development',
  //debug가 true면 redux에 대한 자세한 설명이 나옴
});

export default wrapper;
