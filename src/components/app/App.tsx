import { useCallback, useEffect, useState } from "react"
import "./App.css"
import { Volume } from "../../Types"
import Header from "../header/Header"
import DetailsView from "../details-view/DetailsView"
import CardsView from "../cards-view/CardsView"

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
    `${BOOKS_API_BASE_URL}?q=${search}${cat}&orderBy=${orderBy}&key=${KEY}&maxResults=30`
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

  const onChangeCategory = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => setCategory(e.target.value as Category), [])
  const onChangeSearchBar = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value), [])
  const onEnterPressInSearchBar = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        if (search !== '') {
          setStatus('searching')
          setBookName(search)
        }
      }
    }, [search])
  const onClickSearchButton = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (search !== '') {
        setStatus('searching')
        setBookName(search)
        setSelectedCardIndex(-1)
      }
    }, [search])
  const onClickCard = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const index = Number.parseInt((e.target as HTMLElement).id)
      if (!Number.isNaN(index)) {
        setSelectedCardIndex(index)
      }
    }, [])

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
    const book = books?.items[selectedCardIndex].volumeInfo
    if (book !== undefined) {
      view = (
        <>
          <button className="back" onClick={e => setSelectedCardIndex(-1)}>Back</button>
          <DetailsView book={{
            title: book.title ?? '',
            authors: book.authors ?? [],
            categories: book.categories ?? [],
            imageLink: book.imageLinks?.thumbnail ?? 'img/logo.svg',
            description: book.description ?? '',
          }} />
        </>
      )
    }
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
        {books !== undefined && <CardsView books={books.items} onClickCard={onClickCard} />}
      </>
    )
  }
  return (
    <>
      <Header
        onChangeCategory={onChangeCategory}
        onChangeSearchBar={onChangeSearchBar}
        onEnterPressInSearchBar={onEnterPressInSearchBar}
        onClickSearchButton={onClickSearchButton}
      />
      <div className="container">
        {view}
      </div>
    </>
  )
}

export default App
