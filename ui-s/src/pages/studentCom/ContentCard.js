import React from 'react'
import './ContentCard.css'

function ContentCard(props) {
  const pageOpen = () => {
    props.setOpen(true)
  }

  return (
    <div
      className="content_card"
      style={{
        height: props.height,
        width: props.width,
        background: '#ffffff',
        boxShadow: '8px 8px 28px -14px grey',
      }}
      onClick={() => pageOpen()}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundImage: `url(${props.testttt})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
        }}
      >
        <div
          style={{
            background: '#00000088',
            color: '#ffffff',
            width: '30%',
            height: '20%',
            textAlign: 'center',
            fontSize: 'auto',
          }}
        >
          {props.title}
        </div>
        <br />
        {props.text}
      </div>
    </div>
  )

}

export default ContentCard
