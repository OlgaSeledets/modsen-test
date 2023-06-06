import React, { useEffect, useState } from "react";
import "./App.css";

const BOOKS_API_BASE_URL = "https://www.googleapis.com/books/v1/volumes";
const KEY = "AIzaSyCe2JsmWBjV6Sg5do4S7lNPitIrl3iaNIY";

interface Response {
  items: Array<any>;
  kind: string;
  totalItems: number;
}

function App() {
  let data: Response = {
    items: [],
    kind: "",
    totalItems: 0,
  };
  fetch(`${BOOKS_API_BASE_URL}?q=JS&key=${KEY}&maxResults=30`).then((x) =>
    x.json().then((x) => (data = x))
  );

  return (
    <div className="App">
      <>
        {data.items.map((x) => {
          <div key={x.volumeInfo?.title}>
            <div>{x.volumeInfo?.title}</div>
            <div>{x.volumeInfo?.authors[0]}</div>
            <img src={x.volumeInfo?.imageLinks?.smallThumbnail}></img>
          </div>;
        })}
      </>
    </div>
  );
}

export default App;
