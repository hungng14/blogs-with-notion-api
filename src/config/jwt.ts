export const JWT_SECRET_KEY=process.env.JWT_SECRET_KEY as string;
export const JWT_EXPIRES_IN=process.env.JWT_EXPIRES_IN as string || '1h'; // x hours