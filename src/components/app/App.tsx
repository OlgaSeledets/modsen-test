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

type Status = 'idle' | 'searching' | 'found'

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
  const getData = useCallback(
    async (search: string, category: Category, orderBy: OrderBy) => {
      const data = await getBooks(search, category, orderBy)
      setBooks(data)
      setStatus('found')
    }, [])
  useEffect(() => {
    if (status === 'searching') {
      void getData(search, category, orderBy)
    }
  }, [status])
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
                }
              }}
            ></button>
          </div>
        </div>
      </header>
      <div className="container">
        <div className="subheader">
          <div>{books?.totalItems} results for {bookName}</div>
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
        <div className="cards">
          {books?.items.map((x) => {
            const info = x.volumeInfo
            return info ? (<Card
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
        <div className="details-view">
          <div className="img-container">
            <img className="book__img" src={books?.items[0]?.volumeInfo?.imageLinks?.thumbnail}></img>
          </div>
          <div className="description__text">
            <div className="description__text-categories">{books?.items[0].volumeInfo?.categories}</div>
            <div className="description__text-title">{books?.items[0].volumeInfo?.title}</div>
            <div className="description__text-authors">{books?.items[0].volumeInfo?.authors}</div>
            <div className="description__text-description">{books?.items[0].volumeInfo?.description}</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
