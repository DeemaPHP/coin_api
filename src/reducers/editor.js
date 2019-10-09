import {
  EDITOR_PAGE_LOADED,
  EDITOR_PAGE_UNLOADED,
  CRYPTOCURRENCY_SUBMITTED,
  ASYNC_START,
  ADD_TAG,
  REMOVE_TAG,
  UPDATE_FIELD_EDITOR
} from "../constants/actionTypes";

export default (state = {}, action) => {
  switch (action.type) {
    case EDITOR_PAGE_LOADED:
      return {
        ...state,
        cryptocurrencySlug: action.payload
          ? action.payload.cryptocurrency.slug
          : "",
        title: action.payload ? action.payload.cryptocurrency.title : "",
        description: action.payload
          ? action.payload.cryptocurrency.description
          : "",
        body: action.payload ? action.payload.cryptocurrency.body : "",
        tagInput: "",
        tagList: action.payload ? action.payload.cryptocurrency.tagList : []
      };
    case EDITOR_PAGE_UNLOADED:
      return {};
    case CRYPTOCURRENCY_SUBMITTED:
      return {
        ...state,
        inProgress: null,
        errors: action.error ? action.payload.errors : null
      };
    case ASYNC_START:
      if (action.subtype === CRYPTOCURRENCY_SUBMITTED) {
        return { ...state, inProgress: true };
      }
      break;
    case ADD_TAG:
      return {
        ...state,
        tagList: state.tagList.concat([state.tagInput]),
        tagInput: ""
      };
    case REMOVE_TAG:
      return {
        ...state,
        tagList: state.tagList.filter(tag => tag !== action.tag)
      };
    case UPDATE_FIELD_EDITOR:
      return { ...state, [action.key]: action.value };
    default:
      return state;
  }

  return state;
};
