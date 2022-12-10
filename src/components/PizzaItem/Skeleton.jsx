import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = (props) => (
  <ContentLoader
    className="skeleton"
    speed={1}
    width={270}
    height={500}
    viewBox="0 0 285 440"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="291" y="42" rx="0" ry="0" width="360" height="265" />
    <circle cx="140" cy="130" r="123" />
    <rect x="0" y="265" rx="5" ry="5" width="270" height="20" />
    <rect x="0" y="300" rx="5" ry="5" width="270" height="88" />
    <rect x="175" y="405" rx="10" ry="10" width="115" height="35" />
    <rect x="0" y="410" rx="10" ry="10" width="115" height="35" />
  </ContentLoader>
);

export default Skeleton;
