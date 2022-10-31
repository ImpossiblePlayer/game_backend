import WebSocket from 'ws';
import { server } from './index';

const wss = new WebSocket.Server({ server });
