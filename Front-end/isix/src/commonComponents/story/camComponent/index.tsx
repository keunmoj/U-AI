import { useEffect, useRef } from 'react';

interface CamComponentProps {
  width?: string;
  height?: string;
}

const CamComponent: React.FC<CamComponentProps> = ({ width = '1000', height = '400' }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const socket = new WebSocket('ws://192.168.30.161:8080/ws/chat');
    socket.onopen = () => console.log('WebSocket is connected.');
    socket.onmessage = (event) => {
      // console.log(event.data)
    }

    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => console.error(err));

      const sendFrame = async () => {
        if (socket.readyState === WebSocket.OPEN && canvasRef.current && videoRef.current) {

            const context = canvasRef.current.getContext('2d');
            if(context){
                context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
                canvasRef.current.toBlob(async (blob: Blob | null) => {
                    if(blob){
                        const reader = new FileReader();
                        reader.onloadend=(event)=>{
                            if(event.target?.readyState === FileReader.DONE){
                                const arrayBuffer=event.target?.result as ArrayBuffer;
                                socket.send(arrayBuffer);
                            }
                        };
                        reader.readAsArrayBuffer(blob);
                    }
                },'image/jpeg')
            }

        }
    };

    setInterval(sendFrame, 100);

    return () => {

      clearInterval(sendFrame);

      if(socket){
        socket.close();
      }

    };

}, [videoRef]);

return (
<>
  <video style={{ objectFit: 'cover' }} ref={videoRef} autoPlay playsInline muted width={width} height={height}/>
  <canvas ref={canvasRef} style={{ display: 'none' }}/>
</>
)
}

export default CamComponent
