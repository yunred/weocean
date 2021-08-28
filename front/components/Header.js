import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux'; // react와 redux연결
import { MyHeader } from './style';
// useSelector는 리덕스 스토어의 상태를 조회하는 Hook

const Header = () => {
  const { me } = useSelector((state) => state.user);
  return (
    <MyHeader>
      <div className="sub1">
        <div className="icon">
          <div>아이콘</div>
          <Link href="/">
            <a>Weocean</a>
          </Link>
        </div>
        {me ? (
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
    </MyHeader>
  );
};

export default Header;
