import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import { connect } from 'react-redux';
import { clearAction } from "../store/reducer";

class Result extends Component {

  handleClick() {
    this.props.clear()
  }

  render() {
    return (
      <main className="main-content result">
        {(this.props.isLogin ? null : <Navigate to='/login' from='/result' />)}
        {(this.props.type === 1) ? <Navigate to='/start' from='/result' /> : null}
        <h2 className="result__title">Вы набрали <span className="result__points">{this.props.points}</span> очков</h2>

        <table className="result__table">
          <thead className="result__header-table">
            <tr>
              <th>Question</th>
              <th>Answer</th>
              <th>Current</th>
            </tr>
          </thead>
          <tbody>
            {this.props.questions.map(question => {
              return (
                <tr key={question.id} className={`result__tr ${question.answer !== question.current_answer ? 'result__tr--error' : ''}`}>
                  <td>{question.question}</td>
                  <td>{question.answer}</td>
                  <td>{question.current_answer}</td>
                </tr>
              )
            })}
          </tbody>
        </table>

        <button className="btn" onClick={() => this.handleClick()}>Новая игра</button>
      </main>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    isLogin: store.isLogin,
    type: store.request.type,
    points: store.response?.data?.points,
    questions: store.response?.data?.questions || []
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clear: () => dispatch(clearAction())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Result);