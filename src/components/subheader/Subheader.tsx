import React from 'react'
import { subheader } from './Subheader.css'

type SubheaderProps = {
  children: React.ReactNode
}

function Subheader(props: SubheaderProps): JSX.Element {
  return (
    <div className={subheader}>
      {props.children}
    </div>
  )
}

export default Subheader