import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import { TextField } from '@mui/material'
import './register.css'
import Fade from '@mui/material/Fade'
import ControlledRadioButtonsGroup from './MUI/ControlledRadioButtonsGroup'
import { useNavigate } from 'react-router-dom'

const ProRegister = (e) => {
  const navigate = useNavigate()

  const [proName, setProName] = useState('')
  const [proCode, setProRegiCode] = useState('')
  const [subCode, setSubCode] = useState('')
  const [subName, setSubName] = useState('')
  const [classNum, setClassNum] = useState('')

  const [checked, setChecked] = React.useState(false)

  const onClickSubmit = async (props) => {
    try {
      // console.log(props)
      if (props.proName === '') return alert('교수님 성함 입력하세요')
      else if (props.proCode === '') return alert('교수님 코드 입력하세요')
      else if (props.subCode === '') return alert('과목 코드 입력하세요')
      else if (props.subName === '') return alert('과목명 입력하세요')
      else if (props.classNum === '') return alert('반 개수를 선택하세요')
      // 매개변수로 받은 JSON형태 데이터를 조건에 맞게 바꾸기 위해 다시 정의
      const sbody = {
        pN: props.proName,
        pC: props.proCode,
        sC: props.subCode,
        sN: props.subName,
        cN: props.classNum,
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
      await fetch(e.serverAddress + '/proRegister', requestOptions)
        .then((res) => res.json()) // res 결과 값을 PROMISE 형태 파일로 받음
        .then((data) => {
          // .then을 한 번더 써야 사용할 수 있는 JSON 실질적인 값을 받을 수 있음
          // 여기서는 로그인 안내 문자를 팝업 메시지로 보여줄 것임
          if (data === '교수 승인코드가 틀렸습니다.')
            return alert('교수 승인코드가 틀렸습니다.')
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
          <h2 style={{ margin: '0%', textAlign: 'center' }}>강의 등록하기</h2>
          <h6
            style={{ margin: '5% 0%', textAlign: 'center', color: '#5D5D5D' }}
          >
            채점 서비스에 사용될 강의를 교수님이 직접 입력해주세요.
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
              id="PRO_NAME"
              placeholder="교수님 성함"
              sx={{
                width: '90%',
                px: 2.9,
                py: 2,
              }}
              value={proName}
              onChange={(e) => setProName(e.target.value)}
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
              id="PROFESSOR_CODE"
              placeholder="*PROFESSOR CODE"
              sx={{
                width: '90%',
                px: 2.9,
                py: 2,
              }}
              value={proCode}
              onChange={(e) => setProRegiCode(e.target.value)}
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
              id="SUB_CODE"
              placeholder="과목코드"
              sx={{
                width: '90%',
                px: 2.9,
                py: 2,
              }}
              value={subCode}
              onChange={(e) => setSubCode(e.target.value)}
            />
          </Box>
          <Box
            sx={{
              backgroundColor: '#F2F2F2',
              borderRadius: 25,
              textAlign: 'center',
            }}
          >
            <TextField
              variant="standard"
              id="SUB_NAME"
              placeholder="과목명"
              sx={{
                width: '90%',
                px: 2.9,
                py: 2,
              }}
              value={subName}
              onChange={(e) => setSubName(e.target.value)}
            />
          </Box>
          <h6 style={{ margin: '5% 0%' }}>
            본인이 이 강의를 몇 개의 반으로 강의하나요?
          </h6>
          <div>
            <ControlledRadioButtonsGroup
              classNum={classNum}
              setClassNum={setClassNum}
            ></ControlledRadioButtonsGroup>
          </div>
          <button
            className="submitButton"
            onClick={(e) => {
              // if(e.key === 'Enter') {
              //   onClickSubmit({ proName, proCode, subCode, subName, classNum })
              // }
              onClickSubmit({ proName, proCode, subCode, subName, classNum })
            }}
          >
            등록
          </button>
        </div>
      </Fade>
    </div>
  )
}

export default ProRegister
