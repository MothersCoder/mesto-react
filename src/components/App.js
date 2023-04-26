import '../index.css';
import React from 'react';
import Header from '../components/Header';
import Main from '../components/Main'
import Footer from '../components/Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {

  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);

  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState('')

  function handleEditProfileClick () {
    setEditProfilePopupOpen(true)
  }

  function handleEditAvatarClick () {
    setEditAvatarPopupOpen(true)
  }

  function handleAddPlaceClick () {
    setAddPlacePopupOpen(true)
  }

  function closeAllPopups () {
    setAddPlacePopupOpen(false)
    setEditAvatarPopupOpen(false)
    setEditProfilePopupOpen(false)
    setImagePopupOpen(false);
  }

  function handleCardClick (cardData) {
    setSelectedCard(cardData);
    setImagePopupOpen(true);
  }

  return (
    <>
    <div className="page">
      <div className="page__content">
        <Header />
        <Main
          onEditProfile = {handleEditProfileClick}
          onAddPlace = {handleAddPlaceClick}
          onEditAvatar = {handleEditAvatarClick}

          onCardClick = {handleCardClick}
        />
        <Footer />

        <PopupWithForm
          name = "profile"
          title = "Редактировать профиль"
          children = {
            <>
              <input id="name-input" className="popup__input popup__input_type_name" type="text" name="firstname" placeholder="Имя" minLength="2" maxLength="40" required />
              <div className="popup__error-zone">
                <span className="name-input-error popup__error"></span>
              </div>
              <input id="about-input" className="popup__input popup__input_type_about" type="text" name="about" placeholder="О себе" minLength="2" maxLength="200" required />
              <div className="popup__error-zone">
                <span className="about-input-error popup__error"></span>
              </div>
            </>
          }
          isOpen = {isEditProfilePopupOpen}
          onClose = {closeAllPopups}
        />

        <PopupWithForm
          name = "newcard"
          title = "Новое место"
          children = {
            <>
              <input id="palce-input" className="popup__input popup__input_type_placename" type="text" name="place" placeholder="Название" minLength="2" maxLength="30" required />
              <div className="popup__error-zone">
                <span className="palce-input-error popup__error"></span>
              </div>
              <input id="link-input" className="popup__input popup__input_type_picturelink" type="url" name="link" placeholder="Ссылка на картинку" minLength="2" required />
              <div className="popup__error-zone">
                <span className="link-input-error popup__error"></span>
              </div>
            </>
          }
          isOpen = {isAddPlacePopupOpen}
          onClose = {closeAllPopups}
        />

        <PopupWithForm
          name = "confirm"
          title = "Вы уверены?"
          children = {
            <>
            </>
          }
        />

        <PopupWithForm
          name = "newuserphoto"
          title = "Обновить аватар"
          children = {
            <>
              <input id="link-avatar-input" className="popup__input popup__input_type_avatarlink" type="url" name="link" placeholder="Ссылка на аватарку" minLength="2" required />
              <div className="popup__error-zone">
                <span className="link-avatar-input-error popup__error"></span>
              </div>
            </>
          }
          isOpen = {isEditAvatarPopupOpen}
          onClose = {closeAllPopups}
        />

        <ImagePopup
          isOpen = {isImagePopupOpen}
          data = {selectedCard}
          onClose = {closeAllPopups}
        />

      </div>
    </div>
    </>
  );
}

export default App;
