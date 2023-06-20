import { cx } from '@emotion/css'
import { Category } from '../app/App'
import Choice from '../choice/Choice'
import { searchSelect } from './Header.css'
import { container } from '../../global.css'

type HeaderProps = {
  onChangeCategory: (e: React.ChangeEvent<HTMLSelectElement>) => void
  onChangeSearchBar: (e: React.ChangeEvent<HTMLInputElement>) => void
  onEnterPressInSearchBar: (e: React.KeyboardEvent<HTMLInputElement>) => void
  onClickSearchButton: (e: React.MouseEvent<HTMLButtonElement>) => void
}

function Header(props: HeaderProps): JSX.Element {

  return (
    <header className="header">
      <div className={cx(container, "header-container")}>
        <img className="logo" src="img/logo.svg" alt="logo"></img>
        <h1 className="title">MODSEN TEST</h1>
        <div className="search">
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
            className="search__input"
            type="text"
            placeholder="Enter book name"
            onChange={props.onChangeSearchBar}
            onKeyDown={props.onEnterPressInSearchBar}
          ></input>
          <button
            className="lnr lnr-magnifier search__btn"
            onClick={props.onClickSearchButton}
          ></button>
        </div>
      </div>
    </header>
  )
}

export default Header