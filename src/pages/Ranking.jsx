import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';

class Ranking extends Component {
  handleButton = (route) => {
    const { history } = this.props;
    history.push(route);
  };

  render() {
    return (
      <>
        <h1 data-testid="ranking-title">RANKING PAGE</h1>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => this.handleButton('/') }
        >
          Inicio
        </button>
      </>
    );
  }
}

// const mapStateToProps = (state) => ({
//   name: state.player.name,
//   score: state.player.score,
//   email: state.player.gravatarEmail,
// });

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Ranking;
