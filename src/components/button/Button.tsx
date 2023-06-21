import './Button.css'

type ButtonProps = {
  action: () => void
  caption: string
  customStyles?: string
}

export function Button(props: ButtonProps): JSX.Element {
  return (
    <button className={props.customStyles} onClick={props.action}>{props.caption}</button>
  )
}
