import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

const TipIcon = ({ size, color }) => {
  return (
    <Svg width={size} height={size} fill="none" viewBox="0 0 23 23">
      <G clipPath="url(#a)">
        <Path
          d="M18.86 11.425c.507 0 .917-.41.917-.916V8.675a.917.917 0 0 0-.916-.916H4.194a.917.917 0 0 0-.917.916v1.834c0 .506.41.916.917.916M18.825 11.425v6.41c0 .485-.22.951-.61 1.295-.391.343-.921.536-1.474.536H6.319a2.239 2.239 0 0 1-1.474-.536c-.391-.344-.61-.81-.61-1.295v-6.41M7.401 7.759a2.292 2.292 0 1 1 0-4.584c.884-.015 1.75.414 2.487 1.232.736.817 1.306 1.985 1.638 3.352.332-1.367.902-2.535 1.638-3.352.736-.818 1.603-1.247 2.487-1.232a2.292 2.292 0 0 1 0 4.584"
          stroke={color}
          strokeWidth={1.833}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M11.565 16.936c-.198 0-.351-.053-.458-.16-.107-.115-.16-.272-.16-.47v-1.709H9.271c-.19 0-.34-.05-.447-.149-.107-.107-.16-.256-.16-.447s.053-.336.16-.436c.107-.107.256-.16.447-.16h1.674v-1.64c0-.206.054-.363.16-.47.108-.107.264-.16.47-.16.2 0 .349.053.448.16.107.107.16.264.16.47v1.64h1.674c.2 0 .348.053.448.16.107.1.16.245.16.436s-.053.34-.16.447c-.1.1-.249.15-.448.15h-1.674v1.707c0 .2-.053.356-.16.47-.1.108-.252.161-.459.161Z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="a">
          <Path
            fill="#fff"
            transform="translate(.527 .426)"
            d="M0 0h22v22H0z"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default TipIcon;
