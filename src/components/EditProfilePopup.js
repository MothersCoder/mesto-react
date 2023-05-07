import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup (props) {
  const currentUser = React.useContext(CurrentUserContext);

  const [valueName, setValueName] = React.useState('');
  const [valueDescription, setValueDescription] = React.useState('');

  function handleChangeName (e) {
    setValueName(e.target.value)
  }

  function handleChangeDescription (e) {
    setValueDescription(e.target.value)
  }

  React.useEffect (() => {
    setValueName(currentUser.name ??"")
    setValueDescription(currentUser.about ??"")
  }, [currentUser])

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name: valueName,
      about: valueDescription,
    });
  }

  return (
    <PopupWithForm
      isOpen = {props.isOpen}
      onClose = {props.onClose}
      onSubmit = {handleSubmit}
      name = "profile"
      title = "Редактировать профиль"
      children = {
        <>
          <input id="name-input" className="popup__input popup__input_type_name" value={valueName} onChange = {handleChangeName} type="text" name="firstname" placeholder="Имя" minLength="2" maxLength="40" required />
          <div className="popup__error-zone">
            <span className="name-input-error popup__error"></span>
          </div>
          <input id="about-input" className="popup__input popup__input_type_about" value={valueDescription} onChange = {handleChangeDescription} type="text" name="about" placeholder="О себе" minLength="2" maxLength="200" required />
          <div className="popup__error-zone">
            <span className="about-input-error popup__error"></span>
          </div>
        </>
      }

      textButton = "Сохранить"
    />
  )
}

export default EditProfilePopup
