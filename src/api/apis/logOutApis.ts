'use server';

import { cookies } from 'next/headers';

export async function logout() {
  await cookies().delete('Authorization');
  await cookies().delete({
    name: 'Authorization',
    domain: '.board-go.net',
    path: '/',
  });
}
