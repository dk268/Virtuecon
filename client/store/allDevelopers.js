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
  }
};

export default allDevelopers;
