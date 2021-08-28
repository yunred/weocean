import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import 'antd/dist/antd.css';
import { Global } from '../components/style';
import wrapper from '../store/configureStore';

// page들의 공통적인 부분
const App = ({ Component }) => (
  <>
    <Global />
    <Head>
      <meta charSet="utf-8" />
      <title>Weocean</title>
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
        rel="stylesheet"
      />
    </Head>
    <Component />
  </>
);

App.prototype = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(App);
