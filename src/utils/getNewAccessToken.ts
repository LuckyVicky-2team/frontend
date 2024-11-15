import { postRenewAccessToken } from '@/api/apis/authApis';

async function getNewAccessToken() {
  try {
    const response = await postRenewAccessToken();

    const newAccessToken = response.headers.authorization;

    return newAccessToken;
  } catch {
    return;
  }
}

export default getNewAccessToken;
