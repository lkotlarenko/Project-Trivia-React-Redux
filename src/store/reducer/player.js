import { PLAYER_DATA } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

function player(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case PLAYER_DATA:
    return {
      ...state,
      player: payload,
    };
  default:
    return state;
  }
}

export default player;
