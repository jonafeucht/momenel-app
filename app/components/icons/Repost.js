import * as React from "react";
/* Importing specific components from the "react-native-svg" library, including Svg, Defs, G, and Path,
which are used to create and render SVG (Scalable Vector Graphics) images in a React Native
application. */
//  import Svg, { Defs, G, Path } from "react-native-svg";
import Svg, { Path } from "react-native-svg";

const Repost = ({ size, color }) => {
  return (
    <Svg width={size} height={size} fill="none" viewBox="0 0 13 13">
      <Path
        fill={color}
        d="M.938 6A3.566 3.566 0 0 1 4.5 2.437h4.641l-.165-.164a.563.563 0 1 1 .797-.797l1.125 1.125a.562.562 0 0 1 0 .797L9.773 4.523a.563.563 0 1 1-.797-.797l.165-.164h-4.64A2.44 2.44 0 0 0 2.062 6 .563.563 0 1 1 .938 6Zm9.562-.563A.563.563 0 0 0 9.938 6 2.44 2.44 0 0 1 7.5 8.437H2.86l.165-.164a.563.563 0 0 0-.797-.797L1.103 8.601a.563.563 0 0 0 0 .797l1.125 1.125a.562.562 0 0 0 .919-.614.563.563 0 0 0-.122-.183l-.165-.164H7.5A3.566 3.566 0 0 0 11.063 6a.562.562 0 0 0-.563-.563Z"
      />
    </Svg>
  );
};

export default Repost;
