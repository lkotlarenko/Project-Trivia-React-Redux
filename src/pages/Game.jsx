import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import Header from '../components/Header';
import { receivedToken, saveAssertions, saveScore } from '../store/actions';
import fetchTokenApi from '../services/userToken';
import getScore from '../services/score';
import '../css/Game.css';

const FINAL_ANSWER = 4;
const ONE_SECOND = 1000;
const THIRTY_SECONDS = 30000;
class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      questionNumber: 0,
      answered: false,
      timer: 30,
      shuffleNeeded: true,
      shuffleAnswers: [],
      score: 0,
      assertions: 0,
    };
  }

  componentDidMount() {
    this.renderAlternatives();
  }

  renderAlternatives = async () => {
    const { token, fetchToken } = this.props;
    try {
      const dataAPI = await this.fetchQuestionsAPI(token);
      if (dataAPI.response_code !== 0) {
        fetchToken(await fetchTokenApi());
        this.renderAlternatives();
      }
      this.setState({ questions: dataAPI.results });
    } catch (error) {
      console.log(error);
    }
  };

  fetchQuestionsAPI = async (token) => {
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const JSON = await response.json();
    return JSON;
  }

  // link da função: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  shuffle = (array) => {
    let currentIndex = array.length;
    let randomIndex = 0;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }

  handleAnswer = ({ target }) => {
    this.setState({ answered: true });
    if (target.id === 'correct') {
      this.setScore();
    }
  }

  localHandler = () => {
    const { score, assertions } = this.state;
    const { saveScoreToStore, saveAssertionsToStore } = this.props;
    localStorage.setItem('actualScore', JSON.stringify(score));
    saveScoreToStore(score);
    saveAssertionsToStore(assertions);
  }

  setScore = () => {
    const { questionNumber, questions, timer } = this.state;
    const { difficulty } = questions[questionNumber];
    const newScore = getScore(timer, difficulty);
    this.setState((prevState) => ({
      score: newScore + prevState.score,
      assertions: prevState.assertions + 1,
    }),
    this.localHandler);
  }

  handleNext = () => {
    const { questionNumber, score } = this.state;
    const { history, name, email } = this.props;
    if (questionNumber < FINAL_ANSWER) {
      this.setState({
        questionNumber: questionNumber + 1,
        answered: false,
        shuffleNeeded: true,
        timer: 30,
      });
    } else if (questionNumber === FINAL_ANSWER) {
      const ranking = JSON.parse(localStorage.getItem('ranking'));
      if (ranking) {
        const gravatar = md5(email).toString();
        const newRanking = [
          ...ranking,
          { name, score, picture: `https://www.gravatar.com/avatar/${gravatar}` },
        ];
        localStorage.setItem('ranking', JSON.stringify(newRanking));
      } else {
        const gravatar = md5(email).toString();
        const newRanking = [
          { name, score, picture: `https://www.gravatar.com/avatar/${gravatar}` },
        ];
        localStorage.setItem('ranking', JSON.stringify(newRanking));
      }
      history.push('/feedback');
    }
  }

  forceClear = (timer) => {
    const { answered } = this.state;
    if (answered) {
      clearInterval(timer);
    }
  }

  roundTimer = () => {
    const roundTimer = setInterval(() => this.setState((prevState) => ({
      timer: prevState.timer - 1 }), this.forceClear(roundTimer)), ONE_SECOND);
    setTimeout(() => {
      clearInterval(roundTimer); this.setState({ answered: true });
    }, THIRTY_SECONDS);
  }

  checkShuffle = (answers) => {
    const { shuffleNeeded } = this.state;
    if (shuffleNeeded) {
      this.setState({ shuffleNeeded: false, shuffleAnswers: this.shuffle(answers) },
        this.roundTimer);
    }
  }

  render() {
    const { questions, questionNumber, answered, shuffleAnswers } = this.state;
    const nextButton = (
      <button
        onClick={ this.handleNext }
        type="button"
        data-testid="btn-next"
      >
        Next
      </button>);

    return (
      <div>
        <Header />
        <main>
          {questions && questions.map((element, index) => {
            if (questionNumber === index) {
              const answers = [
                ['correct_answer', element.correct_answer],
                ['incorrect_answer', element.incorrect_answers[0]],
                ['incorrect_answer', element.incorrect_answers[1]],
                ['incorrect_answer', element.incorrect_answers[2]],
              ];
              if (!answers[3][1]) {
                answers.pop();
                answers.pop();
              }
              this.checkShuffle(answers);
              return (
                <div key={ index }>
                  <h2 data-testid="question-category">{element.category}</h2>
                  <h2 data-testid="question-text">{element.question}</h2>
                  <div data-testid="answer-options">
                    {shuffleAnswers.map((answer, i) => (answer[0] === 'correct_answer'
                      ? (
                        <button
                          key={ i }
                          type="button"
                          data-testid="correct-answer"
                          id="correct"
                          onClick={ this.handleAnswer }
                          className={ answered ? 'correct' : null }
                          disabled={ answered }
                        >
                          {answer[1]}
                        </button>
                      ) : (
                        <button
                          key={ i }
                          type="button"
                          data-testid={ `wrong-answer-${i}` }
                          id="incorrect"
                          onClick={ this.handleAnswer }
                          className={ answered ? 'incorrect' : null }
                          disabled={ answered }
                        >
                          {answer[1]}
                        </button>
                      )))}
                    {answered && nextButton}
                  </div>
                </div>
              );
            }
            return null;
          })}
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.token,
  name: state.player.name,
  email: state.player.gravatarEmail,
});

Game.propTypes = {
  token: PropTypes.string,
  email: PropTypes.string,
  name: PropTypes.string,
  fetchToken: PropTypes.func,
  saveScoreToStore: PropTypes.func,
  saveAssertionsToStore: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  fetchToken: (token) => dispatch(receivedToken(token)),
  saveScoreToStore: (score) => dispatch(saveScore(score)),
  saveAssertionsToStore: (assertions) => dispatch(saveAssertions(assertions)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
