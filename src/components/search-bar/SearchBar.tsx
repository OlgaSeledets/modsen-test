import { cx } from '@emotion/css'
import { Category } from '../app/App'
import { Choice } from '../choice/Choice'
import { search, searchBtn, searchInput, searchSelect } from '../search-bar/SearchBar.css'

type SearchBarProps = {
  onChangeCategory: (e: React.ChangeEvent<HTMLSelectElement>) => void
  onChangeSearchBar: (e: React.ChangeEvent<HTMLInputElement>) => void
  onEnterPressInSearchBar: (e: React.KeyboardEvent<HTMLInputElement>) => void
  onClickSearchButton: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export function SearchBar(props: SearchBarProps): JSX.Element {
  return (
    <div className={search}>
      <Choice<Category> customStyles={searchSelect} onChooseOption={props.onChangeCategory} options={[
        { caption: 'All', value: 'all' },
        { caption: 'Art', value: 'art' },
        { caption: 'Biography', value: 'biography' },
        { caption: 'Computers', value: 'computers' },
        { caption: 'History', value: 'history' },
        { caption: 'Medical', value: 'medical' },
        { caption: 'Poetry', value: 'poetry' },
      ]}/>
      <input
        className={searchInput}
        type="text"
        placeholder="Enter book name"
        onChange={props.onChangeSearchBar}
        onKeyDown={props.onEnterPressInSearchBar}
      ></input>
      <button
        className={cx(searchBtn, "lnr lnr-magnifier")}
        onClick={props.onClickSearchButton}
      ></button>
    </div>
  )
}
