import React, { useCallback, useEffect, useState } from 'react'
import './Card.css'
import { Book } from '../app/App'

type CardProps = { key: string; book: Book };

function Card(props: CardProps): JSX.Element {
  const book = props.book
  const category = book.categories[0] ?? ''
  return (
    <div className="card" key={props.key}>
      <img
        className="card__img"
        src={book.imageLink}
        alt="cover"
      ></img>
      <div className="card__text">
        <div className="card__text-categories">{category}</div>
        <div className="spacer"></div>
        <div className="card__text-title">{book.title}</div>
        <div className="card__text-author">{book.authors.join(' ')}</div>
      </div>
    </div>
  )
}

export default Card
