import React, { Component } from "react";
import { connect } from 'react-redux';
import { updateAction } from "../store/reducer";

class Input extends Component {
  constructor(props) {
    super(props);

    this.name = props.name;
    this.type = props.type;
    this.placeholder = props.placeholder;
    this.classes = props.classes;
  }

  handleClick() {
    if (this.props.error !== '') {
      this.props.updateMessage(this.name)
    }
  }

  handleChange(e) {
    console.log()
    this.props.change(e.target)
  }

  render() {
    return (
      <label htmlFor={this.name}>
        <input
          id={this.name}
          type={this.type}
          name={this.name}
          placeholder={this.placeholder}
          className={`${this.classes} ${this.props.error ? 'input--error' : ''}`}
          value={this.props.value}
          onClick={() => this.handleClick()}
          onChange={e => this.handleChange(e)}
        />
        <p className="form__message--error">{this.props.error}</p>
      </label >
    )
  }
}

Input.defaultProps = {
  type: 'text'
}

const mapStateToProps = (store, ownProps) => {
  return {
    error: store.error[ownProps.name] || '',
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateMessage: (name) => dispatch(updateAction(name))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Input);