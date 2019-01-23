import { SET_USER, SET_CURRENT_GROUP, SET_LOADER } from "./types";
import firebase from "../config/firebase";
import md5 from "md5";

export const signup = (userData, history) => dispatch => {
  console.log(userData);
  firebase
    .auth()
    .createUserWithEmailAndPassword(userData.email, userData.password)
    .then(newUser => {
      console.log(newUser);
      newUser.user
        .updateProfile({
          displayName: userData.username,
          photoURL: `http://gravatar.com/avatar/${md5(
            userData.email
          )}?d=identicon`
        })
        .then(() => {
          firebase
            .database()
            .ref("users")
            .child(newUser.user.uid)
            .set({
              username: userData.username,
              fullname: userData.fullname,
              avatar: newUser.user.photoURL
            });
        });
    })
    .catch(error => {
      console.log(error);
    });
};

export const login = (userData, history) => dispatch => {
  console.log(userData);
};
export const setCurrentUser = (user, userData) => {
  return {
    type: SET_USER,
    payload: {
      main: user,
      misc: userData
    }
  };
};

export const setLoader = condition => {
  return {
    type: SET_LOADER,
    payload: condition
  };
}
export const setCurrentGroup = group => {
  return {
    type: SET_CURRENT_GROUP,
    payload: {
      currentGroup: group
    }
  };
};