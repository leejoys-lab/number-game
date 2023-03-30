/* 전체 폼 */
const gameForm = document.querySelector("#form");

/* 숫자 */
const rangeNum = document.querySelector("#form .range-num");   // 범위input
const chooseNum = document.querySelector("#form .choose-num"); // 선택input

// 안내 문구(rangeNum보다 chooseNum을 크게 입력한 경우)
const chooseNotice = document.querySelector("#form .choose-notice");

/* 결과 및 메세지 */
const result = document.querySelector("#result"); // 결과 내용 전체
const resultMsg = document.querySelector("#result .result-msg"); // 입력 결과
const winMsg = document.querySelector("#result .win-msg"); 
const againMsg = document.querySelector("#result .again-msg");


// 버튼
const resetBtn = document.querySelector("input[type='reset']"); 
const refreshBtn = document.querySelector("#result .refresh"); 
const againBtn = document.querySelector("#result .again"); 

/* 변수 저장하기 */
const HIDDEN_CLASSNAME = "hidden";
const CHOOSENUM_KEY = "choosenumber";
const RANGENUM_KEY = "rangenumber";


/* Play 버튼 클릭 함수 */
function onPlay(event){
    // 브라우저의 기본 동작 막기
    event.preventDefault(); 
    // 입력값 가져오기
    const rangeNumValue = parseInt(rangeNum.value);
    const chooseNumValue = parseInt(chooseNum.value);
    // 입력값 localStorage에 저장하기
    localStorage.setItem(RANGENUM_KEY,rangeNumValue);
    localStorage.setItem(CHOOSENUM_KEY, chooseNumValue);
    
    /* 함수 실행 결과 */
    if(chooseNumValue > rangeNumValue ){
        // true : 안내문구 출력하고 localStorage 초기화
        chooseNotice.innerText = `※ ${rangeNumValue} 이하의 정수를 입력하세요.`;
        localStorage.clear();
    }else{
        // false : form을 숨기고 결과값 출력
        gameForm.classList.add(HIDDEN_CLASSNAME);
        printResult(); 
    }
}

/* 결과 출력 함수 */
function printResult(){    
    const savedChooseNum = parseInt(localStorage.getItem(CHOOSENUM_KEY)); 
    const savedRangeNum = parseInt(localStorage.getItem(RANGENUM_KEY)); 
    result.classList.remove(HIDDEN_CLASSNAME); // 결과값을 보이게
    const randomNum = Math.floor(Math.random() * (savedRangeNum + 1)); // 랜덤으로 숫자를 생성(범위 : 0 ~ 저장된 range값+1)
    resultMsg.innerHTML = `Your Number : ${savedChooseNum} <br><span>VS</span> <br> Game Machine Number : ${randomNum}  `; // 결과 메세지 변경
    // win, again 메세지 출력 
    if(savedChooseNum === randomNum){
        againMsg.classList.add(HIDDEN_CLASSNAME);
        winMsg.classList.remove(HIDDEN_CLASSNAME);
    }else{
        winMsg.classList.add(HIDDEN_CLASSNAME);
        againMsg.classList.remove(HIDDEN_CLASSNAME);
    }
}

/* 사용자가 선택한 숫자 저장 */
const savedChooseNum = localStorage.getItem(CHOOSENUM_KEY); // 저장된 range값

/* 기본 동작 */
if(savedChooseNum === null){
    // savedchooseNum이 없을 때 : form을 보이게 하고, submit하면 onplay함수 실행
    gameForm.classList.remove(HIDDEN_CLASSNAME); 
    gameForm.addEventListener("submit", onPlay);
}else{
    // 결과 출력 함수 실행
    printResult();
}

/* Try again 버튼 클릭 실행 함수 */
function refresh(){
    localStorage.clear();
    location.reload(); 
}

/* Reset 버튼 클릭 */
resetBtn.addEventListener("click", () => {
    chooseNotice.classList.add(HIDDEN_CLASSNAME); // chooseNotice 감추기
});

/* Refresh 버튼 클릭 */
refreshBtn.addEventListener('click', () => refresh())

/* Try Again 버튼 클릭 */
againBtn.addEventListener('click',()=>{
    printResult();
})