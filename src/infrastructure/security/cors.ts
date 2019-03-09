export default {
  preflightMaxAge: 5,
  origins: ["*"],
  methods: ["GET", "PUT", "DELETE", "POST", "PATCH", "OPTIONS"],
  allowHeaders: ["Content-Type", "authorization"],
};
