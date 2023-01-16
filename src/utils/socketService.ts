import { getAppConfig } from '../config';

export interface SocketService {
  connect(): Promise<void>;
  close(): void;
  sendMessage(payload: string | Blob): Promise<any>;
}

class WssSocketService implements SocketService {
  socket: WebSocket | null;
  url: string;

  constructor(url: string) {
    this.socket = null;
    this.url = url;
  }

  connect = <T = any>(subscriber?: (data: T) => void): Promise<void> => {
    if (this.socket && this.socket.readyState !== WebSocket.CLOSED) {
      return Promise.resolve();
    }

    return new Promise<void>((resolve, reject) => {
      const socket = new WebSocket(this.url);
      socket.onopen = () => resolve();
      socket.onerror = (e) => reject(e);
      if (subscriber) {
        socket.onmessage = ({ data }) => subscriber(data);
      }
      this.socket = socket;
    });
  };

  close = () => this.socket?.close();

  sendMessage = (payload: string | Blob): Promise<any> =>
    this.connect().then(() => {
      this.socket?.send(payload);
      return new Promise((resolve) => {
        if (this.socket) {
          this.socket.onmessage = ({ data }) => resolve(data);
        }
      });
    });
}

const { WRONG_WAY_URL } = getAppConfig();
export const WssSocketServiceInstance = new WssSocketService(WRONG_WAY_URL);
