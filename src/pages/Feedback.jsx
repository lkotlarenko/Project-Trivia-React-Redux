import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends React.Component {
  handleButton = (route) => {
    const { history } = this.props;
    history.push(route);
  };

  render() {
    const { assertions, score } = this.props;
    const MIN_ASSERTIONS = 3;

    return (
      <div>
        <Header />
        <nav>
          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ () => this.handleButton('/') }
          >
            Play Again
          </button>
          <button
            type="button"
            data-testid="btn-ranking"
            onClick={ () => this.handleButton('/ranking') }
          >
            Ranking
          </button>
        </nav>
        <main>
          <h3>
            Pontuação:
          </h3>
          <h4 data-testid="feedback-total-score">{score}</h4>
          <h3>
            Acertos:
          </h3>
          <h4 data-testid="feedback-total-question">{assertions}</h4>
          {assertions < MIN_ASSERTIONS ? (
            <p data-testid="feedback-text">Could be better...</p>
          ) : (
            <p data-testid="feedback-text">Well Done!</p>
          )}
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

Feedback.propTypes = {
  assertions: PropTypes.number,
  score: PropTypes.number,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect(mapStateToProps, null)(Feedback);
