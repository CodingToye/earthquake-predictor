// src/types/types.d.ts

declare module "*.css";
declare namespace NodeJS {
  interface Global {
    fetch: jest.Mock;
  }
}
