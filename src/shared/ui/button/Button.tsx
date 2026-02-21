import { ReactNode, FC, MouseEvent } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
// import { Spinner } from '@/shared';
import styles from './Button.module.scss';

export interface ButtonProps {
  children: ReactNode;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'circle' | 'auto';
  type?: 'button' | 'submit' | 'reset';
  href?: string;
  theme?: 'primary' | 'opacity' | 'secondary' | 'none';
  disabled?: boolean;
  className?: string;
  width?: 'auto' | 'max';
  isLoading?: boolean;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
}

export const Button: FC<ButtonProps> = (props) => {
  const {
    children,
    size = 'lg',
    type = 'button',
    href = '',
    theme = 'primary',
    disabled = false,
    className,
    width = 'auto',
    isLoading = false,
    onClick,
  } = props;
  return (
    <>
      {href && (
        <Link to={href} className={className}>
          <button
            type={type}
            disabled={isLoading ? true : disabled}
            className={classNames(
              styles.btn,
              styles[`theme_${theme}`],
              styles[`btn-size_${size}`],
              styles[`btn-width_${width}`],
              {
                [styles['btn-disabled']]: disabled,
              },
              className,
            )}
            onClick={onClick}
          >
            {/* {isLoading && <Spinner />} */}
            {!isLoading && children}
          </button>
        </Link>
      )}
      {!href && (
        <button
          type={type}
          disabled={isLoading ? true : disabled}
          className={classNames(
            styles.btn,
            styles[`theme_${theme}`],
            styles[`btn-size_${size}`],
            styles[`btn-width_${width}`],
            {
              [styles['btn-disabled']]: disabled,
            },
            className,
          )}
          onClick={onClick}
        >
          {/* {isLoading && <Spinner />} */}
          {!isLoading && children}
        </button>
      )}
    </>
  );
};
