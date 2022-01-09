import React, { Component } from "react";
import { Link, Navigate } from "react-router-dom";
import Input from "./input";

class Signup extends Component {

  constructor(props) {
    super(props);
    this.state = { email: "", name: '', password: '', password_confirmation: '' }
    this.changeValue = this.changeValue.bind(this);
  }

  submitForm(e) {
    e.preventDefault()
  }

  changeValue(target) {
    this.setState({ ...this.state, [target.name]: target.value })
  }


  render() {
    return (
      <>
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

            <button type="submit" className="btn">Зарегистрироваться</button>
          </form>
        </main>

      </>
    )
  }
}


export default Signup;