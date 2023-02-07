/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

// Return session storage token
// const readAccessToken = (name: any) => {
//   const tempLocalToken = sessionStorage.getItem(name);
//   if (tempLocalToken) {
//     return `Token ${tempLocalToken}`;
//   } else {
//     return '';
//   }
// };

// // // Get refresh token from sessionStorage
// const getRefreshToken = (name: any) => {
//   const tempLocalToken = sessionStorage.getItem(name);
//   if (tempLocalToken) {
//     const { refresh_token } = JSON.parse(tempLocalToken);
//     return refresh_token;
//   } else {
//     return '';
//   }
// };

// // Update session storage with new accessToken
// const updateSessionStorageToken = (name, newToken) => {
//   let tempLocalToken = sessionStorage.getItem(name);
//   const { refresh_token } = JSON.parse(tempLocalToken);
//   let payload = {
//     access_token: newToken,
//     refresh_token,
//   };
//   sessionStorage.setItem(name, JSON.stringify(payload));
// };

// const refreshAccessToken = async () => {
//   const refreshToken = getRefreshToken("Token");
//   try {
//     const res = await axios({
//       method: "post",
//       url: `${API_REFRESH_TOKEN_URL}`,
//       data: {
//         refresh: refreshToken,
//       },
//       headers: {
//         "content-type": "application/json",
//       },
//     });
//     return res.data;
//   } catch (e) {
//     // If error with refreshing token, send to login page
//     window.open(APP_LOGIN_URL, "_self");
//   }
// };

const buildClient = (
  baseUrl = process.env.DRIVER_PRO_API_URL,
  contentType = 'application/json'
) => {
  /**
   * Axios basic configuration
   * Some general configuration can be added like timeout, headers, params etc. More details can be found on https://github.com/axios/axios
   * */
  const options = {
    baseURL: baseUrl,
    timeout: 1000 * 30,
    withCredentials: false,
    headers: {
      'Content-Type': contentType,
    },
  };

  /**
   * Creating the instance of Axios
   * It is because, in large scale application we may need to consume APIs from more than single server,
   * So, may need to create multiple http client with different config
   * Only this client will be used rather than axios in the application
   * */
  const httpClient = axios.create(options);

  /**
   * Auth interceptors
   * @description Configuration related to AUTH token can be done in interceptors.
   * Currently it is just doing nothing but idea to to show the capability of axios and its interceptors
   * In future, interceptors can be created into separate files and consumed into multiple http clients
   * @param {*} config
   */
  const authInterceptor = (config: any) => {
    // const token = readAccessToken("Token");
    // if (token) {
    //   config.headers = {
    //     ...config.headers,
    //     Authorization: token,
    //   };
    //   // } else if (!config.url.includes("login")) {
    //   //   window.open(APP_LOGIN_URL, "_self");
    // }
    return config;
  };

  const loggerInterceptor = (config: any) => {
    /** Add logging here */
    return config;
  };

  /** Adding the request interceptors */
  httpClient.interceptors.request.use(authInterceptor);
  httpClient.interceptors.request.use(loggerInterceptor);

  /** Adding the response interceptors */
  // httpClient.interceptors.response.use(
  //   (response:any) => {
  //     return response;
  //   },
  //   async (error: any) => {
  //     // If unauthorized, refresh token
  //     if (error.response.status === 401) {
  //       const originalRequest = error.config;
  //       const { access } = await refreshAccessToken();
  //       originalRequest.headers["Authorization"] = `Bearer ${access}`;
  //       // Update access token in session storage
  //       updateSessionStorageToken("Token", access);
  //       // Return updated httpClient
  //       return httpClient(originalRequest);
  //     }
  //     return Promise.reject(error);
  //   }
  // );
  return httpClient;
};

class ApiClient {
  client: any;
  constructor(url: any, contentType: any) {
    this.client = buildClient(url, contentType);
  }

  get(url: any, conf = {}) {
    return this.client
      .get(url, conf)
      .then((response: any) => Promise.resolve(response))
      .catch((error: any) => Promise.reject(error));
  }

  delete(url: any, conf = {}) {
    return this.client
      .delete(url, conf)
      .then((response: any) => Promise.resolve(response))
      .catch((error: any) => Promise.reject(error));
  }

  head(url: any, conf = {}) {
    return this.client
      .head(url, conf)
      .then((response: any) => Promise.resolve(response))
      .catch((error: any) => Promise.reject(error));
  }

  options(url: any, conf = {}) {
    return this.client
      .options(url, conf)
      .then((response: any) => Promise.resolve(response))
      .catch((error: any) => Promise.reject(error));
  }

  post(url: any, data = {}, conf = {}) {
    return this.client
      .post(url, data, conf)
      .then((response: any) => Promise.resolve(response))
      .catch((error: any) => {
        return Promise.reject(error);
      });
  }

  put(url: any, data = {}, conf = {}) {
    return this.client
      .put(url, data, conf)
      .then((response: any) => Promise.resolve(response))
      .catch((error: any) => Promise.reject(error));
  }

  patch(url: any, data = {}, conf = {}) {
    return this.client
      .patch(url, data, conf)
      .then((response: any) => Promise.resolve(response))
      .catch((error: any) => Promise.reject(error));
  }
}

const ApiClientSingleton = (function getInstances() {
  let ApiInstance: any;

  function createInstance(url: any, contentType: any) {
    const object = new ApiClient(url, contentType);
    return object;
  }

  return {
    getApiInstance(url?: string, contentType?: string) {
      if (!ApiInstance || url) {
        ApiInstance = createInstance(url, contentType);
      }
      return ApiInstance;
    },
  };
})();

export default ApiClientSingleton;
