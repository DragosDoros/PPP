import * as TYPES from "../types/types";

const mainReducer = (state = [], action) => {
  switch (action.type) {
    case TYPES.CHANGE_LOAD:
      return {
        ...state,
        ...action.payload,
      };
    case TYPES.USER_DATA_CHANGE:
      return {
        ...state,
        auth: {
          ...state.auth,
          userId: action.payload._id,
          userName: action.payload.name,
          userEmail: action.payload.email,
        },
        info: {
          ...state.info,
          age: action.payload.age,
          gender: action.payload.gender,
          weight: action.payload.weight,
          height: action.payload.height,
          activity: action.payload.activity,
          bmi: action.payload.bmi,
          Proteins: action.payload.Proteins,
          carbohydrates: action.payload.carbohydrates,
          fats: action.payload.fats,
          kcal: action.payload.kcal,
          targetWeight: action.payload.targetWeight,
        },
      };
    case TYPES.CHANGE_OPTIONS:
      return {
        ...state,
        food: { ...state.food, options: action.payload },
      };
    case TYPES.ADD_MEAL:
      return {
        ...state,
        food: { ...state.food, meals: [...state.food.meals, action.payload] },
      };
    case TYPES.DELETE_MEAL:
      return {
        ...state,
        food: {
          ...state.food,
          meals: state.food.meals.filter((el) => el.date !== action.payload),
        },
      };
    case TYPES.SET_WEEK:
      return {
        ...state,
        week: action.payload,
      };
    case TYPES.SIGN_IN:
      return {
        ...state,
        auth: {
          ...state.auth,
          isSignedIn: true,
          userName: action.payload.userName,
          userId: action.payload.userId,
          userEmail: action.payload.userEmail,
        },
      };
    case TYPES.GET_GGLID:
      return {
        ...state,
        auth: {
          ...state.auth,
          userId: action.payload.userId,
        },
      };
    case TYPES.SIGN_OUT:
      return {
        ...state,
        auth: {
          ...state.auth,
          userName: null,
          userEmail: null,
          isSignedIn: false,
          userId: null,
          userProfileImg: {},
        },
      };
    case TYPES.ADD_INFO:
      return {
        ...state,
        auth: {
          ...state.auth,
          isSignedIn: true,
          userName: action.payload.userName,
          userEmail: action.payload.userEmail,
          userId: action.payload.userId,
        },
      };
    case TYPES.DEFAULT_SIGNIN:
      return {
        ...state,
        auth: {
          userName: action.payload.userName,
          userEmail: action.payload.userEmail,
        },
      };
    case TYPES.PIC_UPLOAD:
      return {
        ...state,
        auth: { ...state.auth, userProfileImg: action.payload },
      };
    case TYPES.SCANN_UPLOAD:
      return {
        ...state,
        food: {
          ...state.food,
          scannedImg: action.payload,
        },
      };

    default:
      return state;
  }
};

export default mainReducer;

export const signIn = (userId) => {
  return {
    type: TYPES.SIGN_IN,
    payload: userId,
  };
};

export const googleId = (userId) => {
  return {
    type: TYPES.GET_GGLID,
    payload: userId,
  };
};

export const signOut = () => {
  return {
    type: TYPES.SIGN_OUT,
  };
};

export const addInfo = (userInfo) => {
  return {
    type: TYPES.ADD_INFO,
    payload: userInfo,
  };
};

export const defaultSignIn = (userInfo) => {
  return {
    type: TYPES.DEFAULT_SIGNIN,
    payload: userInfo,
  };
};
