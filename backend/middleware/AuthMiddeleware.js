import jwt from "jsonwebtoken";

const isVerify = async (req, res, next) => {
  try {
    const decode = jwt.verify(req.headers.authorization, process.env.JWT);
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};

export default isVerify;
