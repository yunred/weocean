import { HYDRATE } from 'next-redux-wrapper'; //redux SSR을 위해서 HYDRATE 넣음
import { combineReducers } from 'redux'; //reducer를 합쳐주는 메서드
//reducer은 함수라 합치기 쉽지 않음

import user from './user';
import post from './post';

//user의 initial state와 post의 initial state는 combineReducer가 알아서 합쳐서 넣어줌
const rootReducer = combineReducers({
  //HYDRATE를 위해(=SSR을 위해) index reducer 추가
  index: (state = {}, action) => {
    switch (action.type) {
      case HYDRATE:
        console.log('HYDRATE', action);
        return { ...state, ...action.payload };
      default:
        return state;
      //default가 없으면 state는 undefined가 됨
    }
  },
  user,
  post,
});

export default rootReducer;
