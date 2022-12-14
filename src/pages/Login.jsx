import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logo from '../trivia.png';
import '../App.css';
import { receivedToken, saveDataPlayer } from '../store/actions';
import fetchTokenApi from '../services/userToken';

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

  handleClick = async () => {
    const { fetchToken, history, saveData } = this.props;
    const { name, email } = this.state;
    fetchToken(await fetchTokenApi());
    saveData({ name, email });
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
  fetchToken: PropTypes.func,
  saveData: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  fetchToken: (token) => dispatch(receivedToken(token)),
  saveData: (state) => dispatch(saveDataPlayer(state)),
});

export default connect(null, mapDispatchToProps)(Login);
