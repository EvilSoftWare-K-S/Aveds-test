import { http, HttpResponse } from 'msw';
import { findUserByLogin, findUserById } from '../db/users';
import {
  generateTokens, 
  invalidateRefreshToken,
  decodeToken,
} from '../utils/tokens';
import { LoginRequest, AuthResponse } from '../type';

export const authHandlers = [
  http.post<never, LoginRequest>('/api/auth/login', async ({ request }) => {
    const body = await request.json();
    const { login, password } = body;

    if (!login || !password) {
      return HttpResponse.json({ error: 'Email и пароль обязательны' }, { status: 400 });
    }


    const user = findUserByLogin(login);

    if (!user || user.password !== password) {
      return HttpResponse.json({ error: 'Неверный email или пароль' }, { status: 401 });
    }


    const tokens = generateTokens(user.id);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user;

    const response: AuthResponse = {
      success: true,
      user: userWithoutPassword,
      tokens,
    };


    return HttpResponse.json(response, {
      status: 200,
      headers: {
        'Set-Cookie': [
          `accessToken=${tokens.accessToken}; HttpOnly; Secure; SameSite=Strict; Max-Age=${tokens.expiresIn}`,
          `refreshToken=${tokens.refreshToken}; HttpOnly; Secure; SameSite=Strict; Max-Age=604800`, // 7 дней
        ].join(', '),
      },
    });
  }),


  http.post('/api/auth/logout', async ({ request }) => {
    let refreshToken: string | null = null;

    const cookieHeader = request.headers.get('cookie');
    if (cookieHeader) {
      const cookies = Object.fromEntries(cookieHeader.split('; ').map((c) => c.split('=')));
      refreshToken = cookies['refreshToken'] || null;
    }

    if (refreshToken) {
      invalidateRefreshToken(refreshToken);
    }

    return new HttpResponse(null, {
      status: 200,
      headers: {
        'Set-Cookie': [
          'accessToken=; HttpOnly; Secure; SameSite=Strict; Max-Age=0',
          'refreshToken=; HttpOnly; Secure; SameSite=Strict; Max-Age=0',
        ].join(', '),
      },
    });
  }),

  http.get('/api/auth/me', async ({ request }) => {
    let accessToken: string | null = null;

    const authHeader = request.headers.get('authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      accessToken = authHeader.substring(7);
    } else {
      const cookieHeader = request.headers.get('cookie');
      if (cookieHeader) {
        const cookies = Object.fromEntries(cookieHeader.split('; ').map((c) => c.split('=')));
        accessToken = cookies['accessToken'] || null;
      }
    }

    if (!accessToken) {
      return HttpResponse.json({ error: 'Токен не предоставлен' }, { status: 401 });
    }

    const payload = decodeToken(accessToken);
    if (!payload) {
      return HttpResponse.json({ error: 'Невалидный или истекший токен' }, { status: 401 });
    }

    const user = findUserById(payload.userId);
    if (!user) {
      return HttpResponse.json({ error: 'Пользователь не найден' }, { status: 404 });
    }

    const tokens = generateTokens(user.id);
    const response: AuthResponse = {
      success: true,
      user,
      tokens,
    };

    return HttpResponse.json(response, {
      status: 200,
      headers: {
        'Set-Cookie': [
          `accessToken=${tokens.accessToken}; HttpOnly; Secure; SameSite=Strict; Max-Age=${tokens.expiresIn}`,
          `refreshToken=${tokens.refreshToken}; HttpOnly; Secure; SameSite=Strict; Max-Age=604800`, // 7 дней
        ].join(', '),
      },
    }); 
  }),
];
