import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import { connect } from 'react-redux';
import { fetchGame } from "../store/async";
import { clearAction, logoutAction } from '../store/reducer'

class StartGame extends Component {

  constructor(props) {
    super(props);

    this.state = { isOpen: false, value: 1, text: 'Easy / Легко' }
  }

  selectTypeHard(e) {
    this.setState({ isOpen: false, value: +e.target.dataset.value, text: e.target.textContent })
  }

  openSelect() {
    this.setState({ ...this.state, isOpen: !this.state.isOpen })
  }

  submit(e) {
    e.preventDefault()
    this.props.start({ type: 1, type_hard: this.state.value });
  }

  log_out() {
    this.props.log_out();
  }


  render() {
    return (
      <main className="main-content">
        {(this.props.isLogin ? null : <Navigate to='/login' from='/start' />)}
        {(this.props.type === 2 ? <Navigate to='/game' from='/start' /> : null)}

        <form className="form form--horizontal" action="/" onSubmit={e => this.submit(e)}>
          <div className={`select ${this.state.isOpen ? 'select--active' : ''}`}>
            <div className="select__box-select-item" onClick={() => this.openSelect()}>{this.state.text}</div>
            <span className="select__icons"></span>
            <div className="select__box-options">
              <ul>
                <li className="select__item-option select__item-option--disabled">Выберите сложность игры</li>
                <li className={`select__item-option ${(this.state.value === 1) ? "select__item-option--active" : ""}`} data-value="1" onClick={e => this.selectTypeHard(e)}>Easy / Легко</li>
                <li className={`select__item-option ${(this.state.value === 2) ? "select__item-option--active" : ""}`} data-value="2" onClick={e => this.selectTypeHard(e)}>Hard / Тяжело</li>
              </ul>
            </div>
          </div>
          <button type="submit" className="btn">Старт</button>
        </form>

        <button className="btn btn--red" onClick={() => this.log_out()}>Разлогиниться</button>
      </main>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    isLogin: store.isLogin,
    type: store.request.type,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    start: (data) => dispatch(fetchGame(data)),
    clear: () => dispatch(clearAction()),
    log_out: () => dispatch(logoutAction())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StartGame);