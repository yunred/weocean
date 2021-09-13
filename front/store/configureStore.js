import { applyMiddleware, createStore, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createWrapper } from 'next-redux-wrapper';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from '../reducers';
import rootSaga from '../sagas';

const configureStore = (context) => {
  console.log(context);
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];
  const enhancer =
    process.env.NODE_ENV === 'production'
      ? compose(applyMiddleware(...middlewares))
      : composeWithDevTools(applyMiddleware(...middlewares));
  const store = createStore(reducer, enhancer);
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === 'development',
});

export default wrapper;
// import { createWrapper } from 'next-redux-wrapper';
// import { applyMiddleware, createStore, compose } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';
// import createSagaMiddleware from 'redux-saga';

// import reducer from '../reducers';
// import rootSaga from '../sagas';

// // const loggerMiddleware =
// //   ({ dispatch, getState }) =>
// //   (next) =>
// //   (action) => {
// //     console.log(action);
// //     return next(action);
// //   };

// const configureStore = () => {
//   const sagaMiddleware = createSagaMiddleware(); //배열을 spread해서 넣어야함
//   const middlewares = [sagaMiddleware];
//   const enhancer =
//     process.env.NODE_ENV === 'production'
//       ? compose(applyMiddleware(...middlewares)) // 배포용
//       : composeWithDevTools(applyMiddleware(...middlewares)); //개발용 devtool 연결
//   const store = createStore(reducer, enhancer);
//   store.sagaTask = sagaMiddleware.run(rootSaga);
//   return store;
//   //store는 state와 reducer포함한 것
// };

// const wrapper = createWrapper(configureStore, {
//   debug: process.env.NODE_ENV === 'development',
//   //debug가 true면 redux에 대한 자세한 설명이 나옴
// });

// export default wrapper;
