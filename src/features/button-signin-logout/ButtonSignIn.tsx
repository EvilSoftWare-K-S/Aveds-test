import { openModal } from '@app/providers/model/ModalProvider';
import { useAppDispatch, useAppSelector } from '@app/store';
import { clearTokens, selectIsAuthenticated } from '@features/login-form/model/tokenSlice';
import { Button } from '@shared/ui/button';
import { FC } from 'react';
import { useCachedProfile } from '@features/button-signin-logout/model/useCachedProfile';
import { useLogoutMutation } from '@features/button-signin-logout/model/profileApi';
export interface ButtonProps {
  textIn?: string;
  textOut?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'circle' | 'auto';
  theme?: 'primary' | 'opacity' | 'secondary' | 'none';
  width?: 'auto' | 'max';
}

export const ButtonSignIn: FC<ButtonProps> = (props) => {
  const {
    textIn = 'Войти',
    textOut = 'Выйти',
    size = 'lg',
    theme = 'secondary',
    width = 'auto',
  } = props;

  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const { clearCache } = useCachedProfile();
  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(clearTokens());
    } catch {
      dispatch(clearTokens());
    } finally {
      clearCache();
    }
  };
  const handleOpenSignInModal = () => {
    dispatch(openModal('sign-in'));
  };
  return isAuthenticated ? (
    <Button onClick={handleLogout} width={width} theme={theme} size={size}>
      {textOut}
    </Button>
  ) : (
    <Button onClick={handleOpenSignInModal} width={width} theme={theme} size={size}>
      {textIn}
    </Button>
  );
};
