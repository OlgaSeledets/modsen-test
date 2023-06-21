import { Book } from '../app/App'
import * as styles from './Card.css'
import { cx } from '@emotion/css'
import { spacer } from '../../global.css'

type CardProps = { index: number, book: Book }

export function Card(props: CardProps): JSX.Element {
  const book = props.book
  const category = book.categories[0] ?? ''
  return (
    <div className={styles.card} id={`${props.index}`}>
      <img
        className={cx(styles.cardImg, styles.nonclickable)}
        src={book.imageLink}
        alt="cover"
      ></img>
      <div className={cx(styles.cardText, styles.nonclickable)}>
        <div className={cx(styles.cardTextCategories, styles.nonclickable)}>{category}</div>
        <div className={cx(spacer, styles.nonclickable)}></div>
        <div className={cx(styles.cardTextTitle, styles.nonclickable)}>{book.title}</div>
        <div className={cx(styles.cardTextAuthor, styles.nonclickable)}>{book.authors.join(' ')}</div>
      </div>
    </div>
  )
}
