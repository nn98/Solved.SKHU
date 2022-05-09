all_tier = ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Ruby']
all_subtier = ['V', "IV", 'III', 'II', 'I']

// Solved AC 데이터 가져오기
async function getSolvedacUserData() {
    let response = await fetch("https://solved.ac/api/v3/user/show?handle=q9922000", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });

    let data = await response.json();
    return data;
}

// Solved AC 데이터 적용하기
async function loadSolvedacUserData() {
    let data = await getSolvedacUserData();
    let calculateTier = await calculateSolvedacTier(data.tier);
    let count = document.querySelector('#totalSolvedCount');
    let tier = document.querySelector('#solvedTier');
    let maxstreak = document.querySelector('#solvedMaxStreak');

    count.innerHTML = `백준에서 푼 문제 수 <b class="text-primary">${data.solvedCount}</b>`;
    tier.innerHTML = `백준 티어 <b class="text-primary">${calculateTier}</b>`;
    maxstreak.innerHTML = `최대 연속 문제 풀이일 수 <b class="text-primary">${data.maxStreak}일</b>`;

}


// Solved AC 티어 계산
async function calculateSolvedacTier(idx) {
    let tier = 0
    let subtier = 0

    if (Number.isInteger(idx/5)) {
        tier = Math.floor(idx/5)-1
    } else {
        tier = Math.floor(idx/5)
    }

    if (idx%5 == 1) {
        subtier = 0
    }else if (idx%5 == 0) {
        subtier = 4
    } else {
        subtier = (idx%5)-1
    }

    return `${all_tier[tier]} ${all_subtier[subtier]}`
}