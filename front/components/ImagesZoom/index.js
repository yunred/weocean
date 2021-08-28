import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Slick from 'react-slick';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { useStyles } from '../MaterialStyle';

import {
  Overlay,
  Header,
  SlickWrapper,
  ImgWrapper,
  Indicator,
  Global,
} from './imgstyles';

// material ui icon styling

const ImagesZoom = ({ images, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0); // 현재 슬라이드
  const classes = useStyles();

  return (
    <Overlay>
      <Global />
      <Header>
        <h1>상세 이미지</h1>
        <IconButton className={classes.closeIconWrapper} onClick={onClose}>
          <CloseIcon className={classes.close} fontSize="small" />
        </IconButton>
      </Header>
      <SlickWrapper>
        <div>
          <Slick
            initialSlide={0} // 0번 째 이미지부터 시작
            beforeChange={(slide, newSlide) => setCurrentSlide(newSlide)}
            infinite // 무한반복
            arrows={false} // 화살표 지움
            slidesToShow={1} // 한 번에 하나씩만 보임
            slidesToScroll={1}
          >
            {/* 중요 */}
            {images.map(v => (
              <ImgWrapper key={v.src}>
                <img src={v.src} alt={v.src} />
              </ImgWrapper>
            ))}
          </Slick>
          <Indicator>
            <div>
              {currentSlide + 1} /{images.length}
            </div>
          </Indicator>
        </div>
      </SlickWrapper>
    </Overlay>
  );
};

ImagesZoom.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string,
    })
  ).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ImagesZoom;
