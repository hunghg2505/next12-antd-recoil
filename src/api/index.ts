import { extend } from 'umi-request';
import { ENV } from 'src/utils/env';
import TokenManagement from './TokenManagement';

const REQ_TIMEOUT = 25 * 1000;
export const isDev = ENV.NODE_ENV === 'development';

export const PREFIX_API = isDev ? ENV.API_URL_DEV : ENV.API_URL_PRODUCTION;

const request = extend({
  prefix: PREFIX_API,
  timeout: REQ_TIMEOUT,
  errorHandler: (error) => {
    throw error?.data || error?.response;
  },
});

const injectBearer = (token: string, configs: any) => {
  if (!configs) {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }

  if (configs.headers) {
    return {
      ...configs,
      headers: {
        ...configs.headers,
        Authorization: `Bearer ${token}`,
      },
    };
  }

  return {
    ...configs,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const TokenManager = new TokenManagement({
  isTokenValid: () => {
    const localInfo = window?.localStorage.getItem(ENV.LOCAL_STORAGE_KEY as string);
    let localInfoObject;

    if (localInfo) {
      localInfoObject = JSON.parse(localInfo);
    }
    return !!localInfoObject?.token;
  },
  getAccessToken: () => {
    const localInfo = window?.localStorage.getItem(ENV.LOCAL_STORAGE_KEY as string);
    let localInfoObject;

    if (localInfo) {
      localInfoObject = JSON.parse(localInfo);
    }

    return localInfoObject?.token || '';
  },
  onRefreshToken() {
    // const localInfo = window?.localStorage.getItem(ENV.LOCAL_STORAGE_KEY as string);
    // let localInfoObject;
    // if (localInfo) {
    //   localInfoObject = JSON.parse(localInfo);
    // }
    // const refreshToken = localInfoObject?.refreshToken;
    // if (!refreshToken) {
    //   return done(null);
    // }
    // request
    //   .post('/auth/refreshToken', {
    //     data: {
    //       refreshToken,
    //     },
    //   })
    //   .then((result) => {
    //     if (result.refreshToken && result.accessToken) {
    //       done(result.accessToken);
    //       return;
    //     }
    //     done(null);
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //     done(null);
    //   });
  },
});

const privateRequest = async (request: any, suffixUrl: string, configs?: any) => {
  const token: string = configs?.token
    ? configs?.token
    : ((await TokenManager.getToken()) as string);

  return request(suffixUrl, injectBearer(token, configs));
};

const API_PATH = {
  // Auth
  AUTH_LOGIN: '/auth/login',
};

export { request, privateRequest, API_PATH };
