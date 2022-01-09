import React, { Component } from "react";
import { Navigate } from "react-router-dom";

import { connect } from 'react-redux';
import { fetchGame } from '../store/async';
import { clearAction, timerAction } from '../store/reducer';

import Input from './input';


class Game extends Component {
  constructor(props) {
    super(props);
    this.state = { answer: '' }
    this.changeValue = this.changeValue.bind(this);
  }

  selectAnswer(answer) {
    this.props.setAnswer({ ...this.props.request, answer: answer })
  }

  submit(e) {
    e.preventDefault()
    this.props.setAnswer({ ...this.props.request, answer: this.state.answer });
    this.setState({ answer: '' })
  }

  changeValue(target) {
    this.setState({ ...this.state, [target.name]: (target.value) })
  }

  isWork = false;
  timer;

  testTimer() {
    if (this.isWork) {
      this.isWork = false
      clearInterval(this.timer);
    }
  }

  componentDidMount() {
    if (!this.inWork) {
      this.isWork = true
      this.timer = setInterval(() => {
        if (this.props.timer > 0) {
          this.props.tick()
        }
        else {
          this.testTimer();
        }
      }, 1000);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.question !== this.props.question) {
      this.testTimer();
      this.componentDidMount();
    }
  }

  componentWillUnmount() {
    this.testTimer();
  }


  render() {
    return (
      <main className="main-content">
        {(this.props.isLogin ? null : <Navigate to='/login' from='/game' />)}
        {(this.props.type !== 2 ? <Navigate to='/start' from='/game' /> : null)}
        {(!this.props.question ? <Navigate to='/result' from='/game' /> : null)}

        <div className="game">
          <h2 className="game__question">{this.props.question}</h2>
          <p className="game__timer">Оставшееся время: {this.props.timer}</p>
          {(this.props.options.length !== 0)
            ? (
              <div className="game__box-answers">
                {this.props.options.map(option => {
                  return <button className="btn" key={option} onClick={() => this.selectAnswer(option)} >{option}</button>
                })}
              </div>
            )
            : (
              <form action="/" onSubmit={(e) => this.submit(e)}>
                <Input name="answer" placeholder="Введите ответ" classes="" value={this.state.answer} change={this.changeValue} />
                <button type="submit" className="btn">Отправить</button>
              </form>
            )
          }

        </div>

      </main>
    )
  }
}


const mapStateToProps = (store) => {
  return {
    isLogin: store.isLogin,
    type: store.request.type,
    request: store.request,
    question: store.response?.data?.question,
    timer: store.response?.data?.time,
    options: store.response?.data?.options || []
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setAnswer: (data) => dispatch(fetchGame(data)),
    clear: () => dispatch(clearAction()),
    tick: () => dispatch(timerAction())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);