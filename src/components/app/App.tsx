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
    <div className="App">
      <>
        {books?.items.map((x) => 
          <div key={x.id}>
            <div>{x.volumeInfo?.title}</div>
            <div>{x.volumeInfo?.authors[0]}</div>
            <img src={x.volumeInfo?.imageLinks?.smallThumbnail}></img>
          </div>
        )}
      </>
    </div>
  );
}

export default App;
