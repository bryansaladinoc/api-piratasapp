const jwt = require('jsonwebtoken');

const secret = 'MyCat';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTcwNTYwNDIwMH0.dD4MisJbESDJaoIH1JMr2bqSNgTbYmyVH81WxViau9Y';

const verifyToken = (token, secret) => {
  return jwt.verify(token, secret);
};

const payload = verifyToken(token, secret);
console.log(payload);
