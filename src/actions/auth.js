import Swal from 'sweetalert2';
import { types } from '../types/types';
import {
  getAuth,
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { googleAuthProvider } from '../firebase/firebase-config';
import { finishLoading, startLoading } from './ui';
import { noteLogout } from '../actions/notes';

const auth = getAuth();

export const startLoginEmailPassword = (email, password) => {
  return (dispatch) => {
    dispatch(startLoading());

    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        if (!user?.uid) {
          dispatch(login(user.uid, user.displayName));
        }
        dispatch(finishLoading());
      })
      .catch((e) => {
        dispatch(finishLoading());

        if (e.code === 'auth/user-not-found') {
          Swal.fire('Login Error', 'User not found', 'error');
        } else if (e.code === 'auth/wrong-password') {
          Swal.fire('Login Error', 'Wrong password, try another one', 'error');
        } else if (e.code === 'auth/invalid-email') {
          Swal.fire('Login Error', 'Invalid email', 'error');
        } else if (e.code === 'auth/internal-error') {
          Swal.fire('Login Error', 'Wrong email or password', 'error');
        }
      });
  };
};

export const startRegisterWithEmailPasswordName = (email, password, name) => {
  return (dispatch) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async ({ user }) => {
        await updateProfile(auth.currentUser, { displayName: name });
        if (!user?.uid) {
          dispatch(login(user.uid, user.displayName));
        }
      })
      .catch((e) => {
        if (e.code === 'auth/email-already-in-use') {
          Swal.fire('Register Error', 'Email already in use', 'error');
        }
      });
  };
};

export const startGoogleLogin = () => {
  return (dispatch) => {
    signInWithPopup(auth, googleAuthProvider).then(({ user }) => {
      if (!user?.uid) {
        dispatch(login(user.uid, user.displayName));
      }
    });
  };
};

export const login = (uid, displayName) => ({
  type: types.login,
  payload: {
    uid,
    displayName,
  },
});

export const startLogout = () => {
  return async (dispatch) => {
    await signOut(auth);
    dispatch(logout());
    dispatch(noteLogout());
  };
};

export const logout = () => ({
  type: types.logout,
});
