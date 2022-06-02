import { Link } from 'react-router-dom';
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';

import { useForm } from '../../hooks/useForm';
import { setError, removeError } from '../../actions/ui';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';

export const RegisterScreen = () => {
  const dispatch = useDispatch();
  const { msgError } = useSelector((state) => state.ui);

  const [formValues, handleInputchange] = useForm({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formValues;

  const handleRegister = (e) => {
    e.preventDefault();

    if (isFormValid()) {
      dispatch(startRegisterWithEmailPasswordName(email, password, name));
    }
  };

  const isFormValid = () => {
    if (name.trim().length === 0) {
      dispatch(setError('Name is required'));
      return false;
    } else if (!validator.isEmail(email)) {
      dispatch(setError('Incorrect Email'));
      return false;
    } else if (password !== password2 || password.length < 6) {
      dispatch(
        setError('Password should be at least 6 characters and mach each other')
      );
      return false;
    }
    dispatch(removeError());
    return true;
  };

  return (
    <>
      <h3 className='auth__title'>Register</h3>
      <form
        onSubmit={handleRegister}
        className='animate__animated animate__fadeIn animate__faster'
      >
        {msgError && <div className='auth__alert-error'>{msgError}</div>}
        <input
          className='auth__input'
          type='text'
          placeholder='Name'
          name='name'
          value={name}
          autoComplete='off'
          onChange={handleInputchange}
        />

        <input
          className='auth__input'
          type='text'
          placeholder='Email'
          name='email'
          value={email}
          autoComplete='off'
          onChange={handleInputchange}
        />

        <input
          className='auth__input'
          type='password'
          placeholder='Password'
          name='password'
          value={password}
          autoComplete='off'
          onChange={handleInputchange}
        />

        <input
          className='auth__input'
          type='password'
          placeholder='Confirm password'
          name='password2'
          value={password2}
          autoComplete='off'
          onChange={handleInputchange}
        />

        <button className='btn btn-primary btn-block mb-5' type='submit'>
          Register
        </button>

        <Link to='/auth/login' className='link'>
          Already registered?
        </Link>
      </form>
    </>
  );
};
