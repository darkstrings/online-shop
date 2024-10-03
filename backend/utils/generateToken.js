import jwt from "jsonwebtoken";
const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "30d" });
  // jwt.sign takes in an object with the user's data (userId) and a secret key. It returns a signed JSON Web Token (JWT) that contains the user's data and expiration time.

  // Set JWT as http-only since we're in development.
  res.cookie("jwt", token, {
    httpOnly: true,
    // a boolean is entered for secure. It is false in development and true in production.
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000, //it's in milliseconds
  });
  //     The first argument is the name of the cookie ("jwt" in this case).
  // The second argument is the value of the cookie (the token variable in this case).
  // The third argument is an options object that configures the properties of the cookie (e.g. httpOnly, secure, sameSite, maxAge, etc.).
};
export default generateToken;
