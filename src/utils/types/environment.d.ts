declare namespace NodeJS {
  export interface ProcessEnv {
    // Node
    NODE_ENV: string
    PORT: string
    // MongoDB
    DATABASE_NAME: string
    MONGODB_HOST: string
    MONGODB_PORT: string
    // Email
    EMAIL_FROM: string
    EMAIL_TO?: string
    EMAIL_SERVICE_API_KEY: string
    // JWT
    JWT_EXPIRES_IN_ACCOUNT_ACTIVATION: string
    JWT_EXPIRES_IN_LOGIN: string
    JWT_EXPIRES_IN_PASSWORD_RESET: string
    JWT_SECRET_ACCOUNT_ACTIVATION: string
    JWT_SECRET_LOGIN: string
    JWT_SECRET_PASSWORD_RESET: string
    // URL
    CLIENT_URL: string
  }
}
