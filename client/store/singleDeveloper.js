import Axios from 'axios';
import { LOADING, LOADED, ERROR, UNASKED, aCF } from '.';

const DIRECT_OBJECT = `DEVELOPER`;
const LOADING_DEVELOPER = `LOADING_` + DIRECT_OBJECT;
const LOADED_DEVELOPER = `LOADED_` + DIRECT_OBJECT;
const ERROR_DEVELOPER = `ERROR_` + DIRECT_OBJECT;
const EDIT_DEVELOPER = `EDIT_` + DIRECT_OBJECT;

export const getDeveloper = id => async dispatch => {
  try {
    dispatch(aCF(LOADING_DEVELOPER));
    const allDeveloper = await Axios.get(`/api/developers/${id}`);
    dispatch(aCF(LOADED_DEVELOPER, allDeveloper.data));
    return allDeveloper.data;
  } catch (e) {
    dispatch(aCF(ERROR_DEVELOPER, e));
  }
};

const initialState = { status: UNASKED, collection: {} };

const allDeveloper = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_DEVELOPER:
      return { ...state, status: LOADING };
    case LOADED_DEVELOPER:
      return { ...state, status: LOADED, collection: action.payload };
    case EDIT_DEVELOPER:
      return {
        ...state,
        status: LOADING,
        collection: action.payload,
      };
  }
};

export default allDeveloper;
