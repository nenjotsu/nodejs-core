import * as jsonwebtoken from 'jsonwebtoken';

export const isExpired = expiresAt => {
  const currentTime = new Date().getTime();
  const isexp = currentTime > expiresAt;
  if (isexp) {
    return true;
  }
  return false;
};

interface CustomError {
  statusCode?: number;
  body?: any;
  reason?: string;
  message?: string;
}

interface Decoded {
  exp?: any;
}

export default {
  name: 'NodeCoreAPI',
  formatters: {
    'application/json': function customizedFormatJSON(req, res, body: any) {
      let resultBody: CustomError | string = body;
      if (body instanceof Error || body.statusCode === 500) {
        let isJwtExpired = false;

        const { url, method, headers } = req;
        if (headers.authorization === undefined) {
          isJwtExpired = true;
        } else {
          const TOKEN = headers.authorization.replace('Bearer ', '');
          var decoded: Decoded | any = jsonwebtoken.decode(TOKEN);
          isJwtExpired = isExpired(decoded.exp);
        }

        if (
          JSON.stringify(body.body) === '{"code":"Internal","message":""}' &&
          isJwtExpired
        ) {
          const message =
            headers.authorization === undefined
              ? 'Token is required'
              : 'Invalid Token or JWT Expired';
          const reason =
            headers.authorization === undefined
              ? 'UnauthorizedError'
              : 'InvalidCredentialsError';
          resultBody = {
            statusCode: 401,
            reason,
            message,
          };
          console.log(
            'Error:',
            `${JSON.stringify(body)} ${method} ${headers.host}${url}`,
          );
          res.statusCode = 401;
        } else {
          const reason =
            body.body !== undefined && body.body.code !== undefined
              ? body.body.code
              : body.code !== undefined
              ? body.code
              : 'Something went wrong';
          resultBody = {
            statusCode: body.statusCode,
            reason,
            message: body.message || '',
          };
        }
      } else if (Buffer.isBuffer(body)) {
        resultBody = body.toString('base64');
      }

      var data = JSON.stringify(resultBody);
      res.setHeader('Content-Length', Buffer.byteLength(data));

      return data;
    },
  },
};
