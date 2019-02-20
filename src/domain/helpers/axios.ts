const axios = require('axios');

const httpGet = async (url, accessToken) => {
  axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  axios.defaults.headers.post['Content-Type'] = 'application/json';

  try {
    let response = await axios.get(url.value);
    if (response.status == 200) {
      return response;
    }
  } catch (error) {
    console.log('httpGet Error', error);
    throw new Error(error);
  }
};

const httpPost = async (url, payload, accessToken) => {
  axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  axios.defaults.headers.post['Content-Type'] = 'application/json';

  try {
    let response = await axios.post(url.value, payload);
    if (response.status == 200) {
      return response;
    }
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  httpPost,
  httpGet,
};
