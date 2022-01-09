import React, { Component } from 'react';
import { Link, Navigate } from "react-router-dom";
import Input from './input';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = { email: '', password: '' }
    this.changeValue = this.changeValue.bind(this);
  }

  submit(e) {
    e.preventDefault()
  }

  changeValue(target) {
    this.setState({ ...this.state, [target.name]: target.value })
  }

  render() {
    return (
      <>
        <nav className="nav nav--left">
          <h2 className="nav__item nav__item--active">Войти</h2>
          <Link to="/signup"><h2 className="nav__item">Регистрация</h2></Link>
        </nav>
        <main className='main-content'>
          <form action="/" method="get" onSubmit={e => this.submit(e)}>
            <Input name="email" placeholder="Email" classes="" value={this.state.email} change={this.changeValue} />
            <Input type="password" name="password" placeholder="Пароль" classes="" value={this.state.password} change={this.changeValue} />
            <button type="submit" className="btn">Войти</button>
          </form>
        </main>
      </>
    )
  }
}


export default Login;
