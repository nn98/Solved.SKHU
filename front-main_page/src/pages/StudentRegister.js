import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import { TextField } from '@mui/material'
import './register.css'
import Fade from '@mui/material/Fade'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const StudentRegister = (e) => {
  const navigate = useNavigate()

  const [studentId, setStudentId] = useState('')
  const [studentName, setStudentName] = useState('')
  const [studentCode, setStudentCode] = useState('')
  const [bojId, setBojId] = useState('')
  const location = useLocation()
  const lecID = location.state[0].dataID

  const [checked, setChecked] = React.useState(false)

  const onClickSubmit = async (props) => {
    try {
      // console.log(props)
      if (props.studentId === '') return alert('학번을 입력하세요')
      else if (props.studentName === '') return alert('학생 이름을 입력하세요')
      else if (props.studentCode === '') return alert('학생 코드를 입력하세요')
      else if (props.bojId === '') return alert('백준 ID를 입력하세요')
      // 매개변수로 받은 JSON형태 데이터를 조건에 맞게 바꾸기 위해 다시 정의
      const sbody = {
        sI: props.studentId,
        sN: props.studentName,
        sC: props.studentCode,
        bI: props.bojId,
        lI: props.lecID,
      }
      const requestOptions = {
        // 데이터 통신의 방법과 보낼 데이터의 종류, 데이터를 설정합니다.
        method: 'POST', // POST는 서버로 요청을 보내서 응답을 받고, GET은 서버로부터 응답만 받습니다. PUT은 수정, DELETE는 삭제
        headers: {
          'Content-Type': 'application/json',
        }, // json형태의 데이터를 서버로 보냅니다.
        body: JSON.stringify(
          // 이 body에 해당하는 데이터를 서버가 받아서 처리합니다.
          sbody
        ),
      }
      // 이 URL은 exprees의 서버이기 때문에 3000번이 되어서는 안됨 충돌가능성이 있음, 뒤 서브스트링으로 구별
      await fetch(e.serverAddress + '/studentRegister', requestOptions)
        .then((res) => res.json()) // res 결과 값을 PROMISE 형태 파일로 받음
        .then((data) => {
          // .then을 한 번더 써야 사용할 수 있는 JSON 실질적인 값을 받을 수 있음
          // 여기서는 로그인 안내 문자를 팝업 메시지로 보여줄 것임
          if (data === '학생 승인코드가 틀렸습니다.')
            return alert('학생 승인코드가 틀렸습니다.')
          else if (data === '에러가 발생했습니다. 이미 수강중인 학생입니다.')
            return alert('에러가 발생했습니다. 이미 수강중인 학생입니다.')
          if (!alert(data)) navigate('/assignments')
        })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    setChecked(true)
  }, [])

  return (
    <div className="registerPage">
      <Fade
        in={checked}
        style={{ transformOrigin: '0 0 0' }}
        {...(checked ? { timeout: 1000 } : {})}
      >
        <div className="regiBox">
          <h2 style={{ margin: '0%', textAlign: 'center' }}>학생 등록하기</h2>
          <h6
            style={{ margin: '5% 0%', textAlign: 'center', color: '#5D5D5D' }}
          >
            {location.state[1].lectureName}
            강의에 등록합니다. 학번, 이름, Baekjoon 아이디를 입력해주세요.
          </h6>
          {/* box 안에 있는 textfield를 사용하여 box로 겉이 둥근 모양의 상자를 만들고
            textfield에 padding 값 좌우 = 2.9, 상하 = 2 를 적용함
            그리고 searchIcon을 추가하여 왼쪽 끝에 적용 */}
          <Box
            sx={{
              backgroundColor: '#F2F2F2',
              borderRadius: 25,
              textAlign: 'center',
              marginBottom: '5%',
            }}
          >
            <TextField
              variant="standard"
              id="STUDENT_ID"
              placeholder="학번"
              sx={{
                width: '90%',
                px: 2.9,
                py: 2,
              }}
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
            />
          </Box>
          <Box
            sx={{
              backgroundColor: '#F2F2F2',
              borderRadius: 25,
              textAlign: 'center',
              marginBottom: '5%',
            }}
          >
            <TextField
              variant="standard"
              id="STUDENT_NAME"
              placeholder="이름"
              sx={{
                width: '90%',
                px: 2.9,
                py: 2,
              }}
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
            />
          </Box>
          <Box
            sx={{
              backgroundColor: '#F2F2F2',
              borderRadius: 25,
              textAlign: 'center',
              marginBottom: '5%',
            }}
          >
            <TextField
              variant="standard"
              id="STUDENT_CODE"
              placeholder="*STUDENT CODE"
              sx={{
                width: '90%',
                px: 2.9,
                py: 2,
              }}
              value={studentCode}
              onChange={(e) => setStudentCode(e.target.value)}
            />
          </Box>
          <Box
            sx={{
              backgroundColor: '#F2F2F2',
              borderRadius: 25,
              textAlign: 'center',
              marginBottom: '5%',
            }}
          >
            <TextField
              variant="standard"
              id="BOJ_ID"
              placeholder="백준(Baekjoon) ID"
              sx={{
                width: '90%',
                px: 2.9,
                py: 2,
              }}
              value={bojId}
              onChange={(e) => setBojId(e.target.value)}
            />
          </Box>
          <button
            className="submitButton"
            onClick={() =>
              onClickSubmit({
                studentId,
                studentName,
                studentCode,
                bojId,
                lecID,
              })
            }
          >
            등록
          </button>
        </div>
      </Fade>
    </div>
  )
}

export default StudentRegister
