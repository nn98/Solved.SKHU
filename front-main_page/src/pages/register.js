import React, { useState } from "react";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import "./register.css";
const Register = () => {
  const [userId, setUserId] = useState("");
  const [regiCode, setRegiCode] = useState("");
  const [gitId, setGitId] = useState("");

  const onClickSubmit = async (props) => {
    try {
      // 매개변수로 받은 JSON형태 데이터를 조건에 맞게 바꾸기 위해 다시 정의
      const sbody = {
        uI: props.userId,
        rC: props.regiCode,
        gI: props.gitId,
      };
      const requestOptions = {
        // 데이터 통신의 방법과 보낼 데이터의 종류, 데이터를 설정합니다.
        method: "POST", // POST는 서버로 요청을 보내서 응답을 받고, GET은 서버로부터 응답만 받습니다. PUT은 수정, DELETE는 삭제
        headers: {
          "Content-Type": "application/json",
        }, // json형태의 데이터를 서버로 보냅니다.
        body: JSON.stringify(
          // 이 body에 해당하는 데이터를 서버가 받아서 처리합니다.
          sbody
        ),
      };
      // 이 URL은 exprees의 서버이기 때문에 3000번이 되어서는 안됨 충돌가능성이 있음, 뒤 서브스트링으로 구별
      await fetch("http://localhost:3001/register", requestOptions)
        .then((res) => res.json()) // res 결과 값을 PROMISE 형태 파일로 받음
        .then((data) => {
          // .then을 한 번더 써야 사용할 수 있는 JSON 실질적인 값을 받을 수 있음
          // 여기서는 로그인 안내 문자를 팝업 메시지로 보여줄 것임
          alert(data);
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="registerPage">
      <div className="regiBox">
        <h2 style={{ margin: "0%", textAlign: "center" }}>등록하기</h2>
        <h6 style={{ margin: "5% 0%", textAlign: "center", color: "#5D5D5D" }}>
          백준 &lt;성공회대학교&gt; 그룹에 등록되지 않는 경우에 사용해주세요.
        </h6>
        {/* box 안에 있는 textfield를 사용하여 box로 겉이 둥근 모양의 상자를 만들고
            textfield에 padding 값 좌우 = 2.9, 상하 = 2 를 적용함
            그리고 searchIcon을 추가하여 왼쪽 끝에 적용 */}
        <Box
          sx={{
            backgroundColor: "#F2F2F2",
            borderRadius: 25,
            textAlign: "center",
            marginBottom: "5%",
          }}
        >
          <TextField
            variant="standard"
            id="User_ID"
            placeholder="Baekjoon ID"
            sx={{
              width: "90%",
              px: 2.9,
              py: 2,
            }}
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </Box>
        <Box
          sx={{
            backgroundColor: "#F2F2F2",
            borderRadius: 25,
            textAlign: "center",
            marginBottom: "5%",
          }}
        >
          <TextField
            variant="standard"
            id="Register_CODE"
            placeholder="REGISTER CODE"
            sx={{
              width: "90%",
              px: 2.9,
              py: 2,
            }}
            value={regiCode}
            onChange={(e) => setRegiCode(e.target.value)}
          />
        </Box>
        <Box
          sx={{
            backgroundColor: "#F2F2F2",
            borderRadius: 25,
            textAlign: "center",
            marginBottom: "5%",
          }}
        >
          <TextField
            variant="standard"
            id="Git_ID"
            placeholder="*선택사항 : Github ID"
            sx={{
              width: "90%",
              px: 2.9,
              py: 2,
            }}
            value={gitId}
            onChange={(e) => setGitId(e.target.value)}
          />
        </Box>
        <button
          className="submitButton"
          onClick={() => onClickSubmit({ userId, regiCode, gitId })}
        >
          등록
        </button>
      </div>
    </div>
  );
};

export default Register;
