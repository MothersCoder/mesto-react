import React from "react";
import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup (props) {
  const [placeNameValue, setPlaceNameValue] = useState('');
  const [linkPlaceValue, setLinkPlaceValue] = useState('');

  useEffect (() => {
    setPlaceNameValue('');
    setLinkPlaceValue('');
  }, [props.isOpen])

  function handleChangePlaceName (e) {
    setPlaceNameValue(e.target.value)
  }

  function handleChangeLinkPlace (e) {
    setLinkPlaceValue(e.target.value)
  }

  function handleSubmit (e) {
    e.preventDefault();

    props.onAddPlace ({
      name: placeNameValue,
      link: linkPlaceValue
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
          <input id="palce-input" className="popup__input popup__input_type_placename" value = {placeNameValue} onChange = {handleChangePlaceName} type="text" name="place" placeholder="Название" minLength="2" maxLength="30" required />
          <div className="popup__error-zone">
            <span className="palce-input-error popup__error"></span>
          </div>
          <input id="link-input" className="popup__input popup__input_type_picturelink" value = {linkPlaceValue }onChange = {handleChangeLinkPlace} type="url" name="link" placeholder="Ссылка на картинку" minLength="2" required />
          <div className="popup__error-zone">
            <span className="link-input-error popup__error"></span>
          </div>
      </PopupWithForm>
  )
}

export default AddPlacePopup
