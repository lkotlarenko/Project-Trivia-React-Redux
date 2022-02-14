import fetchTokenApi from '../../services/userToken';

export const PLAYER_DATA = 'PLAYER_DATA';
export const saveDataPlayer = (payload) => ({ type: PLAYER_DATA, payload });
export const RESPONSE_API = 'RESPONSE_API';

export const FAILED_REQUEST = 'FAILED_REQUEST';
function responseAPI(state) {
  return { type: RESPONSE_API, payload: state };
}
function failedRequest(error) {
  return { type: FAILED_REQUEST, payload: error };
}

export function fetchAPI(state) {
  return async (dispatch) => {
    try {
      const response = fetchTokenApi();
      state.API = response;
      dispatch(responseAPI({ state }));
    } catch (error) {
      dispatch(failedRequest(error));
    }
  };
}

export const fetchToken = (payload) => ({
  type: RESPONSE_API, payload,
});
