import { useCallback, useEffect, useState } from "react"
import "./App.css"
import { Volume } from "../../Types"
import Header from "../header/Header"
import DetailsView from "../details-view/DetailsView"
import CardsView from "../cards-view/CardsView"
import Subheader from "../subheader/Subheader"
import Button from "../button/Button"
import Choice from "../choice/Choice"

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

export type Status = 'idle' | 'searching' | 'results-received'

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
  const [requestText, setRequestText] = useState('')
  const [selectedCardIndex, setSelectedCardIndex] = useState(-1)

  const onChangeOrderBy = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setOrderBy(e.target.value as OrderBy)
      if (search !== '') {
        setStatus('searching')
      }
    }, [search])
  const onChangeCategory = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => setCategory(e.target.value as Category), [])
  const onChangeSearchBar = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value), [])
  const onEnterPressInSearchBar = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        if (search !== '') {
          setStatus('searching')
          setRequestText(search)
        }
      }
    }, [search])
  const onClickSearchButton = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (search !== '') {
        setStatus('searching')
        setRequestText(search)
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
        <DetailsView book={{
          title: book.title ?? '',
          authors: book.authors ?? [],
          categories: book.categories ?? [],
          imageLink: book.imageLinks?.thumbnail ?? 'img/logo.svg',
          description: book.description ?? '',
        }} />
      )
    }
  }
  else {
    view = (
      books !== undefined && <CardsView books={books.items} onClickCard={onClickCard} />
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
        <Subheader>
          {selectedCardIndex === -1
            ? <>
              {status === 'results-received' && <div>{books?.totalItems} results for {requestText}</div>}
              <span className="spacer"></span>
              <Choice<OrderBy> onChooseOption={onChangeOrderBy} options={[
                { caption: 'Relevance', value: 'relevance' },
                { caption: 'Newest', value: 'newest' }
              ]}/>
            </>
            : <Button caption={'Back'} action={() => setSelectedCardIndex(-1)} />
          }
        </Subheader>
        {view}
      </div>
    </>
  )
}

export default App
