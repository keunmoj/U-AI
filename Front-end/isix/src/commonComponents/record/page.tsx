"use client"
import { useEffect, useRef, useState } from 'react';
import axios from "axios";

const Record = () => {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const formData: FormData = new FormData();
  const [start, setStart] = useState(false);

  useEffect(() => {
    const startRecording = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;

        let chunks: BlobPart[] = [];
        mediaRecorder.ondataavailable = (e) => {
          if (e.data) {
            chunks.push(e.data);
          }

          if (mediaRecorder.state === 'inactive') {
            const blob = new Blob(chunks, { type: 'audio/mp3' });
            // mp3 파일 생성
            const mp3File = new File([blob], "recorded-audio.mp3", {
              type: "audio/mp3"
            });

            const textData: string = "fire";
            formData.append("mp3File", mp3File);
            formData.append("textData", textData);

            sendFormDataToServer(formData);
          }
        };

        // 2초 뒤 녹음 시작
        setTimeout(() => {
          mediaRecorder.start();
          console.log('start');
          setStart(true);
        }, 2000);

        // 5초 뒤 녹음 종료(3초간 녹음)
        setTimeout(() => {
          if (mediaRecorder.state === 'recording') {
            mediaRecorder.stop();
            console.log('end');
          }
        }, 5000);

      } catch (err) {
        console.error(err);
      }
    };

    const sendFormDataToServer = async (formData: FormData) => {
      try {
        const response = await axios.post('http://127.0.0.1:8000/voice/api/voicerecognition/', formData);
        console.log('res: ', response.data);
      } catch (err) {
        console.log(err);
      }
    };

    startRecording();

    return () => {
      if (mediaRecorderRef.current) {
        const tracks = mediaRecorderRef.current.stream.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div>
      {start && 
        <h1>녹음 중</h1>
      }
    </div>
  );
};

export default Record;