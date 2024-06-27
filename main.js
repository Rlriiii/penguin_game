var score = 0;
var fail = 3;
var timerId = null;
var words = [
    "남극", "남극바다", "남극연어", "남극곰", "남극햇살", "남극여우", "남극빙하", "남극물고기", "남극식물", "남극풍경",
    "얼음", "빙하", "얼음산", "얼음버섯", "얼음동굴", "얼음파편", "얼음순례", "얼음꽃", "얼음창", "얼음초콜릿",
    "펭귄", "흑백펭귄", "제왕펭귄", "빙하펭귄", "세바스토포르펭귄", "아델리펭귄", "황제펭귄", "백두대간펭귄", "초록펭귄", "스네어펭귄",
    "봄날의 햇살", "작은 꽃다발", "바람 불어와", "달빛이 반짝", "별들이 빛나", "산 넘어 강", "바다 넓은", "푸른 하늘", "구름 사라져", "빗방울 소리",
    "창가에 앉아", "발걸음 느린", "한숨 돌려", "헤어진 후에", "사랑은 끝", "희망 찾아", "미소 짓다", "가슴이 아파", "아무 말 없이", "떠나버렸어",
    "기다리는 중", "밤하늘 별", "달빛이 비치", "햇살이 따뜻", "가을 날씨", "바람 솔솔", "강물 흐르는", "바위 위에", "손 잡고", "꿈을 꾸다",
    "얼음 녹고", "빗 속으로", "손길 닿아", "꿈 속에서", "희망은 더", "미래를 바라", "과거의 추억", "현재가 있는", "시간이 지나", "생각해 봐",
    "마음 깊은", "가슴을 쓸어", "눈물이 고여", "웃음이 터져", "평화로운 날", "행복한 순간", "슬픔을 잊고", "고독한 밤", "아픈 기억", "사람들이 말해",
    "친구와 함께", "가족의 사랑", "연인의 약속", "남자와 여자", "아이들은 웃", "어른이 되어", "할아버지의", "소녀가 달려", "소년이 뛰어", "시인의 마음",
    "작가의 손", "예술가의 삶", "봉사자들이", "학생들이 공부", "선생님이 가르", "사회의 문제", "정치와 경제", "문화의 중요", "역사를 기억", "교육을 중시",
    "과학과 기술", "환경 보호", "의료 서비스", "문학적 표현", "예술의 감동", "음악과 무", "무용이 있는", "연극과 영화", "미술 전시", "디자인의 창",
    "건축 설계", "사진을 찍다", "글을 쓰는 사람", "책을 읽는", "사람들을 만", "친구들과 놀", "가족과 함께", "연인과 약속"
];
var wordArray = null;
var timerInterval = 1000;
var panelHeight = 600;

var maxFails = 3; // 최대 실패 횟수
var maxWords = 20; // 최대 성공 단어 개수

window.onload = function () {
    initGame();
}

function initGame() {
    wordArray = words.slice(); // 초기 단어 배열 설정
    document.getElementById('startButton').onclick = function () {
        playGame();
        document.getElementById('startButton').setAttribute('disabled', 'disabled');
    }
    document.getElementById('wordInput').onkeyup = function (event) {
        event = window.event || event;
        if (event.keyCode == 13) {
            var inputWord = document.getElementById('wordInput').value;
            findWord(inputWord);
            document.getElementById('wordInput').value = '';
        }
    }
}
function playGame() {
    moveWords();
    deleteWords();
    if (isEndGame()) {
        stopGame();
        return;
    }
    var rn = makeRandom(wordArray.length);
    var word = wordArray[rn];
    if (word) {
        var wordSpan = makeElement('span', word);
        wordSpan.className = 'fallingWord'; // fallingWord 클래스 추가
        document.getElementById('drawPanel').appendChild(wordSpan);
        wordArray.splice(rn, 1); // 선택된 단어는 배열에서 제거
    }
    // 다음 게임 루프를 설정할 때도 랜덤 딜레이를 추가하도록 setTimeout을 사용합니다.
    timerId = setTimeout(playGame, timerInterval);
}

function stopGame() {
    if (isEndGame() && score >= maxWords) {
        alert("게임 성공! 축하합니다! 🎉🎉");
    } else {
        alert("게임 오버 되었습니다! 펭귄을 구하지 못했어요 😭😭");
    }
    document.getElementById('startButton').removeAttribute('disabled');
}

function isEndGame() {
    return wordArray.length == 0 &&
        document.getElementById("drawPanel").getElementsByTagName("span").length == 0 ||
        score >= maxWords || fail < 0;
}

function deleteWords() {
    var dp = document.getElementById("drawPanel");
    var dpsps = dp.getElementsByTagName("span");
    for (var i = 0; i < dpsps.length; i++) {
        var sp = dpsps.item(i);
        var toppx = parseInt(sp.style.top);
        if (toppx > panelHeight) {
            dp.removeChild(sp);
            increaseFail();
        }
    }
}

function findWord(word) {
    var dp = document.getElementById("drawPanel");
    var dpsps = dp.getElementsByTagName("span");
    var found = false;
    for (var i = 0; i < dpsps.length; i++) {
        var sp = dpsps.item(i);
        if (sp.innerHTML == word) {
            increaseScore();
            dp.removeChild(sp);
            found = true;
            break; // 단어를 한 번 찾았으면 더 이상 반복할 필요 없음
        }
    }
    if (!found) {
        increaseFail();
        if (fail == 0) {
            stopGame();
        }
    }
}

function increaseFail() {
    fail--;
    document.getElementById("fail").innerHTML = fail;
    if (fail < 3) {
        var penguin_img = document.querySelector("img");

    }
}


function increaseScore() {
    score++;
    document.getElementById("score").innerHTML = score;
}

function moveWords() {
    var dp = document.getElementById("drawPanel");
    var dpsps = dp.getElementsByTagName("span");
    for (var i = 0; i < dpsps.length; i++) {
        var sp = dpsps.item(i);
        sp.style.top = (parseInt(sp.style.top) + 25) + "px";
    }
}

function makeElement(element, text) {
    var we = document.createElement(element);
    we.innerHTML = text;
    we.style.left = makeRandom(450) + "px";
    we.style.top = "0px";
    return we;
}

function makeRandom(maxLimit) {
    var r = Math.random();
    r = r * 10000;
    r = Math.ceil(r);
    r = r % maxLimit;
    return r;
}