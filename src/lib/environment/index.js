import config from 'config';

const env = config.ENV;

export const getBaseUrl = baseUrl => {
  const url = config[baseUrl];
  if (env !== '') return url;
  return '';
};
