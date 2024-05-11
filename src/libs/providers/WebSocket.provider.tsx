'use client';
import { WebSocketContext } from '@/contexts/WebSocket.context';
import { useEffect, useState } from 'react';
import { Socket, io } from 'socket.io-client';

const GATEWAY_ENDPOINT = process.env.NEXT_PUBLIC_NAME_GATEWAY_ENDPOINT || 'http://localhost:3001';

export default function WebSocketProvider({ children }: { children: React.ReactNode }) {
  const [socketConnection, setSocketConnection] = useState<Socket | null>(null);
  useEffect(() => {
    setSocketConnection(io(GATEWAY_ENDPOINT));
  }, []);
  return <WebSocketContext.Provider value={socketConnection}>{children}</WebSocketContext.Provider>;
}
