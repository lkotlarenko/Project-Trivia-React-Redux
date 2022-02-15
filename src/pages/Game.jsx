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
    };
  }

  componentDidMount() {
    this.renderAlternatives();
  }

  // cria função async que pega as perguntas e respostas da API
  renderAlternatives = async () => {
    const { token } = this.props;
    if (!token) {
      fetchToken(this.state);
    }
    try {
      /* const GET = await fetch(
        'https://opentdb.com/api_token.php?command=request',
        );
        console.log(GET); */
      const response = await fetch(
        `https://opentdb.com/api.php?amount=5&token=${token}`,
      );
      const JSON = await response.json();
      if (JSON.response_code === 0) {
        this.setState({ questions: JSON.results });
      } else {
        fetchToken(this.state);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
    const { questions } = this.state;
    return (
      <did>
        <Header />
        <main>
          {questions.map((element, index) => {
            const answers = [
              ['correct_answer', element.correct_answer],
              ['incorrect_answer', element.incorrect_answers[0]],
              ['incorrect_answer', element.incorrect_answers[1]],
              ['incorrect_answer', element.incorrect_answers[2]],
            ];
            const shuffleAnswers = this.shuffle(answers);
            return (
              <div key={ index }>
                <h2 data-testid="question-category">{element.category}</h2>
                <h2 data-testid="question-text">{element.question}</h2>
                <div data-testid="answer-options">
                  {shuffleAnswers.map((value, newPosition) => (
                    <button type="button" data-testid="correct-answer"
                  ));
                  {/* <button type="button" data-testid="correct-answer">
                    {element.correct_answer}
                  </button>
                  {element.incorrect_answers.map((value, position) => (
                    <button
                      type="button"
                      data-testid={ `wrong-answer-${position}` }
                      key={ position }
                    >
                      {value}
                    </button> */}
                  ))};
                </div>
              </div>);
          })}
        </main>
      </did>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
