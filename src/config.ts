export interface Config {
  WRONG_WAY_URL: string;
}

export const getAppConfig = (): Config => ({
  WRONG_WAY_URL: process.env.REACT_APP_WRONG_WAY_URL || '',
});