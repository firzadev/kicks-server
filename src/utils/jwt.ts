import jwt from "jsonwebtoken";
export const ACCESS_SECRET_TOKEN = process.env.ACCESS_TOKEN_SECRET!;
export const ACCESS_REFRESH_TOKEN = process.env.REFRESH_TOKEN_SECRET!;

export const generateTokens = (userId: number) => {
  const accessToken = jwt.sign({ userId }, ACCESS_SECRET_TOKEN, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign({ userId }, ACCESS_REFRESH_TOKEN, {
    expiresIn: "7d",
  });

  return {
    accessToken,
    refreshToken,
  };
};

export const verifyAccessToken = (token: string) => {
  try {
    return jwt.verify(token, ACCESS_SECRET_TOKEN) as { userId: string };
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const verifyRefreshToken = (token: string) => {
  try {
    return jwt.verify(token, ACCESS_REFRESH_TOKEN) as { userId: string };
  } catch (error) {
    console.log(error);
    return null;
  }
};
