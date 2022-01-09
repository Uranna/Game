import React, { Component } from "react";
import { Link } from 'react-router-dom';

class NotFound extends Component {
  render() {
    return (
      <main className="main-content">
        <h1>404</h1>
        <Link to="/" className="btn">Вернуться на главную</Link>
      </main>
    )
  }
}

export default NotFound;