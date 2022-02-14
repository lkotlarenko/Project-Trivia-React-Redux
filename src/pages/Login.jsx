import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logo from '../trivia.png';
import '../App.css';
import { fetchAPI } from '../store/actions';

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

  handleClick = () => {
    const { fetchToken, history } = this.props;
    fetchToken(this.state);
    history.push('/game');
  }

  handleSettingsButton = () => {
    const { history } = this.props;
    history.push('/settings');
  }

  render() {
    const { name, email, disabled } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ this.handleSettingsButton }
          >
            Configurações
          </button>
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
            onClick={ this.handleClick }
          >
            Play
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  fetchToken: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  fetchToken: (state) => dispatch(fetchAPI(state)),
});

export default connect(null, mapDispatchToProps)(Login);
