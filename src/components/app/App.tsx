import React, { useCallback, useEffect, useState } from "react"
import "./App.css"
import Card from "../card/Card"
import { Volume } from "../../Types"

const BOOKS_API_BASE_URL = "https://www.googleapis.com/books/v1/volumes"
const KEY = "AIzaSyCe2JsmWBjV6Sg5do4S7lNPitIrl3iaNIY"

export type Book = {
  title: string
  authors: Array<string>
  categories: Array<string>
  imageLink: string
  description: string
}

type Response = {
  items: Array<Volume>
  kind: string
  totalItems: number
}

type Category = 'all' | 'art' | 'biography' | 'computers' | 'history' | 'medical' | 'poetry'

type Status = 'idle' | 'searching' | 'results-received'

type OrderBy = 'newest' | 'relevance'

async function getBooks(search: string, category: Category, orderBy: OrderBy): Promise<Response> {
  const cat = category === 'all' ? '' : `+subject:${category}`
  const response = await fetch(
    `${BOOKS_API_BASE_URL}?q=${search}${cat}&orderBy=${orderBy}&key=${KEY}&maxResults=10`
  )
  return await response.json()
}

function App(): JSX.Element {
  const [books, setBooks] = useState<Response>()
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [category, setCategory] = useState<Category>('all')
  const [orderBy, setOrderBy] = useState<OrderBy>('relevance')
  const [bookName, setBookName] = useState('')
  const [selectedCardIndex, setSelectedCardIndex] = useState(-1)
  const getData = useCallback(
    async (search: string, category: Category, orderBy: OrderBy) => {
      const data = await getBooks(search, category, orderBy)
      setBooks(data)
      setStatus('results-received')
    }, [])
  useEffect(() => {
    if (status === 'searching') {
      void getData(search, category, orderBy)
    }
  }, [status])
  let view
  if (selectedCardIndex !== -1) {
    view = (
      <div className="details-view">
        <div className="img-container">
          <img className="book__img" src={books?.items[selectedCardIndex]?.volumeInfo?.imageLinks?.thumbnail}></img>
        </div>
        <div className="description__text">
          <div className="description__text-categories">{books?.items[selectedCardIndex].volumeInfo?.categories}</div>
          <div className="description__text-title">{books?.items[selectedCardIndex].volumeInfo?.title}</div>
          <div className="description__text-authors">{books?.items[selectedCardIndex].volumeInfo?.authors}</div>
          <div className="description__text-description">{books?.items[selectedCardIndex].volumeInfo?.description}</div>
        </div>
      </div>
    )
  }
  else {
    view = (
      <>
        <div className="subheader">
          {status === 'results-received' && <div>{books?.totalItems} results for {bookName}</div>}
          <span className="spacer"></span>
          <select
            className="subheader__select select-common"
            onChange={e => {
              setOrderBy(e.target.value as OrderBy)
              if (search !== '') {
                setStatus('searching')
              }
            }}
          >
            <option value="relevance">relevance</option>
            <option value="newest">newest</option>
          </select>
        </div>
        <div className="cards" onClick={e => {
          const index = Number.parseInt((e.target as HTMLElement).id)
          if (!Number.isNaN(index)) {
            setSelectedCardIndex(index)
          }
        }}>
          {books?.items.map((x, i) => {
            const info = x.volumeInfo
            return info ? (<Card
              index={i}
              key={x.etag ?? ''}
              book={{
                title: info?.title ?? '',
                authors: info?.authors ?? [],
                categories: info?.categories ?? [],
                imageLink: info?.imageLinks?.thumbnail ?? 'img/logo.svg',
                description: info?.description ?? '',
              }}
            />) : undefined
          })}
        </div>
      </>
    )
  }
  return (
    <>
      <header className="header">
        <div className="container header-container">
          <img className="logo" src="img/logo.svg" alt="logo"></img>
          <h1 className="title">MODSEN TEST</h1>
          <div className="search">
            <select
              className="search__select select-common"
              onChange={e => setCategory(e.target.value as Category)}
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
              onChange={e => setSearch(e.target.value)}
              onKeyDown={event => {
                if (event.key === 'Enter') {
                  if (search !== '') {
                    setStatus('searching')
                    setBookName(search)
                  }
                }
              }}
            ></input>
            <button
              className="lnr lnr-magnifier search__btn"
              onClick={e => {
                if (search !== '') {
                  setStatus('searching')
                  setBookName(search)
                  setSelectedCardIndex(-1)
                }
              }}
            ></button>
          </div>
        </div>
      </header>
      <div className="container">
        {view}
      </div>
    </>
  )
}

export default App
