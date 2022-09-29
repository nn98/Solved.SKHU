import React from 'react'
import './ContentCard.css'
import Lottie from 'lottie-react'

function ContentCard(props) {
  const pageOpen = () => {
    props.setOpen(true)
  }

  return (
    <>
      <div
        className="content_card"
        style={{
          boxShadow: `${props.shadow}`,
          backgroundImage: `url(${props.url})`,
          backgroundSize: 'cover',
          height: props.height,
          width: props.width,
        }}
        onClick={() => pageOpen()}
      >
        <div style={{ position: 'relative' }}>
          <Lottie
            animationData={props.question}
            style={{
              width: '80%',
              position: 'absolute',
              padding: '5% 10% 0% 10%',
            }}
          />
        </div>
        {/* <div style={{position:"absolute"}}> */}
        {props.title}
        <br />
        {props.text}
        {/* </div> */}
      </div>
    </>
  )
}

export default ContentCard
