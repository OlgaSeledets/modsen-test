import './Button.css'

type ButtonProps = {
  action: () => void
  caption: string
}

function Button(props: ButtonProps): JSX.Element {
  return (
    <button className="back" onClick={props.action}>{props.caption}</button>
  )
}

export default Button