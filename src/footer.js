import Skhu_log from './image/skhu_log.png'

import Main_Bottom_Line from './image/main_bottom_line.png'

const Footer = () => {
  return (
    <>
      <div className="footer">
        <img
          src={Main_Bottom_Line}
          style={{ width: '90%', margin: '0 5%' }}
          alt="profile"
        />
        <div style={{ float: 'right', padding: '0.5% 2% 0 0' }}>
          <img src={Skhu_log} style={{ width: '100%' }} alt="profile" />
        </div>

        <div style={{ float: 'left', margin: '1%' }}>
          152-716 서울시 구로구 연동로 320 / 지하철 1, 7호선
          온수(성공회대입구)역 T.02-2610-4114
          <br />
          Copyright (c) Sung-Kong-Hoe Univisity. All rights reserved.
        </div>
      </div>
    </>
  )
}

export default Footer
