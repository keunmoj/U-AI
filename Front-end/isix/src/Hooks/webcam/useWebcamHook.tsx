import { useEffect, useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';

const useWebcam = (socketUrl: string, sendInterval: number) => {
  const [isStreaming, setIsStreaming] = useState(false);
  const [isFirstConnection, setIsFirstConnection] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const socketRef = useRef<WebSocket | null>(null);
  
  const webCamRef = useRef<Webcam|null>(null)

  const [deviceId, setDeviceId] = useState("6fd396708b9d3d8b883d4750f6778489d6765fa279e32057a47e4d9398cebcc9");
  const [devices, setDevices] = useState([]);

  const handleDevices = useCallback(
      mediaDevices =>{
        setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput"))
        console.log(mediaDevices)
      },
          
      [setDevices]
  );

  useEffect(
      () => {
          navigator.mediaDevices.enumerateDevices().then(handleDevices);
      },
      [handleDevices]
  );

  useEffect(() => {
    socketRef.current = new WebSocket(socketUrl);
    socketRef.current.onopen = () => {
      console.log('WebSocket is connected.')
      setIsFirstConnection(true);
    };
    socketRef.current.onmessage = (event) => {
      if (isFirstConnection) {
        const sessionId = event.data;
        localStorage.setItem('socketId', sessionId)
        console.log(`세션 ID: ${sessionId}`);
        setIsFirstConnection(false);
      }
    }

    return () => {
      if(socketRef.current){
        socketRef.current.close();
      }
    };
    
  }, []);

  
  useEffect(() => {

    if(isStreaming){
      
      navigator.mediaDevices.getUserMedia({ video: { deviceId: { exact: deviceId }} })
        .then((stream) => {
          
          if (videoRef.current) {
            // console.log(videoRef)
            videoRef.current.srcObject = stream;
          }
        })
        .catch((err) => console.error(err));

        const sendFrame = async () => {
          // console.log(videoRef.current)
          // console.log(deviceId)
          if (socketRef.current?.readyState === WebSocket.OPEN && canvasRef.current && videoRef.current) {
         
              const context = canvasRef.current.getContext('2d');
              if(context){
                  context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
                  canvasRef.current.toBlob(async (blob: Blob | null) => {
                      if(blob){
                          const reader = new FileReader();
                          reader.onloadend=(event)=>{
                              if(event.target?.readyState === FileReader.DONE){
                                const arrayBuffer = event.target?.result as ArrayBuffer;
                                socketRef.current?.send(arrayBuffer);
                              }
                          };
                          reader.readAsArrayBuffer(blob);
                      }
                  },'image/jpeg')
              }

          }
      };

      let intervalId: NodeJS.Timeout; 
          
      intervalId= setInterval(sendFrame, sendInterval);

      return () =>{
        clearInterval(intervalId); 
      
      };
    }
  }, [isStreaming]);

  const startStream = () => {
    setIsStreaming(true);
  };

  const stopStream = () => {
    setIsStreaming(false);
  };

  return {
    startStream,
    stopStream, 
    // videoElm: <Webcam videoConstraints={{ deviceId: devices[1]?.deviceId }} ref={videoRef} style={{ objectFit: 'cover', width: '100%', height: '100%', transform: 'scaleX(-1)' }}  autoPlay playsInline muted />, 
    videoElm: <video style={{ objectFit: 'cover', width: '100%', height: '100%', transform: 'scaleX(-1)' }} ref={videoRef}  autoPlay playsInline muted />, 
    hiddenCanvasElm : <canvas ref={canvasRef} style={{ display: 'none' }}/> };
}

export default useWebcam;
