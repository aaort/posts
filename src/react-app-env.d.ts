declare namespace NodeJS {
  interface ProcessEnv {
    //types of envs
    NODE_ENV: 'development' | 'production' | 'test';
    REACT_APP_API_BASE_URL: string;
  }
}

/// <reference types="react-scripts" />
