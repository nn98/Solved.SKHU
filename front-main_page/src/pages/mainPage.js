import React, { useState } from 'react'
import Box from '@mui/material/Box'
import { TextField, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { Link, useNavigate } from 'react-router-dom'

const MainPage = () => {
  const [userId, setUserId] = useState('')
  const navigate = useNavigate()

  const add = async () => {
    try {
      await fetch('https://solved.ac/api/v3/user/show?handle=' + userId)
        .then((res) => res.json())
        .then((data) => {
          navigate('/userPage', { state: { userId } })
        })
    } catch (error) {
      alert('실패')
    }
  }
  return (
    <div className="mainPage">
      {/* box 안에 있는 textfield를 사용하여 box로 겉이 둥근 모양의 상자를 만들고
            textfield에 padding 값 좌우 = 2.9, 상하 = 2 를 적용함
            그리고 searchIcon을 추가하여 왼쪽 끝에 적용 */}
      <Box
        sx={{
          backgroundColor: '#F2F2F2',
          borderRadius: 25,
          width: '80%',
          textAlign: 'center',
        }}
      >
        <TextField
          variant="standard"
          id="User_ID"
          placeholder="User ID / Problem ID"
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
