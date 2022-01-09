import React, { Component } from 'react';
import { Link, Navigate } from "react-router-dom";
import { connect } from 'react-redux';
import { fetchLogin } from '../store/async';
import { clearAction } from '../store/reducer';
import Input from './input';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = { email: '', password: '' }
    this.changeValue = this.changeValue.bind(this);
  }

  componentDidMount() {
    this.props.clear();
  }

  submit(e) {
    e.preventDefault()
    this.props.login({ ...this.state });
  }

  changeValue(target) {
    this.setState({ ...this.state, [target.name]: target.value })
  }

  render() {
    return (
      <>
        {(this.props.isLogin) ? <Navigate to="/start" from="/login" /> : null}
        <nav className="nav nav--left">
          <h2 className="nav__item nav__item--active">Войти</h2>
          <Link to="/signup"><h2 className="nav__item">Регистрация</h2></Link>
        </nav>
        <main className='main-content'>
          <form action="/" method="get" onSubmit={e => this.submit(e)}>
            <Input name="email" placeholder="Email" classes="" value={this.state.email} change={this.changeValue} />
            <Input type="password" name="password" placeholder="Пароль" classes="" value={this.state.password} change={this.changeValue} />
            <p className='form__message form__message--error'>{(this.props.error === 'Unauthorized') ? "Неверный логин или пароль" : ""}</p>
            <button type="submit" className="btn">Войти</button>
          </form>
        </main>
      </>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    error: store.error,
    message: store.message,
    isLogin: store.isLogin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (formData) => dispatch(fetchLogin(formData)),
    clear: () => dispatch(clearAction())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);