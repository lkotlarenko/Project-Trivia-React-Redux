export const PLAYER_DATA = 'PLAYER_DATA';

export const saveDataPlayer = (payload) => ({ type: PLAYER_DATA, payload });

export const RECEIVED_TOKEN = 'RECEIVED_TOKEN';

export const receivedToken = (payload) => ({ type: RECEIVED_TOKEN, payload });

export const FAILED_REQUEST = 'FAILED_REQUEST';
