const MAXSAFEINTEGER = 9007199254740991;

let DATASET = "";
let CURPROBLEM = "";

let VALUE_C = "";
let VALUE_P = "";
let VALUE_X = "";

let START_TIME = 0.0;
let LAP_START_TIME = 0.0;
let CUR_TIME = 0.0;

let CORRECT_COUNT = 0;
let INCORRECT_COUNT = 0;
let GIVE_UP_COUNT = 0;

let isPrimeFactor = true;

let inputValueC = document.getElementById("inputValueC");
let inputValueP = document.getElementById("inputValueP");
let inputValueX = document.getElementById("inputValueX");

const primeFactor = document.getElementById("PrimeFactor");
const checkBox2x = document.getElementById("2xCheckBox");
const checkBox3x = document.getElementById("3xCheckBox");
const checkBox5x = document.getElementById("5xCheckBox");
const checkBox7x = document.getElementById("7xCheckBox");
const checkBox11x = document.getElementById("11xCheckBox");
const checkBox13x = document.getElementById("13xCheckBox");
const buttonStart = document.getElementById("buttonStart");
const tableJundgeLog = document.getElementById("tableJudgeLog");
const tbodyJundgeLog = document.getElementById("tbodyJudgeLog");
const buttonReset = document.getElementById("buttonReset");
const buttonJudge = document.getElementById("buttonJudge");
const buttonGiveUp = document.getElementById("buttonGiveUp");

const FILEPATH2x = "./assets/data/2x";
const FILEPATH3x = "./assets/data/3x";
const FILEPATH5x = "./assets/data/5x";
const FILEPATH7x = "./assets/data/7x";
const FILEPATH11x = "./assets/data/11x";
const FILEPATH13x = "./assets/data/13x";

////////////////////////////////////////////////////////////////////////////////

// テーブルの初期化
function clearTable() {
    tbodyJundgeLog.innerHTML = "";

}

function resetData() {
    DATASET = "";
}

// 問題のロード
const loadData = (async() => {

    if(PrimeFactor.checked) {
        isPrimeFactor = true;

    } else {
        isPrimeFactor = false;
    }

    let _data = "";

    if(checkBox2x.checked) {
        let responce = await fetch(FILEPATH2x);
        _data += (await responce.text()).replaceAll("\r", "");

    }

    if(checkBox3x.checked) {
        let responce = await fetch(FILEPATH3x);
        _data +=  (await responce.text()).replaceAll("\r", "");

    }

    if(checkBox5x.checked) {
        let responce = await fetch(FILEPATH5x);
        _data += (await responce.text()).replaceAll("\r", "");

    }

    if(checkBox7x.checked) {
        let responce = await fetch(FILEPATH7x);
        _data += (await responce.text()).replaceAll("\r", "");

    }

    if(checkBox11x.checked) {
        let responce = await fetch(FILEPATH11x);
        _data += (await responce.text()).replaceAll("\r", "");

    }

    if(checkBox13x.checked) {
        let responce = await fetch(FILEPATH13x);
        _data += (await responce.text()).replaceAll("\r", "");

    }

    _data = _data.split("\n");
    _data.pop();

    DATASET = _data;

});


// 入力の初期化
function resetInput() {
    VALUE_C = "";
    VALUE_P = "";
    VALUE_X = "";
    inputValueC.value = "";
    inputValueP.value = "";
    inputValueX.value = "";
    inputValueC.disabled = false;
    inputValueP.disabled = false;
    inputValueX.disabled = false;
    buttonReset.disabled = true;
    buttonJudge.disabled = true;

    // inputValueCにフォーカス
    inputValueC.focus();
}

//　問題の生成
function genPloblem() {

    let _ploblemCount = DATASET.length;
    let _ploblemNum = Math.floor(Math.random()*(_ploblemCount));
    let _handArray = ""

    // 問題を設定
    CURPROBLEM = DATASET[_ploblemNum];
    _handArray = CURPROBLEM.split("");


    // 手札の表示
    for(let _idx in _handArray) {
        let _docHand = "localHand"+_idx;
        document.getElementById(_docHand).innerText = _handArray[_idx];

    }

}

// 時間の取得
function getTime(type) {
    switch(type) {
        case "START_TIME" :
            START_TIME = new Date();
            START_TIME = START_TIME.getTime() / 1000;
            START_TIME = START_TIME.toFixed(3);
            break;

            case "CUR_TIME" :
                CUR_TIME = new Date();
                CUR_TIME = CUR_TIME.getTime() / 1000;
                CUR_TIME = CUR_TIME.toFixed(3);
                break;
            }
        }

        // 入力チェック
        function checkInput() {
            let inputArray = [];
    let curProblemArray = CURPROBLEM.toUpperCase().split('').sort().join('');

    inputArray = inputArray.concat(VALUE_C.split(''));
    inputArray = inputArray.concat(VALUE_P.split(''));
    inputArray = inputArray.concat(VALUE_X.split(''));
    inputArray = inputArray.sort().join('');

    // Resetボタンの有効化
    if(inputArray.length >= 1) {
        buttonReset.disabled = false;

    } else {
        buttonReset.disabled = true;

    }

    // Submitボタンの有効化
    if(inputArray == curProblemArray) {
        buttonJudge.disabled = false;

        document.onkeydown = function (e) {
            if (e.key === 'Enter') {
                buttonJudge.click();
                inputValueC.blur();
                inputValueP.blur();
                inputValueX.blur();
            }
        }

    } else {
        buttonJudge.disabled = true;

    }
}


// 判定
function judgeEquation() {
    let _c = card2Num(VALUE_C);
    let _p = card2Num(VALUE_P);
    let _x = card2Num(VALUE_X);

    if(isPrimeFactor) {
        if(_c == _p*_x && isPrime(_x) && isPrime(_p)) {
            return "correct";

        } else {
            return "incorrect";

        }

    } else {
        if(_c == _p*_x) {
            return "correct";

        } else {
            return "incorrect";

        }
    }
}

// テーブル追加
function addTable(correctFlag) {
    let row = tbodyJundgeLog.insertRow(0);
    let cell0 = row.insertCell(0);
    let cell1 = row.insertCell(1);
    let cell2 = row.insertCell(2);
    let cell3 = row.insertCell(3);
    let cell4 = row.insertCell(4);
    let cell5 = row.insertCell(5);
    let cell6 = row.insertCell(6);
    let cell7 = row.insertCell(7);

    cell0.appendChild(document.createTextNode(CURPROBLEM));
    cell0.classList.add("tablebody-text");
    cell0.classList.add("fs-5");

    switch(correctFlag) {
        case "correct" :
            row.classList.add("table-success");

            cell1.appendChild(document.createTextNode(VALUE_C+" = "+VALUE_P+" × "+VALUE_X));
            cell1.classList.add("tablebody-text");
            cell1.classList.add("fs-5");

            cell2.appendChild(document.createTextNode("Correct"));
            cell2.classList.add("fs-5");

            getTime("CUR_TIME");

            let _lapDiff = (CUR_TIME - LAP_START_TIME).toFixed(3);
            cell3.appendChild(document.createTextNode(_lapDiff));
            cell3.classList.add("fs-5");

            let _totalDiff = (CUR_TIME - START_TIME).toFixed(3);
            cell4.appendChild(document.createTextNode(_totalDiff));
            cell4.classList.add("fs-5");

            CORRECT_COUNT++;
            cell5.appendChild(document.createTextNode(CORRECT_COUNT));
            cell5.classList.add("fs-5");

            cell6.appendChild(document.createTextNode(INCORRECT_COUNT));
            cell6.classList.add("fs-5");

            cell7.appendChild(document.createTextNode(GIVE_UP_COUNT));
            cell7.classList.add("fs-5");

            LAP_START_TIME = CUR_TIME;

            genPloblem();
            break;

            case "incorrect" :
                row.classList.add("table-danger");

            cell1.appendChild(document.createTextNode(VALUE_C+" = "+VALUE_P+" × "+VALUE_X));
            cell1.classList.add("tablebody-text");
            cell1.classList.add("fs-5");

            cell2.classList.add("table-danger");
            cell2.appendChild(document.createTextNode("Incorrect"));
            cell2.classList.add("fs-5");

            cell5.appendChild(document.createTextNode(CORRECT_COUNT));
            cell5.classList.add("fs-5");

            INCORRECT_COUNT++;
            cell6.appendChild(document.createTextNode(INCORRECT_COUNT));
            cell6.classList.add("fs-5");

            cell7.appendChild(document.createTextNode(GIVE_UP_COUNT));
            cell7.classList.add("fs-5");

            break;

            case "giveup" :
                row.classList.add("table-danger");

                cell1.appendChild(document.createTextNode(""));

                cell2.appendChild(document.createTextNode("GiveUp"));
                cell2.classList.add("fs-5");

                cell5.appendChild(document.createTextNode(CORRECT_COUNT));
            cell5.classList.add("fs-5");

            cell6.appendChild(document.createTextNode(INCORRECT_COUNT));
            cell6.classList.add("fs-5");

            GIVE_UP_COUNT++;
            cell7.appendChild(document.createTextNode(GIVE_UP_COUNT));
            cell7.classList.add("fs-5");

            break;
        }
    }

    function resetScore() {
        CORRECT_COUNT = 0;
        INCORRECT_COUNT = 0;
    GIVE_UP_COUNT = 0;
}

function autoReplace(inputValue) {
    return inputValue.replaceAll('1', 'A').toUpperCase();
}

////////////////////////////////////////////////////////////////////////////////
// modPow
export function modPow(a, n, mod) {
    let result = 1n;
    while(n > 0) {
        if(n & 1n) {
            result = (result * a) % mod
        }

        a = (a * a) % mod;
        n >>= 1n
    }

    return result;
}

// isPrime
function isPrime(n) {
    if(n == 2n) {
        return true;
    }

    if(n <= 1n || n % 2n == 0) {
        return false;
    }

    let d = n - 1n;
    let s = 0n;

    while(d % 2n != 0) {
        d /= 2n;
        s += 1n
    }

    let safeInteger = MAXSAFEINTEGER;
    if (n < MAXSAFEINTEGER) {
        safeInteger = Number(n);
    }

    for(var i = 0; i < 50; i++) {
        let a = BigInt(Math.floor(Math.random() * safeInteger));

        if(modPow(a, d, n) == 1n) {
            return true;
        }

        for(var j = 0; j < s; j++) {
            if (modPow(a, modPow(2n, j, n) * d, n) == n - 1n) {
                return true;
            }
        }
        return false;
    }
}

// card2bigInt
function card2bigInt(card) {
    card = card.replaceAll('A', '1')
               .replaceAll('T', '10')
               .replaceAll('J', '11')
               .replaceAll('Q', '12')
               .replaceAll('K', '13')
               .replaceAll('a', '1')
               .replaceAll('t', '10')
               .replaceAll('j', '11')
               .replaceAll('q', '12')
               .replaceAll('k', '13')

    return BigInt(card)
}

// カードから数を生成
function card2Num(card) {
    return BigInt(card.replaceAll('A', '1').replaceAll('T', '10').replaceAll('J', '11').replaceAll('Q', '12').replaceAll('K', '13'));
}

////////////////////////////////////////////////////////////////////////////////

// ゲームの開始
buttonStart.onclick = () => {
    clearTable();
    loadData();
    genPloblem();
    genPloblem();
    resetInput();
    resetScore();
    buttonGiveUp.disabled = false;
    getTime("START_TIME");
    LAP_START_TIME = START_TIME;

}

// チェックボックスが変更されるたびにloadDataさせる
checkBox2x.addEventListener("change", (event) => {
    loadData();

});

checkBox3x.addEventListener("change", (event) => {
    loadData();

});

checkBox5x.addEventListener("change", (event) => {
    loadData();

});

checkBox7x.addEventListener("change", (event) => {
    loadData();

});

checkBox11x.addEventListener("change", (event) => {
    loadData();

});

checkBox13x.addEventListener("change", (event) => {
    loadData();

});


// 判定可能チェック
inputValueC.addEventListener("input", (event) => {
    VALUE_C = inputValueC.value.replaceAll('1', 'A').toUpperCase();
    checkInput();

});

inputValueP.addEventListener("input", (event) => {
    VALUE_P = inputValueP.value.replaceAll('1', 'A').toUpperCase();
    checkInput();

});

inputValueX.addEventListener("input", (event) => {
    VALUE_X = inputValueX.value.replaceAll('1', 'A').toUpperCase();
    checkInput();

});

// Resetボタン
buttonReset.onclick = () => {
    resetInput();

}

// Submitボタン
buttonJudge.onclick = () => {
    let correctFlag = judgeEquation();
    addTable(correctFlag);
    resetInput();

}

// GiveUpボタン
buttonGiveUp.onclick = () => {
    addTable("giveup");
    resetInput();
    genPloblem();

}

// enterキーの無効
document.onkeydown = function (e) {
    if (e.key === 'Enter') {
        return false;

    }
}
document.onkeyup = function (e) {
    if (e.key === 'Enter') {
        return false;

    }
}

// アクセス時に実行
function main() {
    loadData();
    loadData();

}

main();