import * as restify from 'restify';

export default function(req, res) {
  if (req.method.toUpperCase() === 'OPTIONS') {
    res.header(
      'Access-Control-Allow-Headers',
      restify.CORS.ALLOW_HEADERS.join(', '),
    );
    res.send(200);
  } else {
    res.send(new restify.MethodNotAllowedError());
  }
}
