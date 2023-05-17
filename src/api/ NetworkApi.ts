import axios from "axios";

const NetworkApi = {
  post: (route,data, headers,params?) => {
    return new Promise((resolve, reject) => {
      NetworkApi.prepareConfig(route,data, 'post', headers,params, (err, res) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(res);
      });
    });
  },
  get: (route,headers,params?) => {
    return new Promise((resolve, reject) => {
      NetworkApi.prepareConfig(route,null, 'get', headers,params, (err, res) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(res);
      });
    });
  },
  call: (config, callback) => {
    axios(config)
      .then((response) => {
        callback(null, response.data);
      })
      .catch((error) => {
        callback(error, null);
      });
  },
  prepareConfig: async (url,data, methodType, headers,params, callback) => {

    const config = {
      method: methodType,
      url,
      data,
      params,
      headers
    };
    NetworkApi.call(config, callback);
  }
};

export default NetworkApi;
