import jwt from "jsonwebtoken";
const jwtSecret = process.env.REACT_APP_JWTSECRET;

export default function useJsonWebToken() {
  const checkToken = token => {
    if (!token) {
      throw new Error("Kein Token! Keine Autorisierung!");
    }

    try {
      const decoded = jwt.verify(token, jwtSecret);
      return decoded.user;
    } catch (err) {
      throw new Error(err);
    }
  };

  return [checkToken];
}
