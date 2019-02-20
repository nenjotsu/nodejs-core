const microserviceList = ['auctionApi'];

const getApiRoute = (
  env: string,
  controller: string,
  routeName: string,
): string => {
  const path = `../config.${env}`;
  const domain = require(path);
  const fullRoute = `${domain[controller]}${routeName.toLowerCase()}`;
  return fullRoute;
};

export default {
  getApiRoute,
  microserviceList,
};
