import { PROFILE_UPDATE_SUCCESS, PROFILE_UPDATE_FAILED, REPORT_USER_SUCCESS, REPORT_USER_FAILED } from '../constants';

const initialState = {
  
};

const settingsReducer = (state = initialState, action) => {

  //Destructure 'action'
  const { type, payload } = action; 

  switch (type) {
    case PROFILE_UPDATE_SUCCESS:
      console.log("profile update success");
      return { ...state, payload };

    case PROFILE_UPDATE_FAILED:
      console.log("profile update failed");
      return { ...state, payload };

    case REPORT_USER_SUCCESS:
      console.log("reported user success");
      return { ...state, payload };

    case REPORT_USER_FAILED:
      console.log("report user failed");
      return { ...state, payload };

    default:
      return state;
  }
};

export default settingsReducer;
