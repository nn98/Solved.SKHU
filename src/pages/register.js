import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import { TextField } from '@mui/material'
import './register.css'
import Fade from '@mui/material/Fade'
import { useNavigate } from 'react-router-dom'

const Register = (e) => {
  const [userId, setUserId] = useState('')
  const [regiCode, setRegiCode] = useState('')
  const [gitId, setGitId] = useState('')

  const [checked, setChecked] = React.useState(false)
  const navigate = useNavigate()
  const onClickSubmit = async (props) => {
    try {
      // console.log(props)
      if (props.userId === '') return alert('백준 ID를 입력하세요')
      else if (props.regiCode === '') return alert('REGISTER CODE를 입력하세요')
      // 매개변수로 받은 JSON형태 데이터를 조건에 맞게 바꾸기 위해 다시 정의
      const sbody = {
        uI: props.userId,
        rC: props.regiCode,
        gI: props.gitId,
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
      await fetch(e.serverAddress + '/register', requestOptions)
        .then((res) => res.json()) // res 결과 값을 PROMISE 형태 파일로 받음
        .then((data) => {
          if (data === '학생 승인코드가 틀렸습니다.') return alert(data)
          else if (data === '에러가 발생했습니다. 이미 존재하는 학생입니다.')
            return alert(data)
          else if (
            data ===
            'Solved.ac에서 해당 ID를 찾을 수 없습니다 등록 후 시도해주세요'
          )
            return alert(data)
          else if (
            data === '솔브드에서 응답하지 않습니다. 잠시후 다시 시도해주세요'
          )
            return alert(data)
          else if (
            data ===
            '학생 등록이 완료되었습니다. 새로고침 후 이용해주시기 바랍니다.'
          )
            navigate('/rank')
          return alert(data)
          // if (!alert(data)) navigate('/rank')
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
          <h2 style={{ margin: '0%', textAlign: 'center' }}>등록하기</h2>
          <h6
            style={{ margin: '5% 0%', textAlign: 'center', color: '#5D5D5D' }}
          >
            Solved.ac &lt;성공회대학교&gt;에 소속되어 있는 학우에게만
            적용됩니다.
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
              id="User_ID"
              placeholder="Baekjoon ID"
              sx={{
                width: '90%',
                px: 2.9,
                py: 2,
              }}
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
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
              id="Register_CODE"
              placeholder="REGISTER CODE"
              sx={{
                width: '90%',
                px: 2.9,
                py: 2,
              }}
              value={regiCode}
              onChange={(e) => setRegiCode(e.target.value)}
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
              id="Git_ID"
              placeholder="*선택사항 : Github ID"
              sx={{
                width: '90%',
                px: 2.9,
                py: 2,
              }}
              value={gitId}
              onChange={(e) => setGitId(e.target.value)}
            />
          </Box>
          <button
            className="submitButton"
            onClick={() => {
              // console.log("@@@@@@@@@@@@@@");
              onClickSubmit({ userId, regiCode, gitId })
            }}
          >
            등록
          </button>
        </div>
      </Fade>
    </div>
  )
}

export default Register
