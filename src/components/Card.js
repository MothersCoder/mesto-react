import React from 'react';

function Card (props) {

  function handleClick () {
    props.onClick(props.data)
  }

  return (
    <li className="place__item" key={props.data._id}>
      <div className="place__image" onClick={handleClick} style={{
        backgroundImage: `url(${props.data.link})`,
        backgroundSize: 'cover'}} />
      <button type="button" className="place__delete"></button>
      <div className="place__description">
        <h2 className="place__title">{props.data.name}</h2>
        <div className="place__like-box">
          <button type="button" className="place__like"></button>
          <span className="place__like-count">{props.data.likes.length}</span>
        </div>
      </div>
    </li>
  )
}

export default Card;
