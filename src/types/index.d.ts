declare namespace Express {
  interface Request {
    fileError: string;
  }
}

declare namespace NodeJS {
  export interface ProcessEnv {
    APP_NAME: string;
    APP_VERSION: string;
    JWT_TOKEN: string;
    JWT_TOKEN_EXPIRES_IN: string;
    JWT_TOKEN_EXPIRES_IN_HOUR: string;
    PORT: string;
  }
}
