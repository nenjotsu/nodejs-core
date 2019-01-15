import { getAccessToken } from '../../lib/localstorage';

const TOKEN = getAccessToken();

// form body
export const headers = {
  'Content-Type': 'application/x-www-form-urlencoded',
  Authorization: `Bearer ${TOKEN}`,
};

// text plain
export const headersPlain = {
  'Content-Type': 'text/plain',
  Authorization: `Bearer ${TOKEN}`,
};

// normal posting data
export const headersJson = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${TOKEN}`,
};

// uploading documents
export const headersFormData = {
  'Content-Type': 'multipart/form-data',
  Authorization: `Bearer ${TOKEN}`,
};
