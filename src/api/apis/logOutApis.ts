'use server';

import { cookies } from 'next/headers';

export async function deleteLoginRT() {
  await cookies().delete('Authorization');
}

export async function deleteReissueRT() {
  await cookies().delete({
    name: 'Authorization',
    domain: '.board-go.net',
    path: '/',
  });
}
