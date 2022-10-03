import { useState } from 'react'

import { TextField, InputAdornment } from '@mui/material'
import Box from '@mui/material/Box'
import SearchIcon from '@mui/icons-material/Search'

import { keyframes } from '@emotion/react'

import StudentInfo from './studentCom/StudentInfo'

import stbg from './studentCom/userCom/image/STBG.png'

const searchMove1 = keyframes`
  from {left: 20vw; top: 45vh; width: 60%; }
  to {left: 2vw; top: 2vh; width: 20%; }`
const searchMove2 = keyframes`
from {width: 90%; px: 2.9; py: 2;}
to {width: 80%; px: 1; py: 2;}`
const fadein = keyframes`
from {opacity: 0; }
to {opacity: 1; }`

function Student(props) {
  const [change, setChange] = useState(false)
  const [userName, setUserName] = useState('')

  return (
    <div
      style={{
        // backgroundColor: 'greenyellow',

        backgroundImage: `url(${stbg})`,
        backgroundSize: 'cover',
        height: '100vh',
      }}
    >
      <div className="test" style={{ animation: `${fadein} 0.5s` }}>
        <Box
          sx={Object.assign(
            change
              ? {
                  left: '2vw',
                  top: '2vh',
                  width: '20%',
                  animation: `${searchMove1} 1s`,
                }
              : {
                  left: '20vw',
                  top: '45vh',
                  width: '60%',
                },
            {
              position: 'absolute',
              backgroundColor: '#F2F2F2',
              borderRadius: 25,
              textAlign: 'center',
              boxShadow: '2px 8px 20px -12px #bdbdbd',
            }
          )}
        >
          <TextField
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                setChange(true)
              }
            }}
            autoComplete="off"
            variant="standard"
            id="User_ID"
            placeholder="Solved.ac ID 입력"
            sx={
              change
                ? { width: '80%', px: 1, py: 1, animation: `${searchMove2} 1s` }
                : { width: '90%', px: 2.9, py: 2 }
            }
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon
                    onClick={() => {
                      setChange(true)
                    }}
                  />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </div>
      {change ? (
        <StudentInfo
          userName={userName}
          ranking={props.ranking}
          serverAddress={props.serverAddress}
          recommend={props.recommend}
        />
      ) : (
        <></>
      )}
    </div>
  )
}

export default Student
