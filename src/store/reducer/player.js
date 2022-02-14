import { FAILED_REQUEST, PLAYER_DATA, RESPONSE_API } from '../actions';

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
      player: payload,
    };
  case RESPONSE_API:
    return {
      ...state,
      token: payload.token,
    };
  case FAILED_REQUEST:
    return {
      ...state,
      error: payload,
    };
  default:
    return state;
  }
}

export default player;
