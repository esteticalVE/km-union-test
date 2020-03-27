import React from 'react'

type Props = {
  text: string
}

const AlertComponent: React.FC<Props> = ({ text }) => {
  return (
    <div className='alert alert-warning' role='alert'>
      {text}
    </div>
  )
}

export default AlertComponent
