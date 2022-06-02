import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// import validator from 'validator';

import { startLoginEmailPassword, startGoogleLogin } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
// import { setError, removeError } from '../../actions/ui';

export const LoginScreen = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.ui);

  const [formValues, handleInputchange] = useForm({
    email: 'hola@hola.com',
    password: '123456',
  });

  const { email, password } = formValues;

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(startLoginEmailPassword(email, password));
    // if (isFormValid()) {
    //   dispatch(startLoginEmailPassword(email, password));
    // }
  };

  // const isFormValid = () => {
  //   if (!validator.isEmail(email)) {
  //     dispatch(setError('Incorrect Email'));
  //     return false;
  //   } else if (password.length < 6) {
  //     dispatch(setError('Password should be at least 6 characters'));
  //     return false;
  //   }
  //   dispatch(removeError());
  //   return true;
  // };

  const handleGoogleLogin = (e) => {
    e.preventDefault();
    dispatch(startGoogleLogin());
  };

  return (
    <>
      <h3 className='auth__title'>Login</h3>
      <form
        onSubmit={handleLogin}
        className='animate__animated animate__fadeIn animate__faster'
      >
        <input
          className='auth__input'
          type='text'
          placeholder='Email'
          name='email'
          autoComplete='off'
          value={email}
          onChange={handleInputchange}
        />

        <input
          className='auth__input'
          type='password'
          placeholder='Password'
          name='password'
          autoComplete='off'
          value={password}
          onChange={handleInputchange}
        />

        <button
          className='btn btn-primary btn-block'
          type='submit'
          disabled={loading}
        >
          Login
        </button>

        <div className='auth__social-networks'>
          <p>Login with social networks</p>

          <div className='google-btn' onClick={handleGoogleLogin}>
            <div className='google-icon-wrapper'>
              <img
                className='google-icon'
                src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
                alt='google button'
              />
            </div>
            <p className='btn-text'>
              <b>Sign in with google</b>
            </p>
          </div>
        </div>

        <Link to='/auth/register' className='link'>
          Create new account
        </Link>
      </form>
    </>
  );
};
