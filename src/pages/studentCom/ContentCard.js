import React from 'react'
import './ContentCard.css'

function ContentCard(props) {
  const pageOpen = () => {
    props.setOpen(true)
  }

  return (
    <>
      <div
        className="content_card"
        style={{
          backgroundColor: '#ffffff',
          height: props.height,
          width: props.width,
        }}
        onClick={() => pageOpen()}
      >
        {props.title}
        <br />
        {props.text}
      </div>
    </>
  )
}

export default ContentCard
