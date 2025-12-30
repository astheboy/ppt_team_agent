const fs = require('fs');
const path = require('path');

const outputDir = '/Users/hanseungryun/Dev/ppt_team_agent/.claude/brain/slides';

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Prompt Engineering themed colors (Purple/Gold/Magic theme)
const theme = {
  bg: '#1e1b4b', // Deep Indigo
  primary: '#fbbf24', // Amber 400 (Gold)
  secondary: '#a78bfa', // Violet 400
  accent: '#f472b6', // Pink 400
  cardBg: '#312e81', // Indigo 900
  textMain: '#f8fafc', // Slate 50
  textMuted: '#cbd5e1', // Slate 300
  thinkingBg: '#4338ca', // Indigo 700
  activityBg: '#5b21b6', // Violet 800
};

const commonStyle = `
  <style>
    html { background: ${theme.bg}; }
    body {
      width: 720pt; height: 405pt; margin: 0; padding: 0;
      font-family: 'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif;
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
      position: relative;
    }
    .slide-container::before {
      content: "";
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      background: radial-gradient(circle at 90% 10%, rgba(251, 191, 36, 0.05), transparent 40%),
                  radial-gradient(circle at 10% 90%, rgba(167, 139, 250, 0.05), transparent 40%);
      pointer-events: none;
    }
    .header {
      border-left: 6pt solid ${theme.primary};
      padding-left: 12pt;
      margin-bottom: 10pt;
    }
    h1 { margin: 0; font-size: 24pt; color: ${theme.primary}; line-height: 1.1; letter-spacing: -0.5pt; }
    
    .process-container {
      display: flex;
      gap: 10pt;
      margin-top: 5pt;
    }
    .process-tag {
      padding: 4pt 10pt;
      border-radius: 6pt;
      font-size: 11pt;
      font-weight: bold;
      color: white;
      display: flex;
      align-items: center;
      gap: 5pt;
    }
    .tag-thinking { background: ${theme.thinkingBg}; border: 1pt solid ${theme.primary}; }
    .tag-activity { background: ${theme.activityBg}; border: 1pt solid ${theme.secondary}; }

    .content-box {
      background: ${theme.cardBg};
      padding: 12pt;
      border-radius: 12pt;
      border: 1pt solid rgba(167, 139, 250, 0.3);
      flex: 1;
      display: flex; flex-direction: column;
      min-height: 0;
      box-shadow: 0 8pt 20pt rgba(0,0,0,0.4);
      backdrop-filter: blur(10px);
    }
    p, li { font-size: 12.5pt; line-height: 1.3; margin: 0; }
    .bullet-list { margin: 10pt 0; padding-left: 20pt; list-style: none; }
    .bullet-list li { margin-bottom: 8pt; position: relative; }
    .bullet-list li::before {
      content: "✦";
      color: ${theme.primary};
      font-size: 12pt;
      display: inline-block;
      width: 1.8em;
      margin-left: -1.8em;
    }
    .guide-box {
      background: rgba(251, 191, 36, 0.08);
      border-radius: 6pt;
      padding: 6pt;
      margin-top: auto;
      border-left: 4pt solid ${theme.primary};
    }
    .guide-box p { font-size: 10pt; color: ${theme.primary}; line-height: 1.3; }
    .script-box {
      background: rgba(244, 114, 182, 0.08);
      border-radius: 6pt;
      padding: 6pt;
      margin-top: 4pt;
      border-left: 4pt solid ${theme.accent};
    }
    .script-box p { font-size: 10pt; color: ${theme.accent}; font-style: italic; }
    .footer {
      margin-top: 10pt;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1pt solid rgba(255,255,255,0.1);
      padding-top: 5pt;
    }
    .footer p {
      font-size: 9pt;
      color: ${theme.textMuted};
    }
    .highlight { color: ${theme.primary}; font-weight: bold; }
    .secondary-highlight { color: ${theme.secondary}; font-weight: bold; }
    .icon-box { font-size: 40pt; text-align: center; margin: 5pt 0; }
    .icon-box p { margin: 0; }
    
    .comparison-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15pt;
      margin-top: 10pt;
    }
    .comp-item {
      padding: 10pt;
      border-radius: 8pt;
      background: rgba(255,255,255,0.05);
    }
    .rstf-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10pt;
      margin-top: 5pt;
    }
    .rstf-card {
      padding: 8pt;
      border-radius: 8pt;
      background: rgba(167, 139, 250, 0.15);
      border: 1pt solid ${theme.secondary};
    }
    .rstf-letter {
      font-size: 18pt;
      font-weight: 900;
      color: ${theme.primary};
      margin-right: 5pt;
    }
  </style>
`;

const slides = [
  {
    name: 'slide01',
    content: `
      <div style="background: ${theme.bg}; color: white; display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%; border-radius: 0; text-align: center;">
        <div style="background: rgba(251, 191, 36, 0.1); padding: 5pt 15pt; border-radius: 20pt; border: 1pt solid ${theme.primary}; margin-bottom: 20pt;">
          <p style="font-size: 18pt; color: ${theme.primary}; font-weight: bold; letter-spacing: 2pt;">[마법의 주문]</p>
        </div>
        <h1 style="color: white; font-size: 36pt; margin-bottom: 20pt; line-height: 1.3;">똑똑한 AI 친구를 내 마음대로!<br><span style="color: ${theme.primary};">프롬프트 엔지니어링</span></h1>
        <p style="font-size: 18pt; color: ${theme.secondary};">대충 말하면 대충 해주는 AI? 제대로 명령하는 비법 공개</p>
        <div class="icon-box"><p>🧙‍♂️ ✨ 🤖</p></div>
      </div>
    `,
    noLayout: true
  },
  {
    title: '[도입] 우리 사이에는 통역사가 필요해?',
    thinking: '일상 속 애매한 표현의 문제점 인식',
    activity: '"거기 있는 그거 좀 가져다줘"라고 말햇을 때 생길 수 있는 오해 상상하기',
    content: `
      <div class="content-box">
        <ul class="bullet-list">
          <li>우리는 평소에 <span class="highlight">"그거", "저기", "대충"</span>이라는 말을 참 많이 써요.</li>
          <li>친구에게 "그것 좀 가져와"라고 하면 친구는 무엇을 가져올까요?</li>
          <li>사람은 눈치껏 알아듣지만, <span class="secondary-highlight">AI는 '눈치'가 없답니다!</span></li>
        </ul>
        <div style="display: flex; justify-content: center; margin-top: 10pt;">
            <div style="background: #4338ca; padding: 10pt; border-radius: 10pt; text-align: center; width: 200pt;">
                <p style="font-size: 12pt;">🙋‍♂️: "그거 줘!"</p>
                <p style="font-size: 20pt;">➡️ ❓ ⬅️</p>
                <p style="font-size: 12pt;">🤖: "준비된 데이터가 없습니다."</p>
            </div>
        </div>
        <div class="guide-box">
          <p><b>선생님 가이드</b>: '그거'와 '거기'가 사람마다 다르게 해석될 수 있음을 강조하여 명확한 소통의 출발점을 만듭니다.</p>
        </div>
        <div class="script-box">
          <p><b>스크립트</b>: "여러분, 친구에게 '그것 좀 줘'라고 했다가 엉뚱한 물건을 받아본 적 있나요? 우리와 AI 사이에서도 이런 일이 일어난답니다."</p>
        </div>
      </div>
    `
  },
  {
    title: '[비교] 애매한 명령 vs 명확한 명령',
    thinking: '표현의 구체성에 따른 결과의 차이 이해',
    activity: '"컵 가져와" vs "탁자 위 파란색 컵을 가져와" 비교하기',
    content: `
      <div class="content-box">
        <div class="comparison-grid">
          <div class="comp-item" style="border-left: 4pt solid #ef4444;">
             <p style="color: #ef4444; font-weight: bold; margin-bottom: 5pt;">❌ 애매한 명령</p>
             <p>"컵 하나 가져다줘."</p>
             <p style="font-size: 10pt; color: ${theme.textMuted}; margin-top: 10pt;">❓ 어떤 컵? (종이컵? 유리컵?)<br>❓ 어디에 있는 컵?</p>
          </div>
          <div class="comp-item" style="border-left: 4pt solid #10b981;">
             <p style="color: #10b981; font-weight: bold; margin-bottom: 5pt;">✅ 명확한 명령</p>
             <p>"탁자 위에 있는 <span class="highlight">파란색 손잡이가 달린 컵</span>을 가져다줘."</p>
             <p style="font-size: 10pt; color: ${theme.textMuted}; margin-top: 10pt;">✨ 위치(탁자 위) + 특징(파란색, 손잡이)을 정확히 지정!</p>
          </div>
        </div>
        <div class="guide-box">
          <p><b>선생님 가이드</b>: 구체적인 단어(위치, 색깔, 특징)가 들어갈수록 오차가 줄어든다는 점을 확인시킵니다.</p>
        </div>
        <div class="script-box">
          <p><b>스크립트</b>: "똑같은 명령이라도 얼마나 자세히 말하느냐에 따라 AI가 가져오는 결과는 완전히 달라져요."</p>
        </div>
      </div>
    `
  },
  {
    title: '[활동 1-1] 1단계: 내 마음대로 그림 그리기',
    thinking: '최소 정보 기반의 결과물 확인',
    activity: '"그림을 그려보세요"라는 아주 간단한 명령만 듣고 각자 그림 그리기',
    content: `
      <div class="content-box">
        <div style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center;">
            <div style="border: 2pt dashed ${theme.primary}; width: 250pt; height: 120pt; border-radius: 10pt; display: flex; align-items: center; justify-content: center;">
                <p style="font-size: 24pt; font-weight: bold; color: ${theme.primary};">🖼️ 자유 주제!</p>
            </div>
            <p style="margin-top: 15pt; text-align: center;">명령어: <span class="secondary-highlight">"그림을 그려주세요."</span></p>
        </div>
        <div class="guide-box">
          <p><b>선생님 가이드</b>: 학생들이 서로 다른 그림을 그리는 것을 보며 명령이 부족할 때의 불확실성을 체험하게 합니다.</p>
        </div>
        <div class="script-box">
          <p><b>스크립트</b>: "자, 아무 설명 없이 '그림 그려봐'라고만 말할게요. 여러분은 지금 무엇을 그리고 있나요? 다들 제각각이죠?"</p>
        </div>
      </div>
    `
  },
  {
    title: '[활동 1-2] 2단계: 마법의 디테일 추가하기',
    thinking: '조건 추가를 통한 결과물 제어',
    activity: '구체적인 명령대로 하트 그림 그리기',
    content: `
      <div class="content-box">
        <div style="background: rgba(255,255,255,0.05); padding: 10pt; border-radius: 10pt; margin-bottom: 10pt;">
            <p style="font-size: 12pt; color: ${theme.primary}; font-weight: bold;">🗣️ 마법의 디테일 명령:</p>
            <p style="font-size: 13pt;">"종이 <span class="highlight">한가운데</span>에 <span class="highlight">빨간색 커다란 하트</span>를 그리고, 그 안에 <span class="highlight">본인의 이름</span>을 적으세요."</p>
        </div>
        <div style="flex: 1; display: flex; align-items: center; justify-content: center;">
            <div style="background: white; width: 150pt; height: 100pt; border-radius: 5pt; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #ef4444;">
                <p style="font-size: 40pt;">❤️</p>
                <p style="color: #334155; font-weight: bold; font-size: 14pt;">[이름]</p>
            </div>
        </div>
        <div class="guide-box">
          <p><b>선생님 가이드</b>: 구체적 명령이 주어졌을 때 모든 학생의 결과물이 비슷해지는 '수렴' 현상을 확인시킵니다.</p>
        </div>
        <div class="script-box">
          <p><b>스크립트</b>: "이번엔 아주 자세히 명령을 줄게요. 설명대로 그려보니 어때요? 아까보다 훨씬 명확해졌죠?"</p>
        </div>
      </div>
    `
  },
  {
    title: '[비교] 두 활동의 결과 비교하기',
    thinking: '데이터 비교를 통한 원리 도출',
    activity: '1단계 그림과 2단계 그림의 차이점 발표하기',
    content: `
      <div class="content-box">
        <div class="comparison-grid">
          <div style="text-align: center;">
              <p style="font-size: 30pt;">❓ 🌀 🎭</p>
              <p style="font-weight: bold; margin-top: 5pt;">1단계: 제각각</p>
              <p style="font-size: 10pt; color: ${theme.textMuted};">"무엇을 그릴지 몰라요"</p>
          </div>
          <div style="text-align: center;">
              <p style="font-size: 30pt;">🎯 ✨ ✅</p>
              <p style="font-weight: bold; margin-top: 5pt;">2단계: 똑같음</p>
              <p style="font-size: 10pt; color: ${theme.textMuted};">"원하는 대로 결과가 나와요"</p>
          </div>
        </div>
        <div style="background: rgba(167, 139, 250, 0.2); padding: 10pt; border-radius: 10pt; margin-top: 15pt; text-align: center; border: 1pt dashed ${theme.secondary};">
            <p style="font-size: 15pt; font-weight: bold;">핵심 원리: <span class="highlight">명령어의 구체성 = 결과의 정확도</span></p>
        </div>
        <div class="guide-box">
          <p><b>선생님 가이드</b>: AI를 다룰 때도 우리가 자세히 말할수록 AI는 더 의도에 맞게 행동함을 강조합니다.</p>
        </div>
        <div class="script-box">
          <p><b>스크립트</b>: "두 그림의 차이가 느껴지나요? AI도 똑같아요. 우리가 자세히 말할수록 AI는 더 똑똑해진답니다."</p>
        </div>
      </div>
    `
  },
  {
    title: '[도입] 엉뚱한 로봇 \'청개구리\'를 소개합니다!',
    thinking: '문제 상황 인식 및 대상 파악',
    activity: '엉뚱하게 라면을 끓이는 AI의 행동 관찰하기',
    content: `
      <div class="content-box">
        <div style="display: flex; gap: 15pt; flex: 1; align-items: center;">
            <div style="font-size: 60pt;"><p>🐸</p></div>
            <div style="flex: 1;">
                <p style="font-weight: bold; color: ${theme.accent}; margin-bottom: 5pt;">"라면 끓여줘!"라고 했더니...</p>
                <ul class="bullet-list" style="font-size: 12pt;">
                    <li>라면 봉지를 뜯지도 않고 냄비에 넣어요.</li>
                    <li>찬물에 면과 스프를 한꺼번에 넣고 기다려요.</li>
                    <li>수돗물을 틀어놓고 어디론가 가버려요!</li>
                </ul>
            </div>
        </div>
        <div class="guide-box">
          <p><b>선생님 가이드</b>: AI가 왜 이런 행동을 하는지(상식이 부족함, 명령이 부족함) 추측하게 유도합니다.</p>
        </div>
        <div class="script-box">
          <p><b>스크립트</b>: "이 로봇은 아주 엉뚱해요. 라면을 끓여달라고 하면 봉지째 물에 넣곤 하죠. 우리가 이 친구를 제대로 가르쳐야 해요!"</p>
        </div>
      </div>
    `
  },
  {
    title: '[분해] 사고를 쪼개라! 라면 끓이기의 단계',
    thinking: '복잡한 과업의 세분화 (Step-by-Step)',
    activity: '라면 끓이기 과정을 아주 작은 행동으로 나누어 적기',
    content: `
      <div class="content-box">
        <p style="font-size: 12pt; margin-bottom: 10pt;">청개구리 AI를 위해 <span class="highlight">당연한 상식</span>까지 모두 쪼개보세요!</p>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8pt; font-size: 11pt;">
            <div style="background: rgba(255,255,255,0.05); padding: 5pt 10pt; border-radius: 5pt;"><p>1. 냄비를 꺼낸다.</p></div>
            <div style="background: rgba(255,255,255,0.05); padding: 5pt 10pt; border-radius: 5pt;"><p>2. 물 550ml를 붓는다.</p></div>
            <div style="background: rgba(255,255,255,0.05); padding: 5pt 10pt; border-radius: 5pt;"><p>3. 가스레인지 불을 켠다.</p></div>
            <div style="background: rgba(255,255,255,0.05); padding: 5pt 10pt; border-radius: 5pt;"><p>4. 물이 끓을 때까지 기다린다.</p></div>
            <div style="background: rgba(255,255,255,0.05); padding: 5pt 10pt; border-radius: 5pt; border: 1pt dashed ${theme.primary};"><p>... (직접 채워보세요)</p></div>
        </div>
        <div class="guide-box">
          <p><b>선생님 가이드</b>: '물을 넣는다'보다 구체적인 수치나 도구를 명시하도록 지도합니다.</p>
        </div>
        <div class="script-box">
          <p><b>스크립트</b>: "AI에게는 '당연한' 것이 없어요. 아주 작은 단계까지 쪼개서 설명해 주는 연습이 필요합니다."</p>
        </div>
      </div>
    `
  },
  {
    title: '[전략] 완벽한 명령을 위한 RSTF 전략',
    thinking: '프롬프트 구조화 기술 습득',
    activity: 'Role, Situation, Task, Format 요소 맞춰보기',
    content: `
      <div class="content-box">
        <div class="rstf-grid">
            <div class="rstf-card"><span class="rstf-letter">R</span><span style="font-size: 10pt; font-weight: bold;">ole (역할)</span><p style="font-size: 9pt; margin-top: 3pt;">"너는 일류 요리사야"</p></div>
            <div class="rstf-card" style="background: rgba(244, 114, 182, 0.15); border-color: ${theme.accent};"><span class="rstf-letter" style="color: ${theme.accent};">S</span><span style="font-size: 10pt; font-weight: bold;">ituation (상황)</span><p style="font-size: 9pt; margin-top: 3pt;">"배고픈 학생을 위해..."</p></div>
            <div class="rstf-card"><span class="rstf-letter">T</span><span style="font-size: 10pt; font-weight: bold;">ask (할 일)</span><p style="font-size: 9pt; margin-top: 3pt;">"라면 레시피를 알려줘"</p></div>
            <div class="rstf-card" style="background: rgba(244, 114, 182, 0.15); border-color: ${theme.accent};"><span class="rstf-letter" style="color: ${theme.accent};">F</span><span style="font-size: 10pt; font-weight: bold;">ormat (형식)</span><p style="font-size: 9pt; margin-top: 3pt;">"단계별로 번호를 붙여서"</p></div>
        </div>
        <div class="guide-box">
          <p><b>선생님 가이드</b>: 4가지 요소가 포함된 질문이 왜 더 강력한지 예시를 들어 설명합니다.</p>
        </div>
        <div class="script-box">
          <p><b>스크립트</b>: "좋은 질문에는 공식이 있어요. '누가, 언제, 무엇을, 어떻게' 할지를 정해주면 청개구리도 천재가 된답니다."</p>
        </div>
      </div>
    `
  },
  {
    title: '[미션] 청개구리 AI 길들이기 실습',
    thinking: '배운 지식의 실무 적용 및 피드백',
    activity: 'RSTF 전략을 활용해 최종 프롬프트 입력하기',
    content: `
      <div class="content-box">
        <div style="background: #1e3a8a; border-radius: 10pt; padding: 12pt; border: 2pt solid ${theme.primary}; flex: 1; display: flex; flex-direction: column;">
            <p style="color: ${theme.primary}; font-weight: bold; margin-bottom: 8pt;">📝 최종 미션 프롬프트:</p>
            <div style="background: rgba(0,0,0,0.3); padding: 10pt; border-radius: 8pt; flex: 1; font-family: monospace; font-size: 11pt;">
                <p>"너는 <span class="highlight">[역할]</span>이야. 지금 상황은 <span class="highlight">[상황]</span>이야. 나를 위해 <span class="highlight">[비법 라면]</span>을 끓여주는 과정을 <span class="highlight">[단계별]</span>로 알려줘. 특히 <span class="secondary-highlight">아주 구체적인 행동</span>으로 설명해야 해!"</p>
            </div>
        </div>
        <div class="guide-box">
          <p><b>선생님 가이드</b>: AI의 답변이 '봉지 뜯기'부터 시작하는지, 구체적인 물의 양이 포함되었는지 확인하게 합니다.</p>
        </div>
        <div class="script-box">
          <p><b>스크립트</b>: "자, 이제 여러분의 마법 프롬프트로 청개구리 로봇이 맛있는 라면을 끓이게 만들어 보세요!"</p>
        </div>
      </div>
    `
  },
  {
    title: '[정리] AI 시대, 진정한 마법사는 누구?',
    thinking: '학습 내용 내면화 및 가치 발견',
    activity: '오늘 배운 프롬프트의 핵심 키워드 정리하기',
    content: `
      <div class="content-box">
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; flex: 1;">
            <p style="text-align: center; font-size: 16pt; margin-bottom: 20pt;">AI는 강력한 도구일 뿐입니다.<br>진짜 중요한 것은 <span class="highlight">"우리의 질문"</span>입니다.</p>
            <div style="display: flex; gap: 20pt;">
                <div style="background: ${theme.thinkingBg}; padding: 10pt 20pt; border-radius: 30pt;"><p>명확함</p></div>
                <div style="background: ${theme.thinkingBg}; padding: 10pt 20pt; border-radius: 30pt;"><p>구체성</p></div>
                <div style="background: ${theme.thinkingBg}; padding: 10pt 20pt; border-radius: 30pt;"><p>구조화</p></div>
            </div>
        </div>
        <div class="guide-box">
          <p><b>선생님 가이드</b>: 기술적 숙련도보다 '생각하는 힘'과 '질문하는 역량'의 중요성을 한 번 더 강조합니다.</p>
        </div>
        <div class="script-box">
          <p><b>스크립트</b>: "AI는 강력한 도구일 뿐이에요. 그 도구를 움직이는 마법사는 바로 '명확하게 생각하고 질문하는' 여러분입니다."</p>
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
          <div class="process-tag tag-thinking"><p>🧠 ${slide.thinking}</p></div>
          <div class="process-tag tag-activity"><p>🎯 ${slide.activity}</p></div>
        </div>
      </div>
      ${slide.content}
      <div class="footer">
        <p>효과적인 프롬프트 작성 실습 | 프롬프트 엔지니어링</p>
        <p>Slide ${index + 1} / ${slides.length}</p>
      </div>
    </div>
  `}
</body>
</html>
  `.trim();

  fs.writeFileSync(filePath, html);
  console.log(`Generated ${fileName}`);
});
