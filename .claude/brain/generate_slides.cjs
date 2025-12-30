const fs = require('fs');
const path = require('path');

const outputDir = '/Users/hanseungryun/Dev/ppt_team_agent/.claude/brain/slides';

// AI-Tech themed colors (Dark Mode with Neon)
const theme = {
  bg: '#0f172a', // Slate 900
  primary: '#38bdf8', // Sky 400
  secondary: '#818cf8', // Indigo 400
  accent: '#f472b6', // Pink 400
  cardBg: '#1e293b', // Slate 800
  headerBg: '#0f172a',
  textMain: '#f1f5f9', // Slate 100
  textMuted: '#94a3b8',
  thinkingBg: '#334155', // Slate 700
  activityBg: '#1e3a8a', // Blue 900
};

const commonStyle = `
  <style>
    html { background: ${theme.bg}; }
    body {
      width: 720pt; height: 405pt; margin: 0; padding: 0;
      font-family: 'Segoe UI', Arial, sans-serif;
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
    h1 { margin: 0; font-size: 24pt; color: ${theme.primary}; line-height: 1.1; }
    
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
    .tag-thinking { background: ${theme.thinkingBg}; border: 1pt solid ${theme.primary}; }
    .tag-activity { background: ${theme.activityBg}; border: 1pt solid ${theme.secondary}; }

    .content-box {
      background: ${theme.cardBg};
      padding: 12pt;
      border-radius: 10pt;
      border: 1pt solid #334155;
      flex: 1;
      display: flex; flex-direction: column;
      min-height: 0;
      box-shadow: 0 4pt 10pt rgba(0,0,0,0.3);
    }
    p, li { font-size: 13pt; line-height: 1.4; margin: 0; }
    .bullet-list { margin: 0; padding-left: 15pt; list-style: none; }
    .bullet-list li { margin-bottom: 5pt; position: relative; }
    .bullet-list li::before {
      content: "✨";
      font-size: 10pt;
      display: inline-block;
      width: 1.5em;
      margin-left: -1.5em;
    }
    .guide-box {
      background: rgba(56, 189, 248, 0.1);
      border-radius: 5pt;
      padding: 5pt;
      margin-top: 6pt;
      border-left: 3pt solid ${theme.primary};
    }
    .guide-box p { font-size: 9.5pt; color: ${theme.primary}; line-height: 1.2; }
    .script-box {
      background: rgba(244, 114, 182, 0.1);
      border-radius: 5pt;
      padding: 5pt;
      margin-top: 4pt;
      border-left: 3pt solid ${theme.accent};
    }
    .script-box p { font-size: 9.5pt; color: ${theme.accent}; font-style: italic; }
    .footer {
      margin-top: auto;
      text-align: right;
    }
    .footer p {
      font-size: 8.5pt;
      color: ${theme.textMuted};
      margin: 3pt 0 0 0;
    }
    .highlight { color: ${theme.secondary}; font-weight: bold; }
    .icon-box { font-size: 40pt; text-align: center; margin: 5pt 0; }
  </style>
`;

const slides = [
  {
    name: 'slide01',
    content: `
      <div style="background: ${theme.bg}; color: white; display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%; border-radius: 0;">
        <p style="font-size: 16pt; color: ${theme.primary}; margin-bottom: 5pt; font-weight: bold; text-transform: uppercase; letter-spacing: 2pt;">[프로젝트]</p>
        <h1 style="color: white; font-size: 30pt; text-align: center; margin-bottom: 15pt; line-height: 1.2;">똑똑한 AI 친구와 함께!<br>나만의 계산기 만들기</h1>
        <p style="font-size: 14pt; opacity: 0.8; color: ${theme.secondary};">코딩 몰라도 OK! 대화로 완성하는 마법의 도구</p>
        <div class="icon-box"><p>🤖 ⚡ 🧮</p></div>
      </div>
    `,
    noLayout: true
  },
  {
    title: '[도입] 코딩 장벽 허물기: AI와의 첫 만남',
    thinking: '기술적 두려움 해소 및 새로운 창작 방식 인식',
    activity: '"컴퓨터와 우리말로 대화해서 프로그램을 만든다면?" 상상해보기',
    content: `
      <div class="content-box">
        <ul class="bullet-list">
          <li>복잡한 명령어 주르륵... 예전의 코딩은 잊으세요!</li>
          <li>이제는 친구에게 말하듯 AI에게 부탁하면 됩니다</li>
          <li>중요한 것은 "어떤 코드를 짜느냐"보다 <span class="highlight">"무엇을 만들고 싶은가"</span>입니다</li>
        </ul>
        <div class="guide-box">
          <p><b>선생님 가이드</b>: 코딩 실력보다 아이디어가 더 중요함을 강조하여 학생들의 자신감을 북돋아줍니다.</p>
        </div>
        <div class="script-box">
          <p><b>스크립트</b>: "여러분, 코딩이 어렵게 느껴졌나요? 이제는 걱정 마세요. AI 친구에게 우리말로 부탁만 하면 마법처럼 프로그램이 만들어진답니다."</p>
        </div>
      </div>
    `
  },
  {
    title: '[설계] 내가 갖고 싶은 계산기 디자인',
    thinking: '사용자 중심의 시각적 요소구상',
    activity: '계산기 화면의 숫자판, 연산 버튼, 결과 표시창의 위치 스케치하기',
    content: `
      <div class="content-box">
        <div style="display: flex; gap: 15pt; flex: 1; align-items: center;">
            <div style="background: #334155; padding: 10pt; border-radius: 8pt; width: 120pt; aspect-ratio: 3/4; display: grid; grid-template-columns: repeat(4, 1fr); gap: 4pt;">
                <div style="grid-column: span 4; background: #000; height: 25pt; border-radius: 3pt; margin-bottom: 4pt;"><p></p></div>
                <div style="background: #475569; border-radius: 2pt;"><p></p></div><div style="background: #475569; border-radius: 2pt;"><p></p></div><div style="background: #475569; border-radius: 2pt;"><p></p></div><div style="background: ${theme.accent}; border-radius: 2pt;"><p></p></div>
                <div style="background: #475569; border-radius: 2pt;"><p></p></div><div style="background: #475569; border-radius: 2pt;"><p></p></div><div style="background: #475569; border-radius: 2pt;"><p></p></div><div style="background: ${theme.accent}; border-radius: 2pt;"><p></p></div>
                <div style="background: #475569; border-radius: 2pt;"><p></p></div><div style="background: #475569; border-radius: 2pt;"><p></p></div><div style="background: #475569; border-radius: 2pt;"><p></p></div><div style="background: ${theme.accent}; border-radius: 2pt;"><p></p></div>
            </div>
            <ul class="bullet-list">
              <li>화면(Display)은 어디에?</li>
              <li>숫자 버튼 배치는 어떻게?</li>
              <li>내가 좋아하는 색깔 테마는?</li>
            </ul>
        </div>
        <div class="guide-box">
          <p><b>선생님 가이드</b>: 버튼 배치나 테마를 자유롭게 상상하게 하여 창의성을 유도합니다.</p>
        </div>
        <div class="script-box">
          <p><b>스크립트</b>: "우리가 만들 계산기는 어떤 모습일까요? 멋진 색깔이나 버튼 배치를 미리 머릿속에 그려봅시다."</p>
        </div>
      </div>
    `
  },
  {
    title: '[준비] AI 도우미와 작업실 준비',
    thinking: '협업 도구의 환경 이해',
    activity: 'Gemini(AI) 화면과 코드를 실행할 메모장(편집기) 열기',
    content: `
      <div class="content-box">
        <div style="display: flex; justify-content: space-around; align-items: center; flex: 1;">
          <div style="text-align: center;">
              <p style="font-size: 35pt;">💬</p>
              <p style="font-size: 9pt; color: ${theme.primary};">Gemini (AI 파트너)</p>
          </div>
          <div style="font-size: 20pt; color: ${theme.secondary};"><p>🤝</p></div>
          <div style="text-align: center;">
              <p style="font-size: 35pt;">📝</p>
              <p style="font-size: 9pt; color: ${theme.accent};">메모장 (작업 공간)</p>
          </div>
        </div>
        <div class="guide-box">
          <p><b>선생님 가이드</b>: AI는 제안을 하고, 사람은 그 결과를 담아 실행한다는 협업 흐름을 설명합니다.</p>
        </div>
        <div class="script-box">
          <p><b>스크립트</b>: "똑똑한 개발자인 AI 친구 Gemini와 우리가 코드를 적을 작업 공간을 준비해 봅시다."</p>
        </div>
      </div>
    `
  },
  {
    title: '[바이브 1] 첫 번째 마법 명령(Prompt)',
    thinking: '구체적이고 명확한 의사소통 (Prompt Engineering)',
    activity: '"사칙연산이 가능한 심플한 계산기를 만들어줘"라고 요청하기',
    content: `
      <div class="content-box">
        <div style="background: #1e3a8a; border-radius: 8pt; padding: 10pt; border: 1pt dashed ${theme.primary};">
          <p style="color: ${theme.primary}; font-weight: bold; margin-bottom: 5pt;">🗣️ 나의 요청(Prompt):</p>
          <p style="font-size: 11pt; color: white;">"안녕 Gemini! HTML과 CSS, JavaScript를 사용해서 웹 브라우저에서 실행되는 <span style="background: #334155; padding: 1pt 3pt;">사칙연산 계산기</span>를 만들어줘."</p>
        </div>
        <p style="margin-top: 10pt; font-size: 11pt; text-align: center; color: ${theme.textMuted};">※ 구체적으로 요청할수록 더 좋은 결과가 나와요!</p>
        <div class="guide-box">
          <p><b>선생님 가이드</b>: 원하는 기능을 누락 없이 전달하는 '정확한 말하기'의 중요성을 깨닫게 합니다.</p>
        </div>
        <div class="script-box">
          <p><b>스크립트</b>: "자, 대화를 시작해 볼까요? 우리 첫 번째 작품으로 심플한 계산기를 만들어달라고 부탁해 봅시다."</p>
        </div>
      </div>
    `
  },
  {
    title: '[실행] 마법의 주문 복사하고 확인하기',
    thinking: '결과물의 반영 및 실행 프로세스 이해',
    activity: 'AI가 준 코드를 복사해서 메모장에 붙여넣고 실행 화면 확인하기',
    content: `
      <div class="content-box">
        <div style="display: flex; gap: 10pt; flex: 1; align-items: center;">
          <div style="flex: 1;">
            <p style="font-size: 10pt; margin-bottom: 5pt;">1. 코드 우측상단 <span style="color: ${theme.primary};">[Copy]</span> 버튼 클릭</p>
            <p style="font-size: 10pt; margin-bottom: 5pt;">2. 메모장에 <span style="color: ${theme.secondary};">[Ctrl + V]</span> 붙여넣기</p>
            <p style="font-size: 10pt;">3. <span style="color: ${theme.accent};">calculator.html</span>로 저장 후 실행!</p>
          </div>
          <div style="background: #000; padding: 5pt; border-radius: 5pt; border: 1pt solid #334155;">
             <p style="font-size: 8pt; color: #10b981;">&lt;!DOCTYPE html&gt;</p>
             <p style="font-size: 8pt; color: #10b981;">&lt;html&gt;...</p>
          </div>
        </div>
        <div class="guide-box">
          <p><b>선생님 가이드</b>: 코드 내용을 몰라도 '복사-붙여넣기-확인'의 프로세스만으로 성취감을 줍니다.</p>
        </div>
        <div class="script-box">
          <p><b>스크립트</b>: "AI가 준 코드를 작업실에 옮겨 적어 봅시다. 짜잔! 화면에 계산기가 나타났나요?"</p>
        </div>
      </div>
    `
  },
  {
    title: '[논리 1] 계산기는 어떻게 작동할까?',
    thinking: '추상화된 기능의 내부 원리 이해',
    activity: '입력 -> 기억 -> 연산 -> 출력으로 이어지는 흐름 이해하기',
    content: `
      <div class="content-box">
        <div style="display: flex; justify-content: space-around; align-items: center; flex: 1;">
           <div style="text-align: center;"><p style="font-size: 25pt;">👉</p><p style="font-size: 8pt;">클릭(입력)</p></div>
           <div style="color: ${theme.primary};"><p>➔</p></div>
           <div style="text-align: center;"><p style="font-size: 25pt;">🧠</p><p style="font-size: 8pt;">데이터 기억</p></div>
           <div style="color: ${theme.primary};"><p>➔</p></div>
           <div style="text-align: center;"><p style="font-size: 25pt;">⚙️</p><p style="font-size: 8pt;">계산 처리</p></div>
           <div style="color: ${theme.primary};"><p>➔</p></div>
           <div style="text-align: center;"><p style="font-size: 25pt;">🖥️</p><p style="font-size: 8pt;">결과 표시</p></div>
        </div>
        <div class="guide-box">
          <p><b>선생님 가이드</b>: 코드는 몰라도 내부의 논리적 순서는 우리의 사고 모델과 같음을 설명합니다.</p>
        </div>
        <div class="script-box">
          <p><b>스크립트</b>: "비록 AI가 만들었지만, 계산기가 숫자를 기억하고 계산하는 과정은 우리 머릿속과 똑같아요."</p>
        </div>
      </div>
    `
  },
  {
    title: '[수정 1] 내 마음대로 디자인 바꾸기',
    thinking: '기존 결과물의 변형 및 개인화',
    activity: '"배경색을 보라색으로 바꾸고 버튼을 둥글게 해줘" 추가 요청하기',
    content: `
      <div class="content-box">
        <div style="background: rgba(129, 140, 248, 0.2); border-radius: 8pt; padding: 10pt; border: 1pt solid ${theme.secondary};">
          <p style="color: ${theme.secondary}; font-weight: bold; margin-bottom: 5pt;">💬 추가 요청하기:</p>
          <p style="font-size: 11pt;">"전체적인 배경색을 <span style="color: ${theme.secondary};">다크 모드</span>로 바꾸고, 버튼 모서리를 <span style="color: ${theme.accent};">둥글게</span> 다듬어줘."</p>
        </div>
        <div style="flex: 1; display: flex; align-items: center; justify-content: center; gap: 20pt; margin-top: 10pt;">
          <div style="width: 40pt; height: 40pt; background: #94a3b8;"><p></p></div>
          <div style="color: ${theme.primary};"><p>➔</p></div>
          <div style="width: 40pt; height: 40pt; background: #4338ca; border-radius: 10pt;"><p></p></div>
        </div>
        <div class="guide-box">
          <p><b>선생님 가이드</b>: 대화를 통해 결과물을 점진적으로 개선하는 '반복적 개발(Iteration)'을 경험합니다.</p>
        </div>
        <div class="script-box">
          <p><b>스크립트</b>: "계산기가 조금 밋밋한가요? AI에게 우리가 좋아하는 색깔로 옷을 입혀달라고 해봅시다."</p>
        </div>
      </div>
    `
  },
  {
    title: '[기능 추가 1] 잊지 않게 기억해줘! 계산 기록',
    thinking: '새로운 요구사항 도출 및 확장',
    activity: '"이전 계산 기록(History)을 보여주는 기능을 넣어줘" 요청하기',
    content: `
      <div class="content-box">
        <div style="background: #1e293b; border: 1.5pt solid ${theme.accent}; border-radius: 8pt; padding: 10pt; flex: 1;">
           <p style="color: ${theme.accent}; font-weight: bold; margin-bottom: 5pt;">📜 History Log</p>
           <ul style="list-style: none; padding: 0; font-family: monospace; font-size: 10pt; color: ${theme.textMuted};">
             <li><p>12 + 45 = <span style="color: white;">57</span></p></li>
             <li><p>57 * 2 = <span style="color: white;">114</span></p></li>
           </ul>
        </div>
        <div class="guide-box">
          <p><b>선생님 가이드</b>: 도구의 편리함을 높이기 위해 사용자가 필요로 할 기능을 스스로 생각해보게 합니다.</p>
        </div>
        <div class="script-box">
          <p><b>스크립트</b>: "방금 계산한 걸 까먹으면 안 되겠죠? 계산 기록을 남겨주는 똑똑한 기능을 더해볼까요?"</p>
        </div>
      </div>
    `
  },
  {
    title: '[기능 추가 2] 화려한 애니메이션 효과',
    thinking: '감성적 요소와 상호작용 강화',
    activity: '"버튼을 누를 때마다 커지는 효과를 넣어줘" 요청하기',
    content: `
      <div class="content-box">
        <div style="flex: 1; display: flex; align-items: center; justify-content: center;">
            <div style="background: ${theme.primary}; width: 60pt; height: 60pt; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 20pt ${theme.primary};">
                <p style="font-size: 20pt; font-weight: bold; color: white;">+</p>
            </div>
        </div>
        <p style="text-align: center; color: ${theme.secondary}; font-size: 11pt;">"살아 움직이는 듯한 입체감을 더해요!"</p>
        <div class="guide-box">
          <p><b>선생님 가이드</b>: 미학적인 애니메이션 효과가 프로그램의 품질을 어떻게 높이는지 체감합니다.</p>
        </div>
        <div class="script-box">
          <p><b>스크립트</b>: "버튼을 누를 때마다 살아 움직이는 계산기를 만들어 봅시다. 연주하듯이 즐거워질 거예요!"</p>
        </div>
      </div>
    `
  },
  {
    title: '[디버깅] AI 친구와 함께 오류 고치기',
    thinking: '문제 해결 및 비판적 사고',
    activity: '버튼 위치가 이상하거나 오류가 나면 AI에게 상담하여 해결하기',
    content: `
      <div class="content-box">
        <div style="display: flex; gap: 10pt; flex: 1; align-items: center;">
          <div style="background: rgba(239, 68, 68, 0.1); border: 1pt solid #ef4444; border-radius: 8pt; padding: 8pt; flex: 1;">
            <p style="color: #ef4444; font-weight: bold; font-size: 10pt;">⚠ Problem</p>
            <p style="font-size: 10pt;">"버튼이 화면 밖으로 나가요!"</p>
          </div>
          <div style="color: ${theme.primary};"><p>➔</p></div>
          <div style="background: rgba(16, 185, 129, 0.1); border: 1pt solid #10b981; border-radius: 8pt; padding: 8pt; flex: 1;">
            <p style="color: #10b981; font-weight: bold; font-size: 10pt;">✅ AI Solution</p>
            <p style="font-size: 10pt;">"CSS의 width 설정을 수정해 드릴게요."</p>
          </div>
        </div>
        <div class="guide-box">
          <p><b>선생님 가이드</b>: 포기하지 않고 AI와 소통하며 문제를 해결하는 협업 태도를 지향합니다.</p>
        </div>
        <div class="script-box">
          <p><b>스크립트</b>: "앗, 버튼이 겹쳐 보이나요? 당황하지 말고 AI에게 '어디가 이상해, 고쳐줘'라고 말하면 돼요."</p>
        </div>
      </div>
    `
  },
  {
    title: '[최적화] 마지막 한 끗 차이, 폴리싱',
    thinking: '완성도 높은 결과물을 위한 세부 조정',
    activity: '글자 크기, 여백 등을 미세하게 조정하여 완성하기',
    content: `
      <div class="content-box">
        <div style="display: flex; flex-direction: column; gap: 5pt; flex: 1; justify-content: center;">
            <p style="font-size: 11pt;">📐 숫자 크기를 조금 더 키워주세요</p>
            <p style="font-size: 11pt;">📏 버튼 사이의 간격을 넓혀주세요</p>
            <p style="font-size: 11pt;">🪞 결과창에 반사 효과를 넣어주세요</p>
        </div>
        <div class="guide-box">
          <p><b>선생님 가이드</b>: 좋은 프로그램은 '디테일'에서 결정된다는 점을 상기시킵니다.</p>
        </div>
        <div class="script-box">
          <p><b>스크립트</b>: "거의 다 왔어요! 글씨 크기도 맞추고 모서리도 둥글게 깎아서 진짜 앱처럼 만들어 봅시다."</p>
        </div>
      </div>
    `
  },
  {
    title: '[테스트] 친구와 함께 써보는 계산기',
    thinking: '사용자 피드백 수렴 및 상호 평가',
    activity: '친구의 작품을 직접 써보고 장점 찾아 칭찬하기',
    content: `
      <div class="content-box">
        <div style="display: flex; gap: 15pt; justify-content: center; flex: 1;">
          <div style="text-align: center;"><p>🎨</p><p style="font-size: 9pt;">독창적 디자인</p></div>
          <div style="text-align: center;"><p>🚀</p><p style="font-size: 9pt;">빠른 반응 속도</p></div>
          <div style="text-align: center;"><p>🌟</p><p style="font-size: 9pt;">특별한 기능</p></div>
        </div>
        <div class="guide-box">
          <p><b>선생님 가이드</b>: 같은 AI를 썼더라도 사람의 '생각'에 따라 다른 결과가 나옴을 확인합니다.</p>
        </div>
        <div class="script-box">
          <p><b>스크립트</b>: "우리 반 친구들은 어떤 계산기를 만들었을까요? 서로의 작품을 써보며 멋진 점을 찾아봐요."</p>
        </div>
      </div>
    `
  },
  {
    title: '[정리] 이제 나도 당당한 창작자!',
    thinking: '성취감 내면화 및 미래 비전 확장',
    activity: 'AI 시대에 필요한 나의 경쟁력 상상해보기',
    content: `
      <div class="content-box">
        <p style="text-align: center; font-size: 15pt; color: ${theme.primary}; font-weight: bold; margin-bottom: 10pt;">"코딩 기술보다 더 중요한 것은<br>질문하는 힘과 상상력입니다."</p>
        <div class="icon-box"><p>🏆 💡 🌍</p></div>
        <div class="guide-box">
          <p><b>선생님 가이드</b>: AI를 잘 활용하는 능력이 미래의 새로운 무기가 될 수 있음을 시사합니다.</p>
        </div>
        <div class="script-box">
          <p><b>스크립트</b>: "오늘 우리는 코딩을 잘 몰라도 AI와 함께 멋진 걸 만들었어요. 다음번엔 AI와 또 무엇을 만들어볼까요?"</p>
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
        <p>AI 계산기 마스터하기 | Slide ${index + 1}</p>
      </div>
    </div>
  `}
</body>
</html>
  `.trim();

  fs.writeFileSync(filePath, html);
  console.log(`Generated ${fileName}`);
});
