import React from "react";
import "./ContentCard.css";

function ContentCard(props) {
  return (
    <div
      className="content_card"
      style={{
        height: props.height,
        width: props.width,
        left: props.left,
        top: props.top,
      }}
    >
      {props.title}
      <br />
      {props.text}
    </div>
  );
}

export default ContentCard;
