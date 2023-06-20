import { cx } from '@emotion/css'
import './Choice.css'
import { choiceBaseStyles } from './Choice.css'

type Option<T> = {
  caption: string,
  value: T
}

type ChoiceProps<T> = {
  onChooseOption: (e: React.ChangeEvent<HTMLSelectElement>) => void,
  options: Array<Option<T>>,
  customStyles?: string
}

function Choice<T extends string>(props: ChoiceProps<T>): JSX.Element {
  return (
    <select
      className={cx(choiceBaseStyles, props.customStyles ?? '')}
      onChange={props.onChooseOption}
    >
      {props.options.map((option, i) => <option key={i} value={option.value}>{option.caption}</option>)}
    </select>
  )
}

export default Choice