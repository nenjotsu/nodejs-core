export default (err, req, res, next) => {
  // log.error(err.stack);
  console.log('uncaught', err);

  next(err);
};
