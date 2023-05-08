import React from "react";
import PopupWithForm from "./PopupWithForm";

function ConfirmPopup (props) {
  function handleSubmit (e) {
    e.preventDefault()
    props.deletCard(props.cardData);
  }

  return (
    <PopupWithForm
      isOpen = {props.isOpen}
      onClose = {props.onClose}
      onSubmit = {handleSubmit}
      name = "confirm"
      title = "Вы уверены?"
      textButton = {props.textButton}
  />
  )
}

export default ConfirmPopup
