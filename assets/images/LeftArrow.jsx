import React from 'react';
import Svg, { Path } from 'react-native-svg';

export const LeftArrow = ({ color = 'black', size = 24 }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
  >
    <Path
      d="M14 7l-5 5 5 5V7z"
      fill={color}
    />
  </Svg>
);
