import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';

class Ranking extends Component {
  constructor() {
    super();

    this.state = {
      ranking: [],
    };
  }

  componentDidMount() {
    this.renderRanking();
  }

  handleButton = (route) => {
    const { history } = this.props;
    history.push(route);
  };

  renderRanking = () => {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const rankingDecree = ranking.sort((a, b) => (b.score - a.score));
    this.setState({ ranking: rankingDecree });
  }

  render() {
    const { ranking } = this.state;
    return (
      <div>
        <h1 data-testid="ranking-title">RANKING PAGE</h1>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => this.handleButton('/') }
        >
          Inicio
        </button>
        {ranking && ranking.map((element, index) => (
          <div key={ element.name }>
            <p data-testid={ `player-name-${index}` }>{element.name}</p>
            <img src={ element.picture } alt={ element.name } />
            <p data-testid={ `player-score-${index}` }>{element.score}</p>
          </div>
        ))}
      </div>
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
