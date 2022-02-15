import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { fetchAPI, fetchToken } from '../store/actions';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      questionNumber: 0,
    };
  }

  componentDidMount() {
    this.renderAlternatives();
  }

  // cria função async que pega as perguntas e respostas da API
  renderAlternatives = async () => {
    const { token, fetchNewToken } = this.props;
    try {
      /* const GET = await fetch(
        'https://opentdb.com/api_token.php?command=request',
        );
        console.log(GET); */
      console.log(token);
      let dataAPI = await this.fetchAPI(token);
      if (dataAPI.response_code !== 0) {
        console.log('entrou no if');
        fetchNewToken(this.state);
        console.log(token);
        dataAPI = this.fetchAPI(token);
      }
      this.setState({ questions: dataAPI.results });
    } catch (error) {
      console.log(error);
    }
  };

  fetchAPI = async (token) => {
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

  render() {
    const { questions, questionNumber } = this.state;
    return (
      <div>
        <Header />
        <main>
          {questions.map((element, index) => {
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
              const shuffleAnswers = this.shuffle(answers);
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
                        >
                          {answer[1]}
                        </button>
                      ) : (
                        <button
                          type="button"
                          data-testid={ `wrong-answer-${i}` }
                          key={ i }
                        >
                          {answer[1]}
                        </button>
                      )))}
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
});

Game.propTypes = {
  token: PropTypes.string,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  fetchToken: (state) => dispatch(fetchAPI(state)),
  fetchNewToken: (state) => dispatch(fetchToken(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
