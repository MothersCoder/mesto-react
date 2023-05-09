import '../index.css';
import React from 'react';
import { useState, useEffect, useRef } from 'react';
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

  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isConfirmPopupOpen, setConfirmPopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState({name: '', link: ''})

  const [currentUser, setCurrentUser] = useState({});

  const [cards, setCards] = useState([]);

  const [placeNameValue, setPlaceNameValue] = useState('');
  const [linkPlaceValue, setLinkPlaceValue] = useState('');

  const [deleteCard, setDeleteCard] = useState([]);

  const [textButtonContent, setTextButtonContent] = useState ('');

  const avatarRefInput = useRef();

  function renderLoading(isLoading, textIsLoading, textLoaded) {
    isLoading ? setTextButtonContent(textIsLoading) : setTextButtonContent(textLoaded);
  }

  function changePlaceName (data) {
    setPlaceNameValue(data)
  }

  function changePlaceLink (data) {
    setLinkPlaceValue(data)
  }

  useEffect(() => {
    api.getUserInfo()
      .then((userData) => {
        setCurrentUser(userData)
      })
      .catch((err) => console.log(`${err}`))
  }, [])

  useEffect(() => {
    api.getInitialCards()
      .then((data) => {
        setCards(data)
      })
      .catch((err) => console.log(`${err}`))
  }, [])

  function setDefaultProfileButtonContent () {
    setTextButtonContent('Сохранить');
  }

  function handleEditProfileClick () {
    setEditProfilePopupOpen(true);
    setDefaultProfileButtonContent();
  }

  function handleEditAvatarClick () {
    setEditAvatarPopupOpen(true);
    avatarRefInput.current.value = '';
    setDefaultProfileButtonContent();
  }

  function handleAddPlaceClick () {
    setAddPlacePopupOpen(true);
    setPlaceNameValue('');
    setLinkPlaceValue('');
    setTextButtonContent('Создать');
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
    renderLoading(true, 'Удаляем...', 'Да');
    api.deletCard(cardData._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== cardData._id));
        closeAllPopups();
        })
      .finally(() => {
        renderLoading(false, 'Удаляем...', 'Да');
      })
      .catch((err) => console.log(`${err}`))
  }

  function handleUpdateUser (data) {
    renderLoading(true, 'Сохранение...', 'Сохранить');
    api.addUserInfo(data)
      .then((state) => {
        setCurrentUser(state);
        closeAllPopups();
      })
      .finally(() => {
        renderLoading(false, 'Сохранение...', 'Сохранить');
      })
      .catch((err) => console.log(`${err}`))
  }

  function handleUpdateAvatar (data) {
    renderLoading(true, 'Сохранение...', 'Сохранить');
    api.loadNewUserPhoto(data)
    .then((state) => {
      setCurrentUser(state);
      closeAllPopups();
    })
    .finally(() => {
      renderLoading(false, 'Сохранение...', 'Сохранить');
    })
    .catch((err) => console.log(`${err}`))
  }

  function handleAddPlaceSubmit (data) {
    renderLoading(true, 'Создание карточки...', 'Создать');
    api.addNewPlace(data)
      .then ((state) => {
        setCards([state, ...cards]);
        closeAllPopups();
      })
      .finally(() => {
        renderLoading(false, 'Создание карточки...', 'Создать');
      })
      .catch((err) => console.log(`${err}`))
  }

  function confirmPopupOpen (data) {
    setConfirmPopupOpen(true);
    setTextButtonContent('Да');
    setDeleteCard(data);
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
              onConfirm = {confirmPopupOpen}
            />

            <Footer />

            <EditProfilePopup isOpen = {isEditProfilePopupOpen} onClose = {closeAllPopups} onUpdateUser = {handleUpdateUser} textButton = {textButtonContent}/>
            <EditProfileAvatar isOpen = {isEditAvatarPopupOpen} onClose = {closeAllPopups} refInput = {avatarRefInput} onUpdateAvatar = {handleUpdateAvatar} textButton = {textButtonContent} />

            <AddPlacePopup isOpen = {isAddPlacePopupOpen} onClose = {closeAllPopups} onAddPlace = {handleAddPlaceSubmit} changeName = {changePlaceName} changeLink = {changePlaceLink} nameValue = {placeNameValue}  linkValue = {linkPlaceValue} textButton = {textButtonContent} />

            <ConfirmPopup isOpen = {isConfirmPopupOpen} onClose = {closeAllPopups} deletCard = {handleCardDelete} cardData = {deleteCard} textButton = {textButtonContent}/>

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
