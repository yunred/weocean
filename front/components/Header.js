import React from 'react';
import { _Header } from './style';
import Link from 'next/link';
import { useSelector } from 'react-redux'; //react와 redux연결
//useSelector는 리덕스 스토어의 상태를 조회하는 Hook

const Header = () => {
  const { isLoggedIn } = useSelector((state) => state.user);
  return (
    <_Header>
      <div className="sub1">
        <div className="icon">
          <div>아이콘</div>
          <Link href="/">
            <a>Weocean</a>
          </Link>
        </div>
        {isLoggedIn ? (
          <div>
            <Link href="/profile">
              <a>프로필</a>
            </Link>
          </div>
        ) : (
          <div>
            <Link href="/loginsignup">
              <a>로그인</a>
            </Link>
          </div>
        )}
      </div>
      <div className="sub2">
        <form className="search" action="form_ok.php" method="POST">
          <input
            className="main_search"
            type="text"
            placeholder="input search text"
          />
          <input className="search_btn" type="submit" />
        </form>
      </div>
    </_Header>
  );
};

export default Header;
