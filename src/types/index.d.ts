declare namespace Express {
  interface Request {
    fileError: string;
  }
}

declare namespace NodeJS {
  export interface ProcessEnv {
    JWT_TOKEN: string;
    JWT_TOKEN_EXPIRES_IN: string;
    JWT_TOKEN_EXPIRES_IN_HOUR: string;
    PORT: string;
  }
}
