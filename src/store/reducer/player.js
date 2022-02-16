import { PLAYER_DATA } from '../actions';

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
  // case FAILED_REQUEST:
  //   return {
  //     ...state,
  //     error: payload,
  //   };
  default:
    return state;
  }
}

export default player;
