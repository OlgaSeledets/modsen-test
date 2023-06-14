import { Volume } from '../../Types'
import Card from '../card/Card'
import './CardsView.css'

type CardsViewProps = {
  books: Array<Volume>
  onClickCard: (e: React.MouseEvent<HTMLDivElement>) => void
}

function CardsView(props: CardsViewProps): JSX.Element {

  return (
    <>
      <div className="cards" onClick={props.onClickCard}>
        {props.books.map((x, i) => {
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

export default CardsView