import React from "react";

export const userPage = () => {
  const iframePart = () => {
    return {
      __html:
        '<iframe src="https://solved.ac/profile/asb0313/solved?sort=level&direction=desc&page=1" style="width:100%; height: 100vh" frameborder="0"/>',
    };
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
      }}
      dangerouslySetInnerHTML={iframePart()}
    />
  );
};

export default userPage;
