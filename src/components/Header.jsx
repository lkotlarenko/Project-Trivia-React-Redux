import React, { Component } from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { name, score, email } = this.props;
    const gravatar = md5(email).toString();
    return (
      <header>
        <img
          src={ `https://www.gravatar.com/avatar/${gravatar}` }
          alt=""
          data-testid="header-profile-picture"
        />
        <h3 data-testid="header-player-name">{name}</h3>
        <h4 data-testid="header-score">{score}</h4>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
  email: state.player.gravatarEmail,
});

Header.propTypes = {
  name: PropTypes.string,
  score: PropTypes.number,
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, null)(Header);
