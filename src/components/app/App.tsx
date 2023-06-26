import { useCallback, useEffect, useState } from "react"
import { Header } from "../header/Header"
import { CardDetails } from "../card-details/CardDetails"
import { CardGrid } from "../card-grid/CardGrid"
import { Subheader } from "../subheader/Subheader"
import { Button } from "../button/Button"
import { Choice } from "../choice/Choice"
import { container, spacer } from "../../global.css"
import { back } from "../button/Button.css"
import { subheaderSelect } from "./App.css"
import { VolumesResponse, requestVolumes } from "../../Requests"

export type Book = {
  title: string
  authors: Array<string>
  categories: Array<string>
  imageLink: string
  description: string
}

export type Category = 'all' | 'art' | 'biography' | 'computers' | 'history' | 'medical' | 'poetry'

export type Status = 'idle' | 'searching' | 'results-received' | 'error'

export type OrderBy = 'newest' | 'relevance'

function App(): JSX.Element {
  const [books, setBooks] = useState<VolumesResponse>()
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
      const data = await requestVolumes(search, category, orderBy)
      if (data !== undefined) {
        setBooks(data)
        setStatus('results-received')
      }
      else {
        setStatus('error')
      }
    }, [])

  useEffect(() => {
    if (status === 'searching') {
      void getData(search, category, orderBy)
    }
  }, [status])

  const book = selectedCardIndex !== -1 ? books?.items[selectedCardIndex].volumeInfo : undefined

  let mainView
  if (status !== 'error' && books?.totalItems !== 0) {
    if (books !== undefined) {
      if (selectedCardIndex !== -1) {
        mainView = <CardDetails book={{
          title: book?.title ?? '',
          authors: book?.authors ?? [],
          categories: book?.categories ?? [],
          imageLink: book?.imageLinks?.thumbnail ?? 'img/logo.svg',
          description: book?.description ?? '',
        }} />
      }
      else {
        mainView = <CardGrid books={books.items ?? []} onClickCard={onClickCard} />
      }
    }
  }
  else {
    mainView = <div>Error</div>
  }
  return (
    <>
      <Header
        onChangeCategory={onChangeCategory}
        onChangeSearchBar={onChangeSearchBar}
        onEnterPressInSearchBar={onEnterPressInSearchBar}
        onClickSearchButton={onClickSearchButton}
      />
      <div className={container}>
        <Subheader>
          {selectedCardIndex === -1
            ? <>
              {status === 'results-received' && <div>{books?.totalItems} results for {requestText}</div>}
              <span className={spacer}></span>
              <Choice<OrderBy> customStyles={subheaderSelect} onChooseOption={onChangeOrderBy} options={[
                { caption: 'Relevance', value: 'relevance' },
                { caption: 'Newest', value: 'newest' }
              ]} />
            </>
            : <Button customStyles={back} caption={'Back'} action={() => setSelectedCardIndex(-1)} />
          }
        </Subheader>
        {mainView}
      </div>
    </>
  )
}

export default App
