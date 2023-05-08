import React from "react";
import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditProfileAvatar (props) {
  const avatarRefInput = useRef();

  function handleSubmit (e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRefInput.current.value
    })
  }

  return (
  <PopupWithForm
    name = "newuserphoto"
    title = "Обновить аватар"
    onSubmit = {handleSubmit}
    isOpen = {props.isOpen}
    onClose = {props.onClose}
    textButton = {props.textButton}
    >
      <>
        <input id="link-avatar-input" className="popup__input popup__input_type_avatarlink" ref = {avatarRefInput} type="url" name="link" placeholder="Ссылка на аватарку" minLength="2" required />
        <div className="popup__error-zone">
          <span className="link-avatar-input-error popup__error"></span>
        </div>
      </>
  </PopupWithForm>
  )
}

export default EditProfileAvatar
