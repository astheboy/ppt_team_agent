const fs = require('fs');
const path = require('path');

const outputDir = '/Users/hanseungryun/Dev/ppt_team_agent/.claude/brain/slides';

// Cozy-Water themed colors
const theme = {
  bg: '#f0f9ff', // Sky 50
  primary: '#0ea5e9', // Sky 500
  secondary: '#22d3ee', // Cyan 400
  accent: '#fbbf24', // Amber 400
  hot: '#f97316', // Orange 500
  cold: '#3b82f6', // Blue 500
  happy: '#10b981', // Emerald 500
  cardBg: '#ffffff',
  headerBg: '#0c4a6e', // Sky 900
  textMain: '#0f172a', // Slate 900
  textMuted: '#64748b',
  thinkingBg: '#0369a1', // Sky 700
  activityBg: '#0f766e', // Teal 700
};

const commonStyle = `
  <style>
    html { background: ${theme.bg}; }
    body {
      width: 720pt; height: 405pt; margin: 0; padding: 0;
      font-family: Arial, sans-serif;
      display: flex; flex-direction: column;
      color: ${theme.textMain};
      background: ${theme.bg};
      overflow: hidden;
    }
    .slide-container {
      padding: 15pt 25pt;
      display: flex; flex-direction: column;
      flex: 1;
      box-sizing: border-box;
    }
    .header {
      border-left: 5pt solid ${theme.primary};
      padding-left: 10pt;
      margin-bottom: 8pt;
    }
    h1 { margin: 0; font-size: 24pt; color: ${theme.textMain}; line-height: 1.1; }
    
    .process-container {
      display: flex;
      gap: 8pt;
      margin-top: 5pt;
    }
    .process-tag {
      padding: 3pt 8pt;
      border-radius: 4pt;
      font-size: 10pt;
      font-weight: bold;
      color: white;
    }
    .tag-thinking { background: ${theme.thinkingBg}; border: 1pt solid #0ea5e9; }
    .tag-activity { background: ${theme.activityBg}; border: 1pt solid #14b8a6; }

    .content-box {
      background: ${theme.cardBg};
      padding: 10pt;
      border-radius: 8pt;
      border: 1pt solid #e0f2fe;
      flex: 1;
      display: flex; flex-direction: column;
      min-height: 0;
    }
    p, li { font-size: 13pt; line-height: 1.4; margin: 0; }
    .bullet-list { margin: 0; padding-left: 15pt; list-style: none; }
    .bullet-list li { margin-bottom: 5pt; position: relative; }
    .bullet-list li::before {
      content: "🛁";
      font-size: 10pt;
      display: inline-block;
      width: 1.5em;
      margin-left: -1.5em;
    }
    .guide-box {
      background: #f0f9ff;
      border-radius: 5pt;
      padding: 5pt;
      margin-top: 6pt;
      border-left: 3pt solid ${theme.primary};
    }
    .guide-box p { font-size: 9.5pt; color: #0369a1; line-height: 1.2; }
    .script-box {
      background: #fdfcfb;
      border-radius: 5pt;
      padding: 5pt;
      margin-top: 4pt;
      border-left: 3pt solid ${theme.accent};
    }
    .script-box p { font-size: 9.5pt; color: #92400e; font-style: italic; }
    .footer {
      margin-top: auto;
      text-align: right;
    }
    .footer p {
      font-size: 8.5pt;
      color: ${theme.textMuted};
      margin: 3pt 0 0 0;
    }
    .highlight { color: ${theme.primary}; font-weight: bold; }
    .icon-box { font-size: 40pt; text-align: center; margin: 5pt 0; }
    .bubble {
      width: 15pt; height: 15pt;
      border: 1.5pt solid ${theme.secondary};
      border-radius: 50%;
      position: absolute;
      opacity: 0.6;
    }
  </style>
`;

const slides = [
  {
    name: 'slide01',
    content: `
      <div style="background: ${theme.headerBg}; color: white; display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%; border-radius: 0;">
        <p style="font-size: 16pt; color: ${theme.secondary}; margin-bottom: 5pt; font-weight: bold;">[프로젝트]</p>
        <h1 style="color: white; font-size: 30pt; text-align: center; margin-bottom: 15pt; line-height: 1.2;">우리 집 강아지가 행복해하는!<br>스마트 욕조 만들기</h1>
        <p style="font-size: 14pt; opacity: 0.8;">수온 센서로 물의 온도를 감지하고 캐릭터와 대화해요</p>
        <div class="icon-box"><p>🐕 🫧 🌡️</p></div>
      </div>
    `,
    noLayout: true
  },
  {
    title: '[도입] 스마트 욕조가 왜 필요할까요?',
    thinking: '생활 속 불편함 찾기 및 기술적 해결책 모색',
    activity: '강아지가 좋아하는 물의 온도 알아보고 온도 확인 방법 생각하기',
    content: `
      <div class="content-box">
        <ul class="bullet-list">
          <li>강아지는 사람보다 온도에 민감해요</li>
          <li>목욕 중 물이 식거나 너무 뜨거워지면 위험해요</li>
          <li>강아지의 상태를 실시간으로 확인하면 즐겁게 목욕할 수 있어요</li>
        </ul>
        <div class="guide-box">
          <p><b>선생님 가이드</b>: 사람이 느끼는 온도보다 강아지에게 적당한 온도를 유지하는 기술의 세심함을 강조합니다.</p>
        </div>
        <div class="script-box">
          <p><b>스크립트</b>: "우리 강아지 목욕시킬 때, 물이 너무 뜨겁거나 차갑지는 않을까 걱정해 본 적 있나요? 오늘은 강아지가 직접 말해주는 스마트 욕조를 만들어 볼 거예요."</p>
        </div>
      </div>
    `
  },
  {
    title: '[설계] 한눈에 보이는 대시보드 (UI)',
    thinking: '정보의 위계 및 시각적 요소 구성',
    activity: '화면 내 제목, 온도 숫자, 강아지 캐릭터가 들어갈 위치 잡기',
    content: `
      <div class="content-box">
        <div style="border: 2pt dashed ${theme.primary}; border-radius: 10pt; flex: 1; padding: 10pt; display: flex; flex-direction: column; align-items: center; justify-content: space-between; background: #f0f9ff;">
            <p style="font-size: 14pt; font-weight: bold;">[ SMART BATHTUB ]</p>
            <p style="font-size: 40pt;">🐶</p>
            <p style="font-size: 20pt; font-weight: bold; color: ${theme.primary};">32.5 °C</p>
            <div style="background: white; border: 1pt solid #ddd; padding: 5pt 15pt; border-radius: 15pt;"><p style="font-size: 10pt;">"나는 지금 행복해요!"</p></div>
        </div>
        <div class="guide-box">
          <p><b>선생님 가이드</b>: 가장 중요한 정보인 '현재 온도'와 캐릭터가 화면 중앙에서 잘 보여야 함을 설명합니다.</p>
        </div>
        <div class="script-box">
          <p><b>스크립트</b>: "온도계와 강아지가 어디에 있으면 좋을까요? 우리가 멀리서도 잘 보일 수 있게 화면을 꾸며봅시다."</p>
        </div>
      </div>
    `
  },
  {
    title: '[준비] 물속 온도를 재는 수온 센서',
    thinking: '사용 환경에 맞는 부품 선정',
    activity: 'EZmaker 보드와 방수가 되는 수온 센서 준비하기',
    content: `
      <div class="content-box">
        <div style="display: flex; gap: 20pt; justify-content: center; align-items: center; flex: 1;">
          <div style="text-align: center;">
              <p style="font-size: 35pt;">📟</p>
              <p style="font-size: 9pt;">EZmaker</p>
          </div>
          <div style="font-size: 20pt; color: ${theme.primary};"><p>+</p></div>
          <div style="text-align: center;">
              <p style="font-size: 35pt;">🔌</p>
              <p style="font-size: 9pt;">수온 센서(DS18B20 등)</p>
          </div>
        </div>
        <div class="guide-box">
          <p><b>선생님 가이드</b>: 물속에서도 안전하게 작동하는 '방수' 기능의 중요성을 설명합니다.</p>
        </div>
        <div class="script-box">
          <p><b>스크립트</b>: "물속에서 온도를 재려면 특별한 센서가 필요해요. 물이 들어가도 고장 나지 않는 수온 센서를 찾아봅시다."</p>
        </div>
      </div>
    `
  },
  {
    title: '[연결] 수온 센서 안전하게 연결하기',
    thinking: '전기 신호의 전달 경로 구축',
    activity: '센서 핀(VCC, TX, RX, GND)을 EZmaker 보드에 알맞게 연결하기',
    content: `
      <div class="content-box">
        <div style="background: white; border: 1.5pt solid ${theme.primary}; border-radius: 8pt; padding: 10pt; flex: 1; display: flex; flex-direction: column; justify-content: center;">
            <ul class="bullet-list">
              <li>빨간색 (VCC) ➔ <span style="color: #ef4444; font-weight: bold;">3.3V 또는 5V</span></li>
              <li>노란색/흰색 (Data) ➔ <span style="color: #0ea5e9; font-weight: bold;">Digital D2</span></li>
              <li>검정색 (GND) ➔ <span style="color: #64748b; font-weight: bold;">GND</span></li>
            </ul>
        </div>
        <div class="guide-box">
          <p><b>선생님 가이드</b>: 선의 색상이나 핀 번호가 정확한지 다시 한번 확인하게 합니다.</p>
        </div>
        <div class="script-box">
          <p><b>스크립트</b>: "센서의 선을 EZmaker에 연결해 볼까요? 물에 닿는 부분과 보드가 연결되는 부분을 잘 살펴보고 꽂아주세요."</p>
        </div>
      </div>
    `
  },
  {
    title: '[논리 1] 온도별 강아지 상태 정의하기',
    thinking: '데이터 값에 따른 상태 분류 (Decision)',
    activity: '온도를 세 가지 범위(추워요, 행복해요, 뜨거워요)로 기준 정하기',
    content: `
      <div class="content-box">
        <div style="background: #e0f2fe; border-radius: 8pt; padding: 8pt; flex: 1; display: flex; flex-direction: column; justify-content: center; gap: 4pt;">
            <div style="font-size: 11pt; display: flex; justify-content: space-between; background: ${theme.cold}; color: white; padding: 5pt; border-radius: 4pt;"><span>30°C 이하</span><span>❄️ 너무 추워요</span></div>
            <div style="font-size: 11pt; display: flex; justify-content: space-between; background: ${theme.happy}; color: white; padding: 5pt; border-radius: 4pt;"><span>30~38°C</span><span>😊 행복해요</span></div>
            <div style="font-size: 11pt; display: flex; justify-content: space-between; background: ${theme.hot}; color: white; padding: 5pt; border-radius: 4pt;"><span>38°C 초과</span><span>🔥 너무 뜨거워요</span></div>
        </div>
        <div class="guide-box">
          <p><b>선생님 가이드</b>: 강아지에게 적당한 온도를 유지하는 논리적 기준을 세웁니다.</p>
        </div>
        <div class="script-box">
          <p><b>스크립트</b>: "온도가 몇 도일 때 강아지가 가장 기분이 좋을까요? 30도에서 38도 사이는 '행복'이라고 약속해 봅시다."</p>
        </div>
      </div>
    `
  },
  {
    title: '[논리 2] 변하는 배경과 메시지',
    thinking: '조건에 따른 출력 요소 일치시키기 (Mapping)',
    activity: '온도 상태에 따라 어떤 배경색과 메시지를 출력할지 결정하기',
    content: `
      <div class="content-box">
        <div style="display: flex; gap: 10pt; align-items: center; justify-content: center; flex: 1;">
          <div style="background: #bfdbfe; width: 40pt; height: 40pt; border-radius: 5pt; display: flex; align-items: center; justify-content: center;"><p>🥶</p></div>
          <div style="color: ${theme.primary}; font-weight: bold;"><p>➔</p></div>
          <div style="background: #fdf2f8; width: 40pt; height: 40pt; border-radius: 5pt; display: flex; align-items: center; justify-content: center;"><p>💖</p></div>
          <div style="color: ${theme.primary}; font-weight: bold;"><p>➔</p></div>
          <div style="background: #fed7aa; width: 40pt; height: 40pt; border-radius: 5pt; display: flex; align-items: center; justify-content: center;"><p>🥵</p></div>
        </div>
        <div class="guide-box">
          <p><b>선생님 가이드</b>: 색감의 상징성(파랑-차갑다, 주황-뜨겁다)을 활용하여 직관적인 UI를 구성합니다.</p>
        </div>
        <div class="script-box">
          <p><b>스크립트</b>: "온도가 바뀌면 화면 색상도 함께 바뀌게 하면 어떨까요? 추우면 덜덜 떠는 파란색 배경으로 바꿔봅시다."</p>
        </div>
      </div>
    `
  },
  {
    title: '[코딩] 실시간 수온 데이터 전송',
    thinking: '지속적인 데이터 스트리밍 구현',
    activity: '온도 센서 값을 읽어 실시간으로 웹앱으로 전송하는 코드 만들기',
    content: `
      <div class="content-box">
        <div style="background: #0c4a6e; color: white; border-radius: 8pt; padding: 12pt; font-family: monospace; font-size: 11pt; flex: 1;">
          <p style="color: #f472b6;">[제어] 무한 반복하기</p>
          <p style="color: #38bdf8; margin-left:15pt;">[통신] 데이터 전송 ( [센서] 온도 센서(D2) )</p>
          <p style="color: #94a3b8; margin-left:15pt;">[제어] 0.1초 기다리기</p>
        </div>
        <div class="guide-box">
          <p><b>선생님 가이드</b>: 실시간 온도 변화를 감지하기 위해 무한 반복 블록을 사용합니다.</p>
        </div>
        <div class="script-box">
          <p><b>스크립트</b>: "이제 센서가 읽은 따뜻한 온도를 웹앱으로 슝~ 보내봅시다. '무한 반복하기' 블록이 꼭 필요해요!"</p>
        </div>
      </div>
    `
  },
  {
    title: '[바이브 1] 강아지 리액션 앱 만들기',
    thinking: '자연어 명령으로 상태 로직 구현',
    activity: '"온도에 따라 강아지가 떨거나 웃는 리액션 보여주는 앱 만들어줘" 요청하기',
    content: `
      <div class="content-box">
        <div style="background: #f0f9ff; padding: 8pt; border-radius: 8pt; border: 1pt dashed ${theme.primary}; margin-bottom: 5pt;">
          <p style="font-weight: bold; color: ${theme.primary}; margin-bottom: 3pt;">💬 AI Prompt</p>
          <p style="font-size: 10pt;">"물의 온도가 30도 이하면 덜덜 떨고, 38도 초과면 땀을 뻘뻘 흘리는 강아지 앱을 만들어줘."</p>
        </div>
        <div style="flex: 1; display: flex; justify-content: space-around; align-items: center;">
             <div style="text-align: center;"><p style="font-size: 30pt;">🥶</p><p style="font-size: 8pt;">Too Cold</p></div>
             <div style="text-align: center;"><p style="font-size: 30pt;">😊</p><p style="font-size: 8pt;">Happy</p></div>
             <div style="text-align: center;"><p style="font-size: 30pt;">🥵</p><p style="font-size: 8pt;">Too Hot</p></div>
        </div>
        <div class="guide-box">
          <p><b>선생님 가이드</b>: 앞에서 정한 온도 범위를 AI에게 구체적으로 전달하게 합니다.</p>
        </div>
        <div class="script-box">
          <p><b>스크립트</b>: "바이브 AI에게 우리의 규칙을 알려줍시다. '30도 이하면 추워서 덜덜 떠는 강아지를 그려줘'라고 말해볼까요?"</p>
        </div>
      </div>
    `
  },
  {
    title: '[실행] 따뜻한 물, 차가운 물 테스트',
    thinking: '프로젝트 결과물 검증',
    activity: '센서를 물에 번갈아 넣으며 강아지의 반응 확인하기',
    content: `
      <div class="content-box">
        <div style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; background: #fafaf9; border-radius: 10pt;">
          <p style="font-size: 12pt; opacity: 0.6;">Water Temperature</p>
          <p style="font-size: 45pt; font-weight: bold; color: ${theme.cold};">24.8 °C</p>
          <p style="font-size: 15pt; margin-top: 5pt;">Puppy: <span style="color: ${theme.cold};">"으으~ 너무 추워요!"</span></p>
        </div>
        <div class="guide-box">
          <p><b>선생님 가이드</b>: 수온 센서가 실제 주변 온도를 정확하게 읽는지 확인합니다.</p>
        </div>
        <div class="script-box">
          <p><b>스크립트</b>: "자, 준비한 물에 센서를 넣어봐요. 강아지가 행복해하나요? 아니면 너무 뜨거워하나요?"</p>
        </div>
      </div>
    `
  },
  {
    title: '[기능 추가 1] 뽀글뽀글 비눗방울 효과',
    thinking: '시각적 피드백의 완성도 높이기',
    activity: '"행복한 온도일 때만 비눗방울이 올라오게 해줘" 요청하기',
    content: `
      <div class="content-box">
        <div style="flex: 1; position: relative; display: flex; align-items: center; justify-content: center; overflow: hidden; background: #ecfdf5; border-radius: 8pt;">
            <p style="font-size: 50pt; z-index: 2;">🐶</p>
            <div class="bubble" style="bottom: 10pt; left: 50pt;"></div>
            <div class="bubble" style="bottom: 30pt; right: 60pt;"></div>
            <div class="bubble" style="bottom: 50pt; left: 100pt; width: 8pt; height: 8pt;"></div>
            <p style="position: absolute; bottom: 10pt; width: 100%; text-align: center; color: ${theme.happy}; font-weight: bold; font-size: 10pt;">🫧 BUBBLE MODE 🫧</p>
        </div>
        <div class="guide-box">
          <p><b>선생님 가이드</b>: 특정 조건문 내에서 애니메이션을 실행하는 원리를 이해합니다.</p>
        </div>
        <div class="script-box">
          <p><b>스크립트</b>: "가장 기분 좋은 온도일 때 비눗방울이 뽀글뽀글 올라오면 훨씬 더 욕조 느낌이 나겠죠?"</p>
        </div>
      </div>
    `
  },
  {
    title: '[기능 추가 2] 부드러운 배경색 전환',
    thinking: '사용자 경험(UX) 최적화',
    activity: '"온도가 바뀔 때 배경색이 부드럽게 변하게 해줘" 요청하기',
    content: `
      <div class="content-box">
        <div style="flex: 1; display: flex; align-items: center; justify-content: center;">
            <div style="width: 150pt; height: 30pt; background: ${theme.primary}; border-radius: 15pt;"></div>
        </div>
        <ul class="bullet-list" style="margin-top: 10pt;">
          <li style="font-size: 11pt;">css transition 속성 활용하기</li>
          <li style="font-size: 11pt;">색상이 서서히 바뀌어 눈이 편안해짐</li>
        </ul>
        <div class="guide-box">
          <p><b>선생님 가이드</b>: 기술이 감동을 줄 수 있는 세심한 포인트(CSS 전환)를 경험합니다.</p>
        </div>
        <div class="script-box">
          <p><b>스크립트</b>: "온도가 조금씩 오를 때 화면 색상도 서서히 바뀌게 해봅시다. 우리 눈이 훨씬 편안해질 거예요."</p>
        </div>
      </div>
    `
  },
  {
    title: '[테스트] 완벽한 스마트 욕조 점검',
    thinking: '통합 시스템 디버깅',
    activity: '온도별 애니메이션과 배경색이 모두 정상인지 점검하기',
    content: `
      <div class="content-box">
        <ul class="bullet-list" style="flex: 1;">
          <li>30~38도에서 비눗방울이 나타나나요?</li>
          <li>강아지의 상태 메시지가 온도와 일치하나요?</li>
          <li>배경색이 자연스럽게 변하나요?</li>
        </ul>
        <div class="guide-box">
          <p><b>선생님 가이드</b>: 모든 기능이 의도한 조건에서 정확히 작동하는지 확인합니다.</p>
        </div>
        <div class="script-box">
          <p><b>스크립트</b>: "우리가 만든 욕조가 완벽한지 다 같이 테스트해 봐요. 비눗방울도 잘 올라오고 색깔도 예쁘게 변하나요?"</p>
        </div>
      </div>
    `
  },
  {
    title: '[정리] AI로 만드는 따뜻한 세상',
    thinking: '기술의 가치 내면화 및 확장 상상',
    activity: '동물을 돕는 또 다른 스마트 장치 아이디어 나누기',
    content: `
      <div class="content-box">
        <div style="display: flex; gap: 15pt; justify-content: center; align-items: center; flex: 1;">
           <div style="text-align: center;"><p style="font-size: 35pt;">🥘</p><p style="font-size: 9pt;">자동 급식기</p></div>
           <div style="text-align: center;"><p style="font-size: 35pt;">🎾</p><p style="font-size: 9pt;">놀이 로봇</p></div>
           <div style="text-align: center;"><p style="font-size: 35pt;">🏠</p><p style="font-size: 9pt;">스마트 집</p></div>
        </div>
        <div class="guide-box">
          <p><b>선생님 가이드</b>: 코딩 기술이 주변 생명을 돌보고 행복하게 할 수 있음을 일깨웁니다.</p>
        </div>
        <div class="script-box">
          <p><b>스크립트</b>: "오늘 우리는 강아지를 위한 따뜻한 마음을 코딩했어요. 다음엔 어떤 동물을 도와주는 발명품을 만들어보고 싶나요?"</p>
        </div>
      </div>
    `
  }
];

slides.forEach((slide, index) => {
  const fileName = `slide${(index + 1).toString().padStart(2, '0')}.html`;
  const filePath = path.join(outputDir, fileName);

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  ${commonStyle}
</head>
<body>
  ${slide.noLayout ? slide.content : `
    <div class="slide-container">
      <div class="header">
        <h1>${slide.title}</h1>
        <div class="process-container">
          <div class="process-tag tag-thinking"><p>사고 과정: ${slide.thinking}</p></div>
          <div class="process-tag tag-activity"><p>활동: ${slide.activity}</p></div>
        </div>
      </div>
      ${slide.content}
      <div class="footer">
        <p>스마트 욕조 만들기 | Slide ${index + 1}</p>
      </div>
    </div>
  `}
</body>
</html>
  `.trim();

  fs.writeFileSync(filePath, html);
  console.log(`Generated ${fileName}`);
});
