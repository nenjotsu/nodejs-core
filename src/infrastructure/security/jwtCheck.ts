import jwt = require('express-jwt');
import jwks = require('jwks-rsa');

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://accounts.ubidyapp.com/.well-known/jwks.json',
  }),
  audience: 'https://ubidy-api-endpoint/',
  issuer: 'https://accounts.ubidyapp.com/',
  algorithms: ['RS256'],
});

export default jwtCheck;
