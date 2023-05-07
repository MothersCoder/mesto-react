import React from "react";
import PopupWithForm from "./PopupWithForm";

function ConfirmPopup (props) {
  function handleSubmit (e) {
    e.preventDefault()
    console.log("хоть пробросилось")
    props.onDelete();
  }

  return (
    <PopupWithForm
      isOpen = {props.isOpen}
      onClose = {props.onClose}
      onSubmit = {handleSubmit}
      name = "confirm"
      title = "Вы уверены?"
      children = {
        <>
        </>
      }
      textButton = "Да"
  />
  )
}

export default ConfirmPopup
