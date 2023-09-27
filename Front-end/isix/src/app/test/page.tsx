'use client'
import React, {useEffect, useRef} from 'react';
import Webcam from 'react-webcam';
import io from 'socket.io-client';

const test = () => {
    const [deviceId, setDeviceId] = React.useState({});
    const [devices, setDevices] = React.useState([]);

    const handleDevices = React.useCallback(
        mediaDevices =>
            setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput")),
        [setDevices]
    );

    React.useEffect(
        () => {
            navigator.mediaDevices.enumerateDevices().then(handleDevices);
        },
        [handleDevices]
    );

    const webcamRef = useRef(null);

    useEffect(() => {
        const socket = new WebSocket('ws://passportlkm.iptime.org:32768/ws/chat');

        socket.onopen = () => {
            console.log('WebSocket connection established.');
            socket.send('open socket');
        };

        socket.onmessage = (event) => {
            // Handle incoming messages from the server
            console.log('Received message:', event.data);
        };

        socket.onclose = (event) => {
            if (event.wasClean) {
                console.log(`WebSocket connection closed cleanly, code=${event.code}, reason=${event.reason}`);
            } else {
                // Connection was lost
                console.error('WebSocket connection abruptly closed.');
            }
        };

        const sendFrame = async () => {
            if (socket.readyState === WebSocket.OPEN) {
                if (webcamRef.current) {
                    const canvas = webcamRef.current.getCanvas();
                    if (canvas) {
                        canvas.toBlob(async (blob) => {
                            if (blob) {
                                const reader = new FileReader();
                                reader.onload = (event) => {
                                    if (event.target) {
                                        const frameData = event.target.result;
                                        //console.log(frameData.byteLength)
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


        const interval = setInterval(sendFrame, 50); // Adjust the frame rate as needed

        return () => {
            clearInterval(interval);
            if (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING) {
                socket.close(); // Close the WebSocket connection when the component unmounts
            }
        };
    }, []);

    return (
        <div>
            {/*{devices.map((device, key) => (
                <div>
                    <Webcam audio={false} videoConstraints={{ deviceId: device.deviceId }} />
                    {device.label || `Device ${key + 1}`}
                </div>

            ))}*/}

            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                mirrored={true}
                videoConstraints={{
                    height: 720,
                    width: 1280,
                    deviceId: 2
                }}
            />

        </div>

    );
};

export default test;