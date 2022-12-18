export {};

declare global {
  namespace NodeJS {
    export interface ProcessEnv {
      DB_HOST: string;
      DB_PORT: string;
      DB_NAME: string;
      DB_USER: string;
      DB_PASS: string;
    }
  }
}