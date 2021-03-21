const jwt = require('jsonwebtoken')

exports.jwtGenerator = (payload) => {
  console.log("paylod", payload)
  const token = jwt.sign(payload,
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
  return token
}

exports.jwtAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]
    const decode = jwt.verify(token, process.env.JWT_SECRET)
    req.userData = decode
    next()
  } catch (error) {
    return res.status(401).json({
      error
    })
  }
}