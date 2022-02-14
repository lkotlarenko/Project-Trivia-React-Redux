import React, { Component } from 'react';
import logo from '../trivia.png';
import '../App.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      disabled: true,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.activateButton);
  };

  activateButton = () => {
    const { name, email } = this.state;
    if (name && email) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
  };

  render() {
    const { name, email, disabled } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
        </header>
        <form>
          <input
            data-testid="input-player-name"
            value={ name }
            type="text"
            name="name"
            onChange={ this.handleChange }
            placeholder="Username"
          />
          <input
            data-testid="input-gravatar-email"
            value={ email }
            type="email"
            name="email"
            onChange={ this.handleChange }
            placeholder="e-mail"
          />
          <button
            data-testid="btn-play"
            type="button"
            disabled={ disabled }
            onClick={ () => {} }
          >
            Play
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
