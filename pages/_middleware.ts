import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  console.log(req.nextUrl.pathname === '/logout');
  if (req.nextUrl.pathname === '/logout') {
    // delete the session with the session in the cookie
    const sessionToken = req.cookies.sessionTokenRegister;

    if (sessionToken) {
      // fetch an api route called logout
      await fetch('/api/logout', {
        method: 'POST',
        body: JSON.stringify({ token: sessionToken }),
      });

      return NextResponse.redirect('/', 302).cookie(
        'sessionTokenRegister',
        '',
        {
          maxAge: -1,
          path: '/',
        },
      );
    }
  }
}
