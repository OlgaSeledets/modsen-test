import React, { useCallback, useEffect, useState } from "react";
import "./App.css";

const BOOKS_API_BASE_URL = "https://www.googleapis.com/books/v1/volumes";
const KEY = "AIzaSyCe2JsmWBjV6Sg5do4S7lNPitIrl3iaNIY";

interface Response {
  items: Array<any>;
  kind: string;
  totalItems: number;
}

async function getBooks() {
  const response = await fetch(
    `${BOOKS_API_BASE_URL}?q=JS&key=${KEY}&maxResults=30`
  );
  return await response.json();
}

function App() {
  const [books, setBooks] = useState<Response>()
  const getData = useCallback(async () => {
    const data = await getBooks()
    setBooks(data)
    console.log(data)
  }, [])

  useEffect(() => {
    getData()
  }, [])
  
  return (
    <>
      <header className="header">
        <div className="container header-container">
          <img className="logo" src="img/logo.svg" alt="logo"></img>
          <h1 className="title">MODSEN TEST</h1>
          <div className="search">
            <select className="search__select select-common" name="categories" id="categories-select">
              <option value="all">all</option>
              <option value="art">art</option>
              <option value="biography">biography</option>
              <option value="computers">computers</option>
              <option value="history">history</option>
              <option value="medical">medical</option>
              <option value="poetry">poetry</option>
            </select>
            <input className='search__input' type="text" placeholder='Enter the name of the book'></input>
            <button className="lnr lnr-magnifier search__btn"></button>
          </div>
        </div>
      </header>
      <div className="container">
        <div className="subheader">
          <div>{books?.totalItems} results for ...</div>
          <select className="subheader__select select-common" name="sort" id="sort-select">
            <option value="relevance">relevance</option>
            <option value="newest">newest</option>
          </select>
        </div>
        <div className="cards">
          {books?.items.map((x) => 
            <div className="card" key={x.id}>
              <img className="card__img" src={x.volumeInfo?.imageLinks?.thumbnail} alt="cover"></img>
              <div className="card__text">
                <div className="card__text-categories">{x.volumeInfo?.categories}</div>
                <div className="spacer"></div>
                <div className="card__text-title">{x.volumeInfo?.title}</div>
                <div className="card__text-author">{x.volumeInfo?.authors[0]}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
