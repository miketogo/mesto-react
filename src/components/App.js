import '../index.css';
import React from 'react';
import Header from './Header.js'
import Main from './Main.js'
import Footer from './Footer.js'
import PopupWithForm from './PopupWithForm.js'
import ImagePopup from './ImagePopup.js'
import api from '../utils/api.js'
import CurrentUserContext from '../contexts/CurrentUserContext.js'
import EditProfilePopup from './EditProfilePopup.js'
import EditAvatarPopup from './EditAvatarPopup.js'
import AddPlacePopup from './AddPlacePopup.js'



function App() {
  const [EditProfilePopupOpen, isEditProfilePopupOpen] = React.useState(false);
  const [EditAvatarPopupOpen, isEditAvatarPopupOpen] = React.useState(false);
  const [AddPlacePopupOpen, isAddPlacePopupOpen] = React.useState(false);
  const [selectCard, selectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState(null);

  React.useEffect(() => {
    api.getInitialCards()
      .then((result) => {
        setCards(result)
        cards.forEach((itm) => { console.log(itm) })
      }).catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }, [])

  React.useEffect(() => {
    api.getUserInfo()
      .then((result) => {
        setCurrentUser(result);
        console.log(result)
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });

  }, []);

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
    selectedCard(null)
    isAddPlacePopupOpen(false)
    isEditProfilePopupOpen(false)
    isEditAvatarPopupOpen(false)
  }
  function handleUpdateUser(userInfo) {
    api.setUserInfo(userInfo)
      .then((res) => {
        setCurrentUser(res)
      })
      .then(() => {
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }
  function handleUpdateAvatar(avatar) {
    api.changeAvatar(avatar)
      .then((res) => {
        setCurrentUser(res)
        console.log(res)
      })
      .then(() => {
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }



  const handleCardLike = (card) => {
    console.log(card.likes.some(i => i._id === currentUser._id))
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
      console.log(newCard)
      setCards(
        cards.map((c) => c._id === card._id ? newCard : c)
      )
    })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }
  const handleCardDelete = (card) => {
    api.deleteCard(card._id)
      .then(() => {
        setCards(
          cards.filter((c) => c._id !== card._id)
        )
      }).catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }

  const handleAddPlaceSubmit = (card) => {
    api.addCard(card.title, card.link)
      .then((newCard) => {
        setCards([newCard, ...cards])
      })
      .then(() => {
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="page">
          <Header />
          <Main onEditProfile={handleEditProfileClick} onEditAvatar={handleEditAvatarClick} onAddPlace={handleAddPlaceClick} onCardClick={handleCardClick} cards={cards === null ? [] : cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete}

          />
          <Footer />
          <EditProfilePopup isOpen={EditProfilePopupOpen ? true : false} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
          <EditAvatarPopup isOpen={EditAvatarPopupOpen ? true : false} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
          <AddPlacePopup isOpen={AddPlacePopupOpen ? true : false} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
          <PopupWithForm name='Confirm' title='Вы уверены?' buttonTitle='Да' onClose={closeAllPopups} />
          <ImagePopup card={selectCard} onClose={closeAllPopups} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
