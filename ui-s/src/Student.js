import React from "react";
import ContentCard from "./ContentCard";

function Student() {
  return (
    <div
      style={{
        backgroundColor: "greenyellow",
        height: "100vh",
      }}
    >
      <ContentCard
        title={"USER"}
        text={"내 정보 확인"}
        height={"50%"}
        width={"30%"}
        left={"30%"}
        top={"5%"}
      ></ContentCard>

      <ContentCard
        title={"USER"}
        text={"내 정보 확인"}
        height={"50%"}
        width={"30%"}
        left={"30%"}
        top={"5%"}
      ></ContentCard>
    </div>
  );
}

export default Student;
