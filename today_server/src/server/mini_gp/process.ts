import { Poker } from './bodys';

let STABLE_CARDS: number[] = [
    3,4,5,6,7,8,9,10,11,12,
    103,104,105,106,107,108,109,110,111,112,
    203,204,205,206,207,208,209,210,211,212,
    303,304,305,306,307,308,309,310,311,312,
];

export class Process {
    private static readonly _process: Process = new Process();

    public static getInstance(): Process {
        return this._process;
    }

    private constructor() {

    }

    private _heapcards: number[] = [];
    private _cards: number[[]] = [];

    // 随机选择一个color
    private random_color(): number {
        return Math.floor(Math.random() * 4)
    }

    private shuffle() {
        this._heapcards = STABLE_CARDS.slice(0);
        let _kColor = this.random_color();
        for (let i = 0; i < 4; ++i) {
            if (_kColor != i) {
                this._heapcards.push(i * 100 + 13);
            }
        }
        let _A = this.random_color() * 100 + 14;
        this._heapcards.push(_A);
        let _2 = this.random_color() * 100 + 15;
        this._heapcards.push(_2);
        
        for (let i = this._heapcards.length - 1; i >= 1; --i) {
            let randomValue = Math.floor(Math.random() * (i + 1))
            let tmp = this._heapcards[i];
            this._heapcards[i] = this._heapcards[randomValue];
            this._heapcards[randomValue] = tmp;
        }
    }

    private cards_sort(cards) {
        cards.sort(function(a, b) {
            a = a % 100;
            b = b % 100;
            return a - b;
        });
    }

    public deal() {
        let cards0 = [];
        let cards1 = [];
        for (let i = 0; i < heapcards.length - 15; ++i) {
            if (i % 2 == 0) {
                cards0.push(heapcards[i]);
            } else {
                cards1.push(heapcards[i]);
            }
        }
        cards_sort(cards0);
        cards_sort(cards1);
        this._cards.push(cards0);
        this._cards.push(cards1);
    }

}