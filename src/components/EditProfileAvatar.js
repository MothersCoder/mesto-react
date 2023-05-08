import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditProfileAvatar (props) {

  function handleSubmit (e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: props.refInput.current.value
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
        <input id="link-avatar-input" className="popup__input popup__input_type_avatarlink" ref = {props.refInput} type="url" name="link" placeholder="Ссылка на аватарку" minLength="2" required />
        <div className="popup__error-zone">
          <span className="link-avatar-input-error popup__error"></span>
        </div>
      </>
  </PopupWithForm>
  )
}

export default EditProfileAvatar
