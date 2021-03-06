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
    const singleDeveloper = await Axios.get(`/api/developers/${id}`);
    dispatch(aCF(LOADED_DEVELOPER, singleDeveloper.data));
    return singleDeveloper.data;
  } catch (e) {
    dispatch(aCF(ERROR_DEVELOPER, e));
  }
};

export const editDeveloper = developerData => async dispatch => {
  try {
    dispatch(aCF(EDIT_DEVELOPER, developerData));
    const editedDeveloper = await Axios.put(
      `/api/developers/${developerData.id}`,
      developerData
    );
    dispatch(aCF(LOADED_DEVELOPER, editedDeveloper.data));
    return editedDeveloper.data;
  } catch (e) {
    dispatch(aCF(ERROR_DEVELOPER, e));
  }
};

const initialState = { status: UNASKED, collection: {} };

const singleDeveloper = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_DEVELOPER:
      return { ...state, status: LOADING };
    case LOADED_DEVELOPER:
      return { ...state, status: LOADED, collection: action.payload };
    case EDIT_DEVELOPER:
      return {
        ...state,
        status: LOADING,
        collection: { ...state.collection, ...action.payload },
      };
    case ERROR_DEVELOPER:
      return { ...state, status: ERROR };
    default:
      return state;
  }
};

export default singleDeveloper;
