import { PATHS } from '@shared/routes/routes';
import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
// Layouts
import LayoutMain from '@pages/layout-main/LayoutMain';

// Pages
const HomePage = lazy(() => import('@pages/home/HomePage'));
const ContactPage = lazy(() => import('@pages/contact/ContactPage'));
// const NotFoundPage = lazy(() => import('@pages/not-found-page/NotFoundPage'));

// Security Pages
// const ProfilePage = lazy(() => import('@pages/profile/ProfilePage'));

// Компонент для защиты приватных роутов
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = false;

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
        <Suspense fallback={<div>Загрузка...</div>}>
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
              // element: <ProfilePage/>
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
