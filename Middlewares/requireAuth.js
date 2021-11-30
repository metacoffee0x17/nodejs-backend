const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).send({ error: "No token provided" });
  }
  const token = authorization.replace("Bearer ","");
  jwt.verify(token, process.env.SECRET_KEY, async (err, payload) => {
    if (err) {
      console.log(err);
      return res.status(401).send({ error: "Token not authorised" });
    }
    req.userId = payload.id;
    next();
  });
};
