import { Book } from '../app/App'
import './DetailsView.css'

type DetailsViewProps = { book: Book }

function DetailsView(props: DetailsViewProps): JSX.Element {
  const book = props.book
  return (
    <div className="details-view">
      <div className="img-container">
        <img className="book__img" src={book.imageLink}></img>
      </div>
      <div className="description__text">
        <div className="description__text-categories">{book.categories.join(', ')}</div>
        <div className="description__text-title">{book.title}</div>
        <div className="description__text-authors">{book.authors.join(', ')}</div>
        <div className="description__text-description">{book.description}</div>
      </div>
    </div>
  )
}

export default DetailsView
