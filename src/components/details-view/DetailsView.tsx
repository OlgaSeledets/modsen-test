import { Book } from '../app/App'
import { bookImg, descriptionText, descriptionTextAuthors, descriptionTextCategories, descriptionTextDescription, descriptionTextTitle, detailsView, imgContainer } from './DetailsView.css'

type DetailsViewProps = { book: Book }

function DetailsView(props: DetailsViewProps): JSX.Element {
  const book = props.book
  return (
    <div className={detailsView}>
      <div className={imgContainer}>
        <img className={bookImg} src={book.imageLink}></img>
      </div>
      <div className={descriptionText}>
        <div className={descriptionTextCategories}>{book.categories.join(', ')}</div>
        <div className={descriptionTextTitle}>{book.title}</div>
        <div className={descriptionTextAuthors}>{book.authors.join(', ')}</div>
        <div className={descriptionTextDescription}>{book.description}</div>
      </div>
    </div>
  )
}

export default DetailsView
