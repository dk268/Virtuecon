import Axios from 'axios';
import { LOADING, LOADED, ERROR, UNASKED, aCF } from '.';

const DIRECT_OBJECT = `DEVELOPERS`;
const LOADING_DEVELOPERS = `LOADING_` + DIRECT_OBJECT;
const LOADED_DEVELOPERS = `LOADED_` + DIRECT_OBJECT;
const ERROR_DEVELOPERS = `ERROR_` + DIRECT_OBJECT;
const ADD_DEVELOPER = `ADD_` + DIRECT_OBJECT;
const DELETE_DEVELOPER = `DELETE_` + DIRECT_OBJECT;

export const getDevelopers = () => async dispatch => {
  try {
    dispatch(aCF(LOADING_DEVELOPERS));
    const allDevelopers = await Axios.get(`/api/developers`);
    dispatch(aCF(LOADED_DEVELOPERS, allDevelopers.data));
    return allDevelopers.data;
  } catch (e) {
    dispatch(aCF(ERROR_DEVELOPERS, e));
  }
};

export const addDeveloper = developer => async dispatch => {
  try {
    dispatch(aCF(LOADING_DEVELOPERS));
    const newDeveloper = await Axios.post(`/api/developers`, developer);
    dispatch(aCF(ADD_DEVELOPER, newDeveloper));
    // RELOAD?
    const allDevelopers = await Axios.get(`/api/developers`);
    dispatch(aCF(LOADED_DEVELOPERS, allDevelopers.data));
    return allDevelopers.data;
  } catch (e) {
    dispatch(aCF(ERROR_DEVELOPERS, e));
  }
};

export const deleteDeveloper = id => async dispatch => {
  try {
    dispatch(aCF(LOADING_DEVELOPERS));
    dispatch(aCF(DELETE_DEVELOPER, id));
    const remainingDevelopers = await Axios.delete(`/api/developers/${id}`);
    // RELOAD?
    dispatch(aCF(LOADED_DEVELOPERS, remainingDevelopers.data));
    return remainingDevelopers.data;
  } catch (e) {
    dispatch(aCF(ERROR_DEVELOPERS, e));
  }
};

const initialState = { status: UNASKED, collection: [] };

const allDevelopers = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_DEVELOPERS:
      return { ...state, status: LOADING };
    case LOADED_DEVELOPERS:
      return { ...state, status: LOADED, collection: action.payload };
    case ADD_DEVELOPER:
      return {
        ...state,
        status: LOADING,
        collection: [...state.collection, action.payload],
      };
    case DELETE_DEVELOPER:
      return {
        ...state,
        status: LOADING,
        collection: state.collection.filter(
          developer => developer.id != action.payload.id
        ),
      };
    case ERROR_DEVELOPERS:
      return { ...state, status: ERROR };
    default:
      return state;
  }
};

export default allDevelopers;
