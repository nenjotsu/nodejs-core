export default {
  preflightMaxAge: 5,
  origins: ['*'],
  methods: ['GET', 'PUT', 'DELETE', 'POST', 'PATCH'],
  allowHeaders: ['Content-Type', 'authorization'],
};
