import React from 'react';
import api from '../utils/api.js'
import Card from './Card.js'



class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      userDescription: '',
      userAvatar: '',
      cards: []
    };
  }

  componentDidMount() {
    const promises = [api.getInitialCards(), api.getUserInfo()]
    Promise.all(promises)
      .then((results) => {

        this.setState({
          userName: results[1].name,
          userDescription: results[1].about,
          userAvatar: results[1].avatar,
          cards: results[0]
        })
        this.state.cards.forEach((itm) => { console.log(itm) })
      }).catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }

  render() {
    console.log(this.props.onCardClick)
    return (
      <main className="main">
        <section className="profile">
          <div className="profile__avatar-container">
            <div className="profile__avatar-edit" onClick={this.props.onEditAvatar}></div>
            <img className="profile__avatar" src={this.state.userAvatar} alt="Аватарка" />
          </div>
          <div className="profile__info">
            <div className="profile__container">
              <h1 className="profile__info-name">{this.state.userName}</h1>
              <button onClick={this.props.onEditProfile} className="profile__edit-button" type="button" aria-label="Редактировать" ></button>
            </div>
            <p className="profile__info-job">{this.state.userDescription}</p>
          </div>
          <button onClick={this.props.onAddPlace} className="profile__add-button" type="button" aria-label="Добавить"></button>
        </section>
        <section className="elements">
          {this.state.cards.map((item, i) => (
            <Card card={item} onCardClick={this.props.onCardClick} key={item._id}/>
          ))}

        </section>
      </main>
    )
  };


}

export default Main;
