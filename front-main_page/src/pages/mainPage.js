import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { TextField, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { useNavigate } from 'react-router-dom'

const MainPage = (props) => {
  const [userId, setUserId] = useState('')
  const navigate = useNavigate()

  const add = async () => {
    try {
      await fetch('https://solved.ac/api/v3/user/show?handle=' + userId)
        .then((res) => res.json())
        .then((data) => {
          navigate('/userPage', { state: { userId } })
          props.setGlobalID(userId)
        })
    } catch (error) {
      alert('입력하신 ID는 Solve.ac에 등록되지 않았습니다.')
    }
  }
  // useEffect(() =>
  // // console.log(props)
  // , []);
  return (
    <div className="mainPage">
      {/* box 안에 있는 textfield를 사용하여 box로 겉이 둥근 모양의 상자를 만들고
            textfield에 padding 값 좌우 = 2.9, 상하 = 2 를 적용함
            그리고 searchIcon을 추가하여 왼쪽 끝에 적용 */}
      <Box
        sx={{
          // backgroundColor: "#F2F2F2",
          borderRadius: 25,
          width: '60%',
          textAlign: 'center',
          boxShadow: '2px 8px 20px -12px #bdbdbd',
        }}
      >
        <TextField
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              add()
            }
          }}
          variant="standard"
          id="User_ID"
          placeholder="Solved.ac ID 입력"
          sx={{
            width: '90%',
            px: 2.9,
            py: 2,
          }}
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {/* <Link to="/userPage" state={{ userId }}> */}
                <SearchIcon onClick={add} />
                {/* </Link> */}
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </div>
  )
}

export default MainPage
