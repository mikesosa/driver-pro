/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { createUploadLink } from 'apollo-upload-client';

const parseHeaders = (rawHeaders: string) => {
  const headers = new Headers();
  // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
  // https://tools.ietf.org/html/rfc7230#section-3.2
  const preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ');
  preProcessedHeaders.split(/\r?\n/).forEach((line: string) => {
    const parts = line.split(':');
    const key = parts?.shift()?.trim();
    if (key) {
      const value = parts.join(':').trim();
      headers.append(key, value);
    }
  });
  return headers;
};

export const uploadFetch = (url: string | URL, options: any = {}) =>
  new Promise((resolve, reject) => {
    const xhr: any = new XMLHttpRequest();

    xhr.onload = () => {
      const opts: any = {
        status: xhr.status,
        statusText: xhr.statusText,
        headers: parseHeaders(xhr.getAllResponseHeaders() || ''),
      };
      opts.url =
        'responseURL' in xhr
          ? xhr.responseURL
          : opts.headers.get('X-Request-URL');
      const body = 'response' in xhr ? xhr.response : xhr.responseText;
      resolve(new Response(body, opts));
    };

    xhr.onerror = () => {
      reject(new TypeError('Network request failed'));
    };

    xhr.ontimeout = () => {
      reject(new TypeError('Network request failed'));
    };

    xhr.open(options.method, url, true);

    Object.keys(options.headers).forEach((key) => {
      xhr.setRequestHeader(key, options.headers[key]);
    });

    if (xhr.upload) {
      xhr.upload.onprogress = options.onProgress;
    }

    xhr.send(options.body);
  });

const customFetch = (uri: string, options: any | undefined) => {
  if (options.onProgress) {
    return uploadFetch(uri, options);
  }
  return fetch(uri, options);
};

const httpEndpoint = process.env.DRIVER_PRO_API_URL + '/graphql';

const uploadLink = createUploadLink({
  uri: httpEndpoint,
  credentials: 'same-origin',
  fetch: customFetch as any,
});

const httpLink = createHttpLink({
  uri: httpEndpoint,
});

const authLink = setContext((_: any, { headers }: any) => {
  const token = process.env.DRIVER_PRO_API_URL;

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const newApolloLink = ApolloLink.split(
  (operation: any) => !operation.getContext().clientName, // Default client
  authLink.concat(uploadLink),
  authLink.concat(httpLink)
);

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
  },
  mutate: {
    errorPolicy: 'all',
  },
};

const apolloClient = new ApolloClient({
  // link: authLink.concat(newApolloLink),
  link: newApolloLink,
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions as any,
});

export default apolloClient;
