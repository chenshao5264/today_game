let STABLE_CARDS: number[] = [
    3,4,5,6,7,8,9,10,11,12,
    103,104,105,106,107,108,109,110,111,112,
    203,204,205,206,207,208,209,210,211,212,
    303,304,305,306,307,308,309,310,311,312,
];

function random_color(): number {
    return Math.floor(Math.random() * 4)
}


let heapcards = STABLE_CARDS.slice(0)

let _kColor = random_color();
for (let i = 0; i < 4; ++i) {
    if (_kColor != i) {
        heapcards.push(i * 100 + 13);
    }
}
let _A = random_color() * 100 + 14;
heapcards.push(_A);
let _2 = random_color() * 100 + 15;
heapcards.push(_2);


let index = Math.floor(Math.random() * 46)

for (let i = heapcards.length - 1; i >= 1; --i) {
    let randomValue = Math.floor(Math.random() * (i + 1))
    let tmp = heapcards[i];
    heapcards[i] = heapcards[randomValue];
    heapcards[randomValue] = tmp;
}

let cards = [];
let cards0 = [];
let cards1 = [];
for (let i = 0; i < heapcards.length - 15; ++i) {
    if (i % 2 == 0) {
        cards0.push(heapcards[i]);
    } else {
        cards1.push(heapcards[i]);
    }
}



function cards_sort(cards) {
    cards.sort(function(a, b) {
        a = a % 100;
        b = b % 100;
        return a - b;
    })
}

cards_sort(cards0);
cards_sort(cards1);


cards.push(cards0)
cards.push(cards1)

console.log(cards)
