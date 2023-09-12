"use client"

import { useEffect, useRef } from 'react';

export default function Cam() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const socket = new WebSocket('ws://192.168.30.161:8080/ws/chat');
    socket.onopen = () => console.log('WebSocket is connected.');
    socket.onmessage = (event) => {
      console.log(event.data)
    }

    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => console.error(err));

      const sendFrame = async () => {
        if (socket.readyState === WebSocket.OPEN) {
            if (videoRef.current) {
                const canvas = videoRef.current.getCanvas();
                if (canvas) {
                    canvas.toBlob(async (blob: any) => {
                        if (blob) {
                            const reader = new FileReader();
                            reader.onload = (event) => {
                                if (event.target) {
                                    const frameData = event.target.result;
                                    console.log(frameData.byteLength)
                                    console.log(blob)
                                    socket.send(frameData); // Send the frame to the server
                                }
                            };
                            reader.readAsArrayBuffer(blob);
                        }
                    }, 'image/jpeg');
                }
            }
        }
    };

    const interval = setInterval(sendFrame, 100)

    return () => {
      clearInterval(interval);

      if (socket) {
        socket.close();
      }
    };
  }, []);

  return (
    <div>
      <video ref={videoRef} autoPlay playsInline muted />
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
}