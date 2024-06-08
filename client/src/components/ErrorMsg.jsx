import React from 'react'

const ErrorMsg = ({text}) => {
  return (
    <div>
        <h2 className='text-xl text-center text-red-500 font-semibold'>{text}</h2>
    </div>
  )
}

export default ErrorMsg