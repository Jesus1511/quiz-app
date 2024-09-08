import React from 'react';
import Svg, { Path } from 'react-native-svg';

export const Plus = ({ color, size}) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
    >
      <Path
        d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"
        fill={color}
      />
    </Svg>
  );
};

