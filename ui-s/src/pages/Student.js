import React from 'react'

import { TextField, InputAdornment } from '@mui/material'
import Box from '@mui/material/Box'
import SearchIcon from '@mui/icons-material/Search'

function Student() {
  return (
    <div
      style={{
        backgroundColor: 'greenyellow',
        height: '100vh',
      }}
    >
      {/* <div
        className="test"
        style={{
          fontSize: '100px',
          position: 'absolute',
          left: '40%',
          top: '40%',
        }}
      >
        test
      </div> */}
      <div className="test">
        <Box
          sx={{
            position: 'absolute',
            left: '20vw',
            top: '45vh',
            backgroundColor: '#F2F2F2',
            borderRadius: 25,
            width: '60%',
            textAlign: 'center',
            boxShadow: '2px 8px 20px -12px #bdbdbd',
          }}
        >
          <TextField
            // onKeyPress={(e) => {
            //   if (e.key === 'Enter') {
            //     // add()
            //     alert('test 가능')
            //   }
            // }}
            variant="standard"
            id="User_ID"
            placeholder="Solved.ac ID 입력"
            sx={{
              width: '90%',
              px: 2.9,
              py: 2,
            }}
            // value={userId}
            // onChange={(e) => setUserId(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {/* <Link to="/userPage" state={{ userId }}> */}
                  <SearchIcon />
                  {/* onClick={add} */}

                  {/* </Link> */}
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </div>
    </div>
  )
}

export default Student
