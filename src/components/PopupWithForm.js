import React from 'react';

function PopupWithForm (props) {

  const fields = (list) => {
    return list
  }
  const openModal = (status) => {
    return status ? 'popup_opened' : ''
  }

  return (
      <div className={`popup popup_type_${props.name} ${openModal(props.isOpen)}`}>
        <div className="popup__container">
          <button type="button" className="popup__close" onClick = {props.onClose}></button>
          <h3 className="popup__title">{props.title}</h3>
          <form className="popup__form" name={`${props.name}`} noValidate>
            {fields(props.children)}
            <button type="submit" className="popup__button">{props.textButton}</button>
          </form>
        </div>
      </div>
  )
}

export default PopupWithForm
