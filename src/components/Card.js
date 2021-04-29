import React from 'react';
function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }


  return (
    <div id="element" key={props.card._id}>
      <div className="element">
        <button className="element__trash" type="button" aria-label="Удалить"></button>
        <img onClick={handleClick} className="element__image" src={props.card.link} alt={props.card.name} />
        <div className="element__container">
          <h2 className="element__title">{props.card.name}</h2>
          <div className="element__like-container">
            <button className="element__like" type="button" aria-label="Лайк"></button>
            <p className="element__like-coutner">{props.card.likes.length}</p>
          </div>
        </div>
      </div>
    </div>
  );


}

export default Card;
