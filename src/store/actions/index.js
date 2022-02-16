export const PLAYER_DATA = 'PLAYER_DATA';

export const saveDataPlayer = (payload) => ({ type: PLAYER_DATA, payload });

export const RECEIVED_TOKEN = 'RECEIVED_TOKEN';

export const receivedToken = (payload) => ({ type: RECEIVED_TOKEN, payload });

export const SAVE_SCORE = 'SAVE_SCORE';

export const saveScore = (payload) => ({ type: SAVE_SCORE, payload });

export const SAVE_ASSERTIONS = 'SAVE_ASSERTIONS';

export const saveAssertions = (payload) => ({ type: SAVE_ASSERTIONS, payload });
