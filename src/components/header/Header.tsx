import { cx } from '@emotion/css'
import { header, headerContainer, logo, title } from './Header.css'
import { container } from '../../global.css'
import { SearchBar } from '../search-bar/SearchBar'

type HeaderProps = {
  onChangeCategory: (e: React.ChangeEvent<HTMLSelectElement>) => void
  onChangeSearchBar: (e: React.ChangeEvent<HTMLInputElement>) => void
  onEnterPressInSearchBar: (e: React.KeyboardEvent<HTMLInputElement>) => void
  onClickSearchButton: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export function Header(props: HeaderProps): JSX.Element {
  return (
    <header className={header}>
      <div className={cx(container, headerContainer)}>
        <img className={logo} src="img/logo.svg" alt="logo"></img>
        <h1 className={title}>MODSEN TEST</h1>
        <SearchBar
          onChangeCategory={props.onChangeCategory}
          onChangeSearchBar={props.onChangeSearchBar}
          onEnterPressInSearchBar={props.onEnterPressInSearchBar}
          onClickSearchButton={props.onClickSearchButton}
        />
      </div>
    </header>
  )
}
