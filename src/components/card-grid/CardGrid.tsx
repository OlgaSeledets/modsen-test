import { cx } from '@emotion/css'
import { Volume } from '../../Types'
import { Button } from '../button/Button'
import { general, loadMore } from '../button/Button.css'
import { Card } from '../card/Card'
import { cardGrid, cards } from './CardGrid.css'

type CardGridProps = {
  books: Array<Volume>
  onClickCard: (e: React.MouseEvent<HTMLDivElement>) => void
}

export function CardGrid(props: CardGridProps): JSX.Element {
  return (
    <div className={cardGrid}>
      <div className={cards} onClick={props.onClickCard}>
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
      <Button customStyles={cx(loadMore, general)} caption={'Load more'} action={() => console.log('more')} />
    </div>
  )
}
