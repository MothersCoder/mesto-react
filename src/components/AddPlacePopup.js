import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup (props) {

  function handleChangePlaceName (e) {
    props.changeName(e.target.value)
  }

  function handleChangeLinkPlace (e) {
    props.changeLink(e.target.value)
  }

  function handleSubmit (e) {
    e.preventDefault();

    props.onAddPlace ({
      name: props.nameValue,
      link: props.linkValue
    });
  }

  return (
    <PopupWithForm
      name = "newcard"
      title = "Новое место"
      isOpen = {props.isOpen}
      onClose = {props.onClose}
      onSubmit = {handleSubmit}
      textButton = {props.textButton}
      >
          <input id="palce-input" className="popup__input popup__input_type_placename" value = {props.nameValue} onChange = {handleChangePlaceName} type="text" name="place" placeholder="Название" minLength="2" maxLength="30" required />
          <div className="popup__error-zone">
            <span className="palce-input-error popup__error"></span>
          </div>
          <input id="link-input" className="popup__input popup__input_type_picturelink" value = {props.linkValue}onChange = {handleChangeLinkPlace} type="url" name="link" placeholder="Ссылка на картинку" minLength="2" required />
          <div className="popup__error-zone">
            <span className="link-input-error popup__error"></span>
          </div>
      </PopupWithForm>
  )
}

export default AddPlacePopup
