import { Book } from '../app/App'
import * as styles from './CardDetails.css'

type CardDetailsProps = { book: Book }

export function CardDetails(props: CardDetailsProps): JSX.Element {
  const book = props.book
  return (
    <div className={styles.detailsView}>
      <div className={styles.imgContainer}>
        <img className={styles.bookImg} src={book.imageLink}></img>
      </div>
      <div className={styles.descriptionText}>
        <div className={styles.descriptionTextCategories}>{book.categories.join(', ')}</div>
        <div className={styles.descriptionTextTitle}>{book.title}</div>
        <div className={styles.descriptionTextAuthors}>{book.authors.join(', ')}</div>
        <div className={styles.descriptionTextDescription}>{book.description}</div>
      </div>
    </div>
  )
}
