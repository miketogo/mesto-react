import '../index.css';
import React from 'react';
import Header from './Header.js'
import Main from './Main.js'
import Footer from './Footer.js'
import PopupWithForm from './PopupWithForm.js'
import ImagePopup from './ImagePopup.js'

function App() {
  const [EditProfilePopupOpen, isEditProfilePopupOpen] = React.useState(false);
  const [EditAvatarPopupOpen, isEditAvatarPopupOpen] = React.useState(false);
  const [AddPlacePopupOpen, isAddPlacePopupOpen] = React.useState(false);
  const [selectCard, selectedCard] = React.useState(false);

  function handleCardClick(card) {
    selectedCard(card)
    console.log(card)
  }

  function handleEditAvatarClick() {
    isEditAvatarPopupOpen(true)
  }
  function handleEditProfileClick() {
    isEditProfilePopupOpen(true)

  }
  function handleAddPlaceClick() {
    isAddPlacePopupOpen(true)
  }
  function closeAllPopups() {
    selectedCard(false)
    isAddPlacePopupOpen(false)
    isEditProfilePopupOpen(false)
    isEditAvatarPopupOpen(false)
  }

  return (
    <div className="root">
      <div className="page">
        <Header />
        <Main onEditProfile={handleEditProfileClick} onEditAvatar={handleEditAvatarClick} onAddPlace={handleAddPlaceClick} onCardClick={handleCardClick} />
        <Footer />
        <PopupWithForm name='profile' title='Редактировать профиль' buttonTitle='Сохранить' isOpen={EditProfilePopupOpen ? true : false} onClose={closeAllPopups}>
          <input minLength="2" maxLength="40" name="name" type="text" className="popup__input popup__input_type_name" defaultValue="" placeholder="Ваше имя" required />
          <span className="name-input-error popup__form-input-error"></span>
          <input minLength="2" maxLength="200" name="about" type="text" className="popup__input popup__input_type_job"
            defaultValue="" placeholder="Ваша работа" required />
          <span className=" about-input-error popup__form-input-error"></span>
        </PopupWithForm>
        <PopupWithForm name='editAvatar' title='Обновить аватар' buttonTitle='Сохранить' isOpen={EditAvatarPopupOpen ? true : false} onClose={closeAllPopups}>
          <input name="avatar" id="avatar" type="url" className="popup__input popup__input_type_avatar" defaultValue=""
            placeholder="Ссылка на картинку" required />
          <span className="avatar-input-error popup__form-input-error"></span>
        </PopupWithForm>
        <PopupWithForm name='addCard' title='Новое место' buttonTitle='Создать' isOpen={AddPlacePopupOpen ? true : false} onClose={closeAllPopups}>
          <input minLength="2" maxLength="30" name="title" id="title" type="text" className="popup__input popup__input_type_title" defaultValue=""
            placeholder="Название" required />
          <span className="title-input-error popup__form-input-error"></span>
          <input name="photo" id="photo" type="url" className="popup__input popup__input_type_photo" defaultValue=""
            placeholder="Ссылка на картинку" required />
          <span className="photo-input-error popup__form-input-error"></span>
        </PopupWithForm>
        <PopupWithForm name='Confirm' title='Вы уверены?' buttonTitle='Да' onClose={closeAllPopups} />
        <ImagePopup card={selectCard} onClose={closeAllPopups} />
      </div>
    </div>
  );
}

export default App;
