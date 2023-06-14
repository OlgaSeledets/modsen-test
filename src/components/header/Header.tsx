import './Header.css'

type HeaderProps = {
  onChangeCategory: (e: React.ChangeEvent<HTMLSelectElement>) => void
  onChangeSearchBar: (e: React.ChangeEvent<HTMLInputElement>) => void
  onEnterPressInSearchBar: (e: React.KeyboardEvent<HTMLInputElement>) => void
  onClickSearchButton: (e: React.MouseEvent<HTMLButtonElement>) => void
}

function Header(props: HeaderProps): JSX.Element {

  return (
    <header className="header">
      <div className="container header-container">
        <img className="logo" src="img/logo.svg" alt="logo"></img>
        <h1 className="title">MODSEN TEST</h1>
        <div className="search">
          <select
            className="search__select select-common"
            onChange={props.onChangeCategory}
          >
            <option value="all">all</option>
            <option value="art">art</option>
            <option value="biography">biography</option>
            <option value="computers">computers</option>
            <option value="history">history</option>
            <option value="medical">medical</option>
            <option value="poetry">poetry</option>
          </select>
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