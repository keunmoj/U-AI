import { useEffect, useState } from "react"
import { StyledStoryCam, StyledTimer, StyledQuizBox, StyledCamText, StyledBorders, BorderHeight, BorderWidth } from "../../Story.styled"
import CamComponent from "@/commonComponents/story/camComponent";
import AudioPlayer from "@/commonComponents/story/audioComponent"
import HomeButton from "@/commonComponents/story/homeButtonComponent";
import useOcrCorrect from "@/stores/ocr/useOcrCorrect";

interface WebcamProps {
  videoElm: JSX.Element;
  hiddenCanvasElm: JSX.Element; 
  startStream: () => void;
  stopStream: () => void;
  ocrEvent: any;
}


const Repeat3: React.FC<WebcamProps> = ({ startStream, stopStream, videoElm, hiddenCanvasElm, ocrEvent}) => {
  const text: string = '불을 끄고 사람을 구해주는 분들은 누구일까요?'
  const audioUrl: string = '/resources/audioFile/repeat3.mp3'
  const answer = "소방관";

  const [timer, setTimer] = useState<number>(-1);
  const {correct, setCorrect} = useOcrCorrect();

  useEffect(() => {
    setCorrect(0);
    const timeoutId = setTimeout(() => {
      setTimer(10);
    }, 3000);
    
    setTimeout(() => {
      ocrEvent(answer);
    },8000)

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (0 < timer) {
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    }    
  }, [timer]);


  return (
    <>
      <StyledBorders>
        <BorderHeight />
        <BorderHeight />
      </StyledBorders>
      <StyledBorders>
        <BorderWidth />
        <BorderWidth />
      </StyledBorders>  

      <StyledCamText>{text}</StyledCamText>
      <StyledStoryCam>
        <CamComponent videoElm={videoElm} hiddenCanvasElm = { hiddenCanvasElm } startStream = {startStream} stopStream={stopStream} />
        <StyledQuizBox>
          <StyledTimer>{timer > 0 ? timer : ''}</StyledTimer>
        </StyledQuizBox>
      </StyledStoryCam>
      <AudioPlayer file={audioUrl} />
      <HomeButton />
    </>
  )
}

export default Repeat3
