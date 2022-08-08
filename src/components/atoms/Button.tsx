import React, { FC } from 'react'

type Props = {
  children:string,
  onClick:any//【未着手】関数定義
}

const Button:FC<Props> = (props) => {
  const { children,onClick } = props;
  return (
    <button className='block px-4 py-1 bg-green-500 rounded-lg text-white' onClick={onClick}>{children}</button>
  )
}

export default Button

