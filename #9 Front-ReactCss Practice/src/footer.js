import Skhu from './image/skhu.png'

const Footer = () => {
  return (
    <>
      <div className="footer">
        <div style={{ float: 'left', paddingRight: '20px' }}>
          <img src={Skhu} style={{ width: '200px' }} alt="profile" />
        </div>

        <div>
          152-716 서울시 구로구 연동로 320 / 지하철 1, 7호선
          온수(성공회대입구)역 T.02-2610-4114
        </div>
        <div style={{ marginTop: '5px' }}>
          Copyright (c) Sung-Kong-Hoe Univisity. All rights reserved.
        </div>
      </div>
    </>
  )
}

export default Footer
