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
    <div className="container">
      <div className="cards">
        {books?.items.map((x) => 
          <div className="card" key={x.id}>
            <img className="card__img" src={x.volumeInfo?.imageLinks?.smallThumbnail} alt="cover"></img>
            <div className="card__text">
              <div className="card__text-categories">{x.volumeInfo?.categories}</div>
              <div className="card__spacer"></div>
              <div className="card__text-title">{x.volumeInfo?.title}</div>
              <div className="card__text-author">{x.volumeInfo?.authors[0]}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
