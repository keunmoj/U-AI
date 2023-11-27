# :runner: 상호작용 AI 안전 교육 서비스, U-AI

인공지능 영상 기술을 활용한 아동 대상 상호작용 AI 동화 안전 교육 서비스

<br/>

## :books: 목차

1. [프로젝트 개요](#speech_balloon-프로젝트-개요)

2. [주요 기능](#loudspeaker-주요-기능)

3. [기대 효과](#sunny-기대-효과)

4. [기술 스택](#black_nib-기술-스택)

5. [시스템 아키텍처](#open_file_folder-시스템-아키텍처)

6. [와이어 프레임](#microscope-와이어-프레임)

7. [요구사항 명세서](#memo-요구사항-명세서)

8. [API 명세서](#pencil2-api-명세서)

9. [결과물](#trophy-결과물)

10. [팀원 소개](#family-팀원-소개)

<br/>

## :speech_balloon: 프로젝트 개요

- 진행 기간 : 2023.08.21 ~ 2023.10.06

- 프로젝트 목표 : 인공지능 영상 기술을 활용하여 어린이들이 직접 참여하며 진행하는 안전 교육 서비스를 개발합니다.

- 기획 배경 : 어린이들에게 필수적인 안전 교육을 단체 상호작용을 통해 진행함으로써 아동의 흥미와 참여도를 제고하고자 합니다.

<br/>

## :loudspeaker: 주요 기능

### 랜딩 페이지

<img title="" src="README/랜딩페이지.png" alt="랜딩" width="615">

- 교육을 받는 단체 이름과 인원 수를 입력 받습니다.

<br/>

### 메인페이지

<img title="" src="README/메인페이지.png" alt="메인" width="615">

- 소방, 예절, 교통 교육 중 테마를 선택할 수 있으며, `?` 아이콘을 클릭하면 진행 방법을 설명하는 튜토리얼을 확인할 수 있습니다.

<br/>

### 튜토리얼

<img title="" src="README/튜토리얼페이지.png" alt="튜토리얼" width="615">

- 상호작용을 통해 진행되는 부분에 대해 튜토리얼을 통해 진행 방법을 안내합니다.

<br/>

### 스토리 진행

<img title="" src="README/커버페이지.png" alt="커버" width="615">

- 학습 목표와 준비물을 포함한 표지를 통해 교육 시작 전 흥미를 유발합니다.

<img title="" src="README/ox페이지.JPEG" alt="ox" width="615">

- 다중 객체 인식을 통해 사람 수를 파악하여 스토리를 진행합니다.

<img title="" src="README/stt페이지.png" alt="stt" width="615">

- STT를 활용하여 아동이 소리를 외치면 정확도를 판단하여 다시 외치도록 유도하거나, 다음 페이지로 이동합니다.

<img title="" src="README/모션인식페이지.JPEG" alt="모션" width="615">

- 판다의 동작을 따라하고, 정확도를 판단하여 정확한 동작을 하면 다음 페이지로 이동합니다.

<img title="" src="README/ocr페이지.JPEG" alt="ocr" width="615">

- 퀴즈의 정답을 화이트보드에 작성하면, 이를 인식하여 몇 명이 정답을 맞혔는지 제공합니다.

<img title="" src="README/판다페이지.png" alt="판다" width="615">

- 친근한 판다 캐릭터를 통해 아동들의 관심을 유도합니다.

<img title="" src="README/캡처페이지.JPEG" alt="캡처" width="615">

- 활동 사진을 스토리 마지막에 제공하며, 클릭 시 사진 파일 다운로드가 가능합니다.

<br/>

## :sunny: 기대 효과

- 아동에게 필수적인 안전 교육을 실제 활동을 통해 더욱 효과적으로 학습할 수 있습니다.

- 어린이집 등 단체 교육에 용이하게 활용 가능합니다.

- 상호작용을 통한 직접적인 참여로 아이들의 흥미를 유발할 수 있습니다.

<br/>

## :black_nib: 기술 스택

- Front-end : `React`, `Next.js`, `TypeScript`, `Three.js`, `Styled-component`

- Back-end : `JAVA`, `Spring Boot`, `Django`, `Pytorch`

- 협업 Tool : `GitLab`, `JIRA`, `Notion`, `MatterMost`, `Discord`, `Figma`

<br/>

## :open_file_folder: 시스템 아키텍처

<img title="" src="README/architecture.png" alt="아키텍처" width="615">

<br/>

## :microscope: 와이어 프레임

<img title="" src="README/와이어프레임.png" alt="와이어프레임" width="615">

<br/>

## :memo: 요구사항 명세서

<img title="" src="README/요구사항_명세서1.png" alt="요구사항_명세서1" width="615">

<img title="" src="README/요구사항_명세서2.png" alt="요구사항_명세서2" width="615">

<br/>

## :pencil2: API 명세서

<img title="" src="README/api_모션인식.png" alt="api1" width="615">

<img title="" src="README/api_ox.png" alt="api2" width="615">

<img title="" src="README/api_ocr.png" alt="api3" width="615">

<img title="" src="README/api_음성인식.png" alt="api4" width="615">

<br/>

## :trophy: 결과물

- [중간 발표 자료](https://pusanackr-my.sharepoint.com/:b:/g/personal/dms5474_pusan_ac_kr/EdYfrfbSQK1AmbHjr76aG4ABV8LxUfg7SpzbedS7987-tQ?e=ZzXzLH)
- [최종 발표 자료](https://pusanackr-my.sharepoint.com/:b:/g/personal/dms5474_pusan_ac_kr/Ed9kCHgnj-NNkQkg6hxphIoBCc6rLg9zOEChNYiSMZ2ejA?e=L5T4Al)
- [UCC](https://pusanackr-my.sharepoint.com/:v:/g/personal/dms5474_pusan_ac_kr/EZwTi-auz_lMvhtIYoo9W30BCF7K1JFNEK_eUiw7RzHyBg?nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJPbmVEcml2ZUZvckJ1c2luZXNzIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXciLCJyZWZlcnJhbFZpZXciOiJNeUZpbGVzTGlua0RpcmVjdCJ9fQ&e=JqfjY2)

<br/>

## :family: 팀원 소개



[BE]

- **이강민** : 스크럼 마스터, 백엔드 주요 API 개발, 서버 아키텍처 설계, 통합 및 배포, AI 데이터 학습 및 채택

- **정근모** : 백엔드 주요 API 개발, stt 기능 개발 및 다중 객체 ocr 개발(AI), UCC 제작, 소켓 통신

[FE]

- **곽은정** : 화재 교육 전체 페이지 구성, STT 클라이언트, 활동 사진 제공 기능 구현, 시작폼 및 커버 페이지 제작

- **전대현** : 스토리 디자인 및 에셋 제작, 튜토리얼 페이지 제작

- **정영록** : 캐릭터 생성 및 애니메이션 제작, OCR 기능 연결 및 테스트, 커스텀 훅 사용 및 캠 설정 기능 구현

- **정훈석** : Motion Event 및 OX Event 연결 WebCamHook 구현, 랜딩 및 메인 페이지 제작, audio 구현
