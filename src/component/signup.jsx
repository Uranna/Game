import React, { Component } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from 'react-redux';
import { clearAction } from "../store/reducer";
import { fetchSignup } from "../store/async";
import Input from "./input";

class Signup extends Component {

  constructor(props) {
    super(props);
    this.state = { email: "", name: '', password: '', password_confirmation: '' }
    this.changeValue = this.changeValue.bind(this);
  }

  componentDidMount() {
    this.props.clear()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.message !== this.props.message) {
      this.setState({ email: "", name: '', password: '', password_confirmation: '' })
    }
  }

  submitForm(e) {
    e.preventDefault()
    this.props.signup({ ...this.state });

  }

  changeValue(target) {
    this.setState({ ...this.state, [target.name]: target.value })
  }


  render() {
    return (
      <>
        {(this.props.isLogin) ? <Navigate to="/start" from="/signup" /> : null}
        <nav className="nav nav--right">
          <Link to="/login">
            <h2 className="nav__item">Войти</h2>
          </Link>
          <h2 className="nav__item nav__item--active">Регистрация</h2>
        </nav>
        <main className='main-content'>
          <form action="/" method="get" onSubmit={e => this.submitForm(e)}>
            <Input name="name" placeholder="Имя пользователя" classes="" value={this.state.name} change={this.changeValue} />
            <Input name="email" placeholder="Email" classes="" value={this.state.email} change={this.changeValue} />
            <Input type="password" name="password" placeholder="Пароль" classes="" value={this.state.password} change={this.changeValue} />
            <Input type="password" name="password_confirmation" placeholder="Повторите пароль" classes="" value={this.state.password_confirmation} change={this.changeValue} />

            <p>{this.props.message}</p>
            <button type="submit" className="btn">Зарегистрироваться</button>
          </form>
        </main>

      </>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    isLogin: store.isLogin,
    message: store.message
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signup: formData => dispatch(fetchSignup(formData)),
    clear: () => dispatch(clearAction())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);