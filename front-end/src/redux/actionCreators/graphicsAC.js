import * as TYPES from "../types/types";
import * as AuthorizationAction from "../reducers/MAIN"; 


const getUsersThunk = () => async (dispatch, getState) => {
  const requestUsers = await fetch("http://localhost:3000/logger");
  const respondUsers = await requestUsers.json();
  dispatch(getUsers(respondUsers));
};

function getUsers(users) {
  return {
    type: TYPES.GET_USERS,
    payload: users,
  };
}

const signUpCheck = ({email, password, name}) => async (dispatch, getState) => {
  const requestUsers = await fetch(
    `http://localhost:3000/user/signupcheck`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password, 
        name: name, 
        // id: userId
      }),
    }
  );
  const response = await requestUsers.status()
  if (response === 200) {
    dispatch(
      AuthorizationAction.addInfo({
        userName: name,
        userEmail: email,
        // userId: Date.now(),
      }))
  } else (window.alert('This email is already used'))
}

const getGrapForOneDay = () => async (dispatch, getState) => {
  const requestGraf = await fetch("http://localhost:3000/logger");
  const respondGraf = await requestGraf.json();
  console.log(respondGraf, "<---------------respondGraf");
  dispatch(getGrap(respondGraf));
};
function getGrap(grap) {
  console.log(grap, "<--------usergraps");
  return {
    type: TYPES.GET_GRAP,
    payload: grap,
  };
}

export { getUsersThunk, getGrapForOneDay };

//add target to back
export const addTarget =
  ({ targetWeight, userId }) =>
  async (dispatch) => {
    const targetProteins = targetWeight * 4 * 1.5;
    const targetCarbs = targetWeight * 9;
    const targetFats = targetWeight * 4 * 1.5;
    const targetKcal = targetProteins + targetCarbs + targetFats;

    const sendTarget = await fetch(
      `http://localhost:3000/macroData/${userId}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Proteins: targetProteins,
          carbohydrates: targetCarbs,
          fats: targetFats,
          kcal: targetKcal,
          targetWeigth: targetWeight,
        }),
      }
    );
    const receiveTarget = await sendTarget.status;

    dispatch(
      addMacroInfo({
        targetKcal,
        targetFats,
        targetCarbs,
        targetProteins,
        targetWeight: targetWeight,
      })
    );
  };

//add target action
export const addMacroInfo = (props) => {
  return {
    type: TYPES.ADD_TARGET_INFO,
    payload: props,
  };
};

//show db stats after logging
export const profileUpdate = (firstDataAfterLogin) => (dispatch) => {
  dispatch(initialProfileDataUpdate(firstDataAfterLogin));
};
export const initialProfileDataUpdate = (props) => {
  return {
    type: TYPES.INITIAL_UPDATE,
    payload: props,
  };
};

// update user details
export const personalInfoHandler =
  ({ age, gender, weight, height, activity, id, bmi, targetWeight }) =>
  async (dispatch, getState) => {
    const Proteins = targetWeight * 4 * 1.5;
    const carbohydrates = targetWeight * 9;
    const fats = targetWeight * 4 * 1.5;
    const kcal = Proteins + carbohydrates + fats;

    const data = {
      age,
      gender,
      weight,
      height,
      activity,
      bmi,
      Proteins,
      carbohydrates,
      fats,
      kcal,
      targetWeight,
    };

    const response = await fetch(`http://localhost:3000/profileData/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const dbData = await response.json();

    dispatch(newUserData(dbData));
  };

//update user action
export const newUserData = (data) => {
  return {
    type: TYPES.USER_DATA_CHANGE,
    payload: data,
  };
};

//upload Img
export const uploadImg =
  ({ img, id }) =>
  async (dispatch) => {
    const response = await fetch(`http://localhost:3000/profileImg/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(img),
    });
    const dbImg = await response.json();
    console.log(dbImg);
    dispatch(uploadNewPic(img));
  };

//upload img action
export const uploadNewPic = (data) => {
  return {
    type: TYPES.PIC_UPLOAD,
    payload: data,
  };
};
