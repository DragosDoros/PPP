import { loadState } from "./actionCreators/localStorage";

const initState = {
  info: {
    age: "",
    gender: "",
    weight: "",
    height: "",
    activity: "",
    bmi: "",
    targetWeight: null,
    kcal: null,
    Proteins: null,
    carbohydrates: null,
    fats: null,
  },
  food: {
    options: [],
    meals: [],
  },
  auth: 
  loadState(),
  // {
  //   isSignedIn: false, // false
  //   userId: null,
  //   userName: null,
  //   userEmail: null,
  //   userProfileImg: {},
  // },
  week: [],
};

export default initState;
