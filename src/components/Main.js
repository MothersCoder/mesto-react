import React from 'react';
import { api } from '../utils/Api';
import Card from '../components/Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main (props) {
  const [cards, setCards] = React.useState([]);

  const currentUser = React.useContext(CurrentUserContext)

  React.useEffect(() => {
    api.getInitialCards()
      .then((data) => {
        setCards(data)
      })
      .catch((err) => console.log(`${err}`))
  }, [])

  return (
    <div className="main">
      <section className="profile">
        <div className="profile__photo-container" onClick = {props.onEditAvatar}>
          <div className="profile__avatar" style={{
            backgroundImage: `url(${currentUser.avatar})`,
            backgroundSize: 'cover'}}
          />
        </div>
        <div className="profile__user">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button type="button" className="profile__edit-button" onClick = {props.onEditProfile}></button>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button type="button" className="profile__add-button" onClick = {props.onAddPlace}></button>
      </section>
      <section className="places">
        <ul className="place">
            {cards.map((card) => (
              <Card data={card} onClick = {props.onCardClick} onLikeClick = {props.onCardLike} key={card._id} />
            ))}
        </ul>
      </section>
    </div>
  )
}

export default Main;
