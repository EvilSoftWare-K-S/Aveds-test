import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { LoginFormData } from '../types/authType';
import './LoginForm.scss';
import { useLoginMutation } from '../model/authApi';
import { Button } from '@shared/ui/button';
import { isErrorMessage, isFetchBaseQueryError } from '@shared/utils/type-guard';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@shared/routes/routes';
import { useDispatch } from 'react-redux';
import { closeModal } from '@app/providers/model/ModalProvider';
import { setTokens, setTokensNotRemember } from '../model/tokenSlice';
import { Loading } from '@shared/ui/loading/loading';

export const LoginForm = (): JSX.Element => {
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading, error }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<LoginFormData>({
    mode: 'onChange',
    defaultValues: {
      login: '',
      password: '',
      rememberMe: false,
    },
  });

  const watchLogin = watch('login', '');
  const watchPassword = watch('password', '');

  const dispatch = useDispatch();
  const handlerOnClose = () => {
    dispatch(closeModal());
  };

  const navigate = useNavigate();
  const handleGoToProfile = () => {
    navigate(PATHS.profile);
  };
  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await login({
        login: data.login,
        password: data.password,
      }).unwrap();
      if (response.success) {
        if (data.rememberMe && response.tokens) {
          dispatch(setTokens(response.tokens));
        }
        else if(response.tokens) {
          dispatch(setTokensNotRemember(response.tokens));
        }
        handleGoToProfile();
        handlerOnClose();
      }
    } catch {
      /* empty */
    }
  };

  return (
    <form className='login-form' onSubmit={handleSubmit(onSubmit)}>
      <div className='form-group'>
        <label htmlFor='login' className='form-label'>
          Логин
        </label>
        <input
          id='login'
          type='text'
          className={`form-input ${errors.login ? 'error' : ''}`}
          placeholder='Введите логин'
          {...register('login', {
            required: 'Логин обязателен для заполнения',
            minLength: {
              value: 3,
              message: 'Логин должен содержать минимум 3 символа',
            },
            maxLength: {
              value: 20,
              message: 'Логин должен содержать максимум 20 символов',
            },
            pattern: {
              value: /^[a-zA-Z0-9_@.-]+$/,
              message: 'Логин может содержать только буквы, цифры, дефис и подчеркивание',
            },
          })}
        />
        {errors.login && <span className='error-message'>{errors.login.message}</span>}
        <span className='char-counter'>{watchLogin.length}/20 символов</span>
      </div>

      <div className='form-group'>
        <label htmlFor='password' className='form-label'>
          Пароль
        </label>
        <div className='password-wrapper'>
          <input
            id='password'
            type={showPassword ? 'text' : 'password'}
            className={`form-input password-input ${errors.password ? 'error' : ''}`}
            placeholder='Введите пароль'
            {...register('password', {
              required: 'Пароль обязателен для заполнения',
              minLength: {
                value: 6,
                message: 'Пароль должен содержать минимум 8 символов',
              },
              maxLength: {
                value: 30,
                message: 'Пароль должен содержать максимум 30 символов',
              },
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&_-]{6,}$/,
                message: 'Пароль должен содержать хотя бы одну букву и одну цифру',
              },
            })}
          />
          <button
            type='button'
            className='password-toggle'
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? '👁️' : '👁️‍🗨️'}
          </button>
        </div>
        {errors.password && <span className='error-message'>{errors.password.message}</span>}
        <span className='char-counter'>{watchPassword.length}/30 символов</span>
      </div>

      <div className='form-group checkbox-group'>
        <label className='checkbox-label'>
          <input type='checkbox' {...register('rememberMe')} className='checkbox-input' />
          <span className='checkbox-text'>Запомнить меня</span>
        </label>
      </div>

      {error && (
        <div className='server-error'>
          {isFetchBaseQueryError(error)
            ? isErrorMessage(error)
              ? String(error.data.message)
              : 'Ошибка при авторизации'
            : (error.message ?? 'Ошибка при авторизации')}
        </div>
      )}

      <Button
        width={'max'}
        type='submit'
        theme='primary'
        size='xl'
        disabled={!isValid || isLoading}
      >
        {isLoading ? <Loading/> : 'Войти'}
      </Button>
    </form>
  );
};
