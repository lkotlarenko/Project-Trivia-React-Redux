import { RECEIVED_TOKEN } from '../actions';

const Token = 'seila';
const INITIAL_STATE = Token;

function token(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case RECEIVED_TOKEN:
    return payload;
  default:
    return state;
  }
}

export default token;
