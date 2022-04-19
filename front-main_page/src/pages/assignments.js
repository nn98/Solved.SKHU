import React from 'react'
import './assignments.css'
// import LoadingButton from "@mui/lab/LoadingButton";
import ContentCopyIcon from '@mui/icons-material/ContentCopy'

const Assignments = () => {
  const OnClickEvente = () => {
    alert('클립보드에 복사되었습니다.')
  }

  return (
    <div className="assign">
      <h1>교수님 채점 페이지</h1>
      <div className="input">
        <textarea
          placeholder=" Student ID&#13;&#10;
        Student ID&#13;&#10;
        Student ID&#13;&#10;
        Student ID&#13;&#10;
        Student ID&#13;&#10;
        Student ID&#13;&#10;
        Student ID&#13;&#10;
        .&#13;&#10;
        .&#13;&#10;
        .&#13;&#10;
        Student ID&#13;&#10;
        Student ID&#13;&#10;
        Student ID&#13;&#10;"
        ></textarea>
      </div>
      <div className="buttonList">
        <h3>문제번호</h3>
        <input type="text" placeholder="문제번호"></input>
        <h3>제출기한</h3>
        <input type="date"></input>
        {/* <LoadingButton
          size="small"
          onClick={handleClick}
          loading={loading}
          variant="outlined"
          disabled
        > */}
        {/* disabled
        </LoadingButton> */}
        <button onClick={() => OnClickEvente()}>
          <p>
            <ContentCopyIcon fontSize="small" />
            결과 복사하기
          </p>
        </button>
      </div>
    </div>
  )
}

export default Assignments
