const isLocalEnv = window.location.hostname === 'localhost';

export const API_URL = isLocalEnv ? 'http://localhost:3000/api' : `${window.location.protocol}//${window.location.host}/api`;

export const CONFIRM = 'confirm';
export const ERROR = 'error';
