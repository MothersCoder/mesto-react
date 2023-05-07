import '../index.css';
import React from 'react';
import Header from '../components/Header';
import Main from '../components/Main'
import Footer from '../components/Footer';
import ImagePopup from './ImagePopup';
import ConfirmPopup from './ConfirmPopup';
import EditProfilePopup from './EditProfilePopup';
import EditProfileAvatar from './EditProfileAvatar';
import AddPlacePopup from './AddPlacePopup';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import { api } from '../utils/Api';

function App() {

  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isConfirmPopupOpen, setConfirmPopupOpen] = React.useState(false);


  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({name: '', link: ''})

  const [currentUser, setCurrentUser] = React.useState({});

  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getUserInfo()
      .then((userData) => {
        setCurrentUser(userData)
      })
      .catch((err) => console.log(`${err}`))
  }, [])

  React.useEffect(() => {
    api.getInitialCards()
      .then((data) => {
        setCards(data)
      })
      .catch((err) => console.log(`${err}`))
  }, [])

  function handleEditProfileClick () {
    setEditProfilePopupOpen(true)
  }

  function handleEditAvatarClick () {
    setEditAvatarPopupOpen(true)
  }

  function handleAddPlaceClick () {
    setAddPlacePopupOpen(true)
  }

  function handleConfirmClick () {
    setConfirmPopupOpen(true)
  }

  function closeAllPopups () {
    setAddPlacePopupOpen(false)
    setEditAvatarPopupOpen(false)
    setEditProfilePopupOpen(false)
    setImagePopupOpen(false);
    setConfirmPopupOpen(false);
  }

  function handleCardClick (cardData) {
    setSelectedCard({name: cardData.name, link: cardData.link});
    setImagePopupOpen(true);
  }

  function handleCardLike (cardData) {
    const isLiked = cardData.likes.some(item => item._id === currentUser._id);

    api.changeLikeCardStatus(cardData._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === cardData._id ? newCard : c));
      })
      .catch((err) => console.log(`${err}`))
  }

  function handleCardDelete (cardData) {
    api.deletCard(cardData._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== cardData._id));
        })
      .catch((err) => console.log(`${err}`))
  }

  function handleUpdateUser (data) {
    api.addUserInfo(data)
      .then((state) => {
        setCurrentUser(state);
        closeAllPopups();
      })
      .catch((err) => console.log(`${err}`))
  }

  function handleUpdateAvatar (data) {
    api.loadNewUserPhoto(data)
    .then((state) => {
      setCurrentUser(state);
      closeAllPopups();
    })
    .catch((err) => console.log(`${err}`))
  }

  function handleAddPlaceSubmit (data) {
    api.addNewPlace(data)
      .then ((state) => {
        setCards([state, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(`${err}`))
  }

  return (
    <>
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      <div className="page__content">
        <Header />
        <Main

          onEditProfile = {handleEditProfileClick}
          onAddPlace = {handleAddPlaceClick}
          onEditAvatar = {handleEditAvatarClick}

          cards = {cards}
          onCardClick = {handleCardClick}
          onCardLike = {handleCardLike}
          onCardDelete = {handleCardDelete}
          onConfirm = {handleConfirmClick}
        />

        <Footer />

        <EditProfilePopup isOpen = {isEditProfilePopupOpen} onClose = {closeAllPopups} onUpdateUser = {handleUpdateUser} />
        <EditProfileAvatar isOpen = {isEditAvatarPopupOpen} onClose = {closeAllPopups} onUpdateAvatar = {handleUpdateAvatar} />

        <AddPlacePopup isOpen = {isAddPlacePopupOpen} onClose = {closeAllPopups} onAddPlace = {handleAddPlaceSubmit} />
        <ConfirmPopup isOpen = {isConfirmPopupOpen} onClose = {closeAllPopups} />
        <ImagePopup
          isOpen = {isImagePopupOpen}
          data = {selectedCard}
          onClose = {closeAllPopups}
        />

      </div>
    </div>
    </CurrentUserContext.Provider>
    </>
  );
}

export default App;
