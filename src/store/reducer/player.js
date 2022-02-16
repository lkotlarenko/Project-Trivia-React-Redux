import { PLAYER_DATA, SAVE_ASSERTIONS, SAVE_SCORE } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  error: '',
};

function player(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case PLAYER_DATA:
    return {
      ...state,
      name: payload.name,
      gravatarEmail: payload.email,
    };
  case SAVE_SCORE:
    return { ...state, score: payload };
  case SAVE_ASSERTIONS:
    return { ...state, assertions: payload };
  default:
    return state;
  }
}

export default player;
