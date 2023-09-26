import styled, { css } from "styled-components";

export const StyledStoryContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 4vh;
  height : 55vh;  
  width : 85vw;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}
`

export const StyledStoryCam = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height : 100vh;
  width : 100vw;
`

export const StyledCamText = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  font-size: ${props => props.theme.fontSizes.xxxlarge};
  font-weight: bold;
  text-align: center;
  background-color: rgb(225, 168, 108);
  color: black;
  width : 100vw;
  height: auto;
  margin-top: 3vh;
  padding-top: 1rem;
  padding-bottom: 1rem;
`

export const StyledCamImg = styled.div`
  position: absolute;
  top: 3.5rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: auto;
  z-index: 1;
`

export const StyledStoryText = styled.div`
  width: auto;
  height: auto;
  font-size: ${props => props.theme.fontSizes.xxlarge};
  font-weight: bold;
  text-align: center;
  white-space: pre-line;
  margin-top: 1.2rem;
`

export const StyledStoryImage = styled.img.attrs(props => ({
  style: {
    height: props.height || '100%',
    width: props.width || 'auto',
    /* max-width : 800px;
    max-height : 400px;

    @media (max-width: 1200px) {
      max-width: 600px;
      max-height: 300px;
    }

    @media (max-width: 800px) {
      max-width: 400px;
      max-height: 200px;
    } */
  },
}))`
`;

export const StyledQuizBox = styled.div`
  position: absolute;
  top: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: auto;
  font-size: 4rem; 
  color: white; 
  font-weight: bold; 
  padding: 1rem 1rem;
  margin-top: 3vh;
`

export const StyledTimer = styled.div`
  font-size: 20rem;
  font-weight: bold;
  color: red;
  z-index: 3;
  position: absolute;
  width: 100%;
  top: 30vh;
  text-align: center;
`

export const StyledLeft = styled.div`
  font-size: 13rem;
  font-weight: bold;
  color: lightgreen;
  z-index: 3;
  position: absolute;
  width: 100%;
  top : -0.5vw;
  right : 8vw;
  text-align: center;
`

export const StyledRight = styled.div`
  font-size: 13rem;
  font-weight: bold;
  color: lightgreen;
  z-index: 3;
  position: absolute;
  width: 100%;
  top : -0.5vw;
  left : 8vw;
  text-align: center;
`

// export const StyledLeft = styled.div`
//   font-size: 20rem;
//   font-weight: bold;
//   color: red;
//   z-index: 3;
//   position: absolute;
//   width: 100%;
//   top: 10vh;
//   text-align: left;
// `

// export const StyledRight = styled.div`
//   font-size: 20rem;
//   font-weight: bold;
//   color: red;
//   z-index: 3;
//   position: absolute;
//   width: 100%;
//   top: 10vh;
//   text-align: right;
// `

export const StyledSpan = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  height: auto;
  margin-top: 3vh;
`

export const StyledLine = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%);
  width: 2vw;
  height: 100vh;
  background-image: url('resources/line2.png');
  background-size: cover;
  z-index: 2;
`


export const StyledBorders = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
`;

export const BorderHeight = styled.div`
  position: fixed;
  top: 0;
  width: 2vw;
  height: 100vh;
  background-image: url('resources/line2.png');
  background-size: cover;
  z-index: 2;

 &:first-child {
    left:0;
 }

 &:last-child {
    right:0;
 }
`;


export const BorderWidth = styled.div`
  position: fixed;
  left: 0;
  width: 100vw;
  height: 3vh;
  background-image: url('resources/line1.png');
  background-size: cover;
  z-index: 2;

 &:first-child {
  top: 0;
 }

 &:last-child {
  bottom: 0;
 }

`