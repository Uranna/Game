import React, { Component } from "react";

class Input extends Component {
  constructor(props) {
    super(props);

    this.name = props.name;
    this.type = props.type;
    this.placeholder = props.placeholder;
    this.classes = props.classes;
  }

  handleChange(e) {
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
          className={this.classes}
          value={this.props.value}
          onClick={() => this.handleClick()}
          onChange={e => this.handleChange(e)}
        />
      </label >
    )
  }
}

Input.defaultProps = {
  type: 'text'
}


export default Input;