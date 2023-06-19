import './Choice.css'

type Option<T> = {
  caption: string,
  value: T
}

type ChoiceProps<T> = {
  onChooseOption: (e: React.ChangeEvent<HTMLSelectElement>) => void,
  options: Array<Option<T>>
  style?: string
}

function Choice<T extends string>(props: ChoiceProps<T>): JSX.Element {
  return (
    <select
      className={`subheader__select select-common ${props.style ?? ''}`}
      onChange={props.onChooseOption}
    >
      {props.options.map(option => <option value={option.value}>{option.caption}</option>)}
    </select>
  )
}

export default Choice