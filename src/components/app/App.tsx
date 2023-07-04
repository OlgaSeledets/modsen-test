import { useCallback, useEffect, useState } from "react"
import { Header } from "../header/Header"
import { CardDetails } from "../card-details/CardDetails"
import { CardGrid } from "../card-grid/CardGrid"
import { Subheader } from "../subheader/Subheader"
import { Button } from "../button/Button"
import { Choice } from "../choice/Choice"
import { container, spacer } from "../../global.css"
import { back, general } from "../button/Button.css"
import { errorMessage, message, subheaderSelect } from "./App.css"
import { VolumesResponse, requestVolumes } from "../../Requests"
import { cx } from "@emotion/css"
import { Volume } from "../../Types"
import { bookCount } from "../subheader/Subheader.css"

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
  const [startIndex, setStartIndex] = useState(0)
  const [items, setItems] = useState<Volume[] | undefined>([])

  const onChangeOrderBy = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setOrderBy(e.target.value as OrderBy)
      if (search !== '') {
        setStatus('searching')
        resetSearch()
      }
    }, [search])
  const onChangeCategory = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setCategory(e.target.value as Category)
      if (search !== '') {
        setStatus('searching')
        resetSearch()
      }
    }, [search])
  const onChangeSearchBar = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value), [])
  const onEnterPressInSearchBar = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        if (search !== '') {
          setStatus('searching')
          setRequestText(search)
          resetSearch()
        }
      }
    }, [search])
  const onClickSearchButton = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (search !== '') {
        setStatus('searching')
        setRequestText(search)
        setSelectedCardIndex(-1)
        resetSearch()
      }
    }, [search])
  const onClickCard = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const index = Number.parseInt((e.target as HTMLElement).id)
      if (!Number.isNaN(index)) {
        setSelectedCardIndex(index)
      }
    }, [])
  const onClickLoadMoreButton = useCallback(
    () => {
      setStartIndex(startIndex + 30)
      setStatus('searching')
    }, [startIndex])

  const getData = useCallback(
    async (search: string, category: Category, orderBy: OrderBy, startIndex: number) => {
      const data = await requestVolumes(search, category, orderBy, startIndex)
      if (data !== undefined) {
        setBooks(data)
        setStatus('results-received')
        setItems((items ?? []).concat(data?.items ?? []))
      }
      else {
        setStatus('error')
      }
    }, [items])

  useEffect(() => {
    if (status === 'searching') {
      void getData(search, category, orderBy, startIndex)
    }
  }, [status])

  function resetSearch(): void {
    setItems([])
    setStartIndex(0)
  }

  const book = selectedCardIndex !== -1 ? items?.[selectedCardIndex].volumeInfo : undefined

  let mainView
  if (status === 'searching') {
    mainView = <div className={message}>Loading...</div>
  }
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
        if (items?.length === 0) {
          mainView = <div className={message}>Loading...</div>
        }
        else {
          mainView = <CardGrid books={items ?? []} onClickCard={onClickCard} onClickLoadMoreButton={onClickLoadMoreButton} />
        }
      }
    }
  }
  else {
    if (status === 'searching') {
      mainView = <div className={message}>Loading...</div>
    }
    else {
      mainView = <div className={cx(errorMessage, message)}>Oops, an error has occurred. Try turning on the VPN :)</div>
    }
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
              {status === 'results-received' && <div className={bookCount}>{books?.totalItems} results for {requestText}</div>}
              <span className={spacer}></span>
              <Choice<OrderBy> customStyles={subheaderSelect} onChooseOption={onChangeOrderBy} options={[
                { caption: 'Relevance', value: 'relevance' },
                { caption: 'Newest', value: 'newest' }
              ]} />
            </>
            : <Button customStyles={cx(back, general)} caption={'Back'} action={() => setSelectedCardIndex(-1)} />
          }
        </Subheader>
        {mainView || <div className={message}>Hi, let's read!</div>}
      </div>
    </>
  )
}

export default App
