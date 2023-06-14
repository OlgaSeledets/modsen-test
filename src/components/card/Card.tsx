import './Card.css'
import { Book } from '../app/App'

type CardProps = {index: number, book: Book };

function Card(props: CardProps): JSX.Element {
  const book = props.book
  const category = book.categories[0] ?? ''
  return (
    <div className="card" id={`${props.index}`}>
      <img
        className="card__img nonclickable"
        src={book.imageLink}
        alt="cover"
      ></img>
      <div className="card__text nonclickable">
        <div className="card__text-categories nonclickable">{category}</div>
        <div className="spacer nonclickable"></div>
        <div className="card__text-title nonclickable">{book.title}</div>
        <div className="card__text-author nonclickable">{book.authors.join(' ')}</div>
      </div>
    </div>
  )
}

export default Card
