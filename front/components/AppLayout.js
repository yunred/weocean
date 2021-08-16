import React from 'react';
import PropTypes from 'prop-types';
//import Link from 'next/link';
import Header from './header';

const AppLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <div></div>
      {children}
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
