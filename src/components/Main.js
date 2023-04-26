import React from 'react';
import { api } from '../utils/Api';
import Card from '../components/Card'

function Main (props) {

  const [userName, setUserName] = React.useState();
  const [userDescription, setUserDescription] = React.useState();
  const [userAvatar, setUserAvatar] = React.useState('');

  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getUserInfo()
      .then((data) => {
        setUserAvatar(data.avatar);
        setUserName(data.name);
        setUserDescription(data.about)
      })
  }, [])

  React.useEffect(() => {
    api.getInitialCards()
      .then((data) => {
        setCards(data)
      })
  }, [])

  return (
    <div className="main">
      <section className="profile">
        <div className="profile__photo-container" onClick = {props.onEditAvatar}>
          <div className="profile__avatar" style={{
            backgroundImage: `url(${userAvatar})`,
            backgroundSize: 'cover'}}
          />
        </div>
        <div className="profile__user">
          <h1 className="profile__name">{userName}</h1>
          <button type="button" className="profile__edit-button" onClick = {props.onEditProfile}></button>
          <p className="profile__description">{userDescription}</p>
        </div>
        <button type="button" className="profile__add-button" onClick = {props.onAddPlace}></button>
      </section>
      <section className="places">
        <ul className="place">
            {cards.map((card) => (
              <Card data={card} onClick = {props.onCardClick} key={card._id} />
            ))}
        </ul>
      </section>
    </div>
  )
}

export default Main;
