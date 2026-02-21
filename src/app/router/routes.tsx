import { PATHS } from '@shared/routes/routes';
import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
// Layouts
import LayoutMain from '@pages/layout-main/LayoutMain';
import { useAppSelector } from '@app/store';
import { selectIsAuthenticated } from '@features/login-form/model/tokenSlice';
import { Loading } from '@shared/ui/loading/loading';

// Pages
const HomePage = lazy(() => import('@pages/home/HomePage'));
const ContactPage = lazy(() => import('@pages/contact/ContactPage'));
// const NotFoundPage = lazy(() => import('@pages/not-found-page/NotFoundPage'));

// Security Pages
const ProfilePage = lazy(() => import('@pages/profile/profile'));

// Компонент для защиты приватных роутов
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to={PATHS.home} replace />;
  }

  return children;
};

export const router = () =>
  createBrowserRouter([
    {
      path: PATHS.home,
      element: (
        <Suspense
          fallback={
            <div
              style={{
                display: 'flex',
                height: '100%',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Loading />
            </div>
          }
        >
          <LayoutMain />
        </Suspense>
      ),
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: PATHS.contact,
          element: <ContactPage />,
        },
        {
          path: PATHS.profile,
          element: (
            <Suspense fallback={<div>Загрузка сервиса...</div>}>
              <ProtectedRoute>
                <Outlet />
              </ProtectedRoute>
            </Suspense>
          ),
          children: [
            {
              index: true,
              element: <ProfilePage />,
            },
          ],
        },
      ],
    },

    {
      path: '*',
      // element: <NotFoundPage />
    },
  ]);
