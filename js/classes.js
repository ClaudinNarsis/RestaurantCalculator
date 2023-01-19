var gtable10;
var gtable65;
var results = [];
let top_5;
let top_5_mc = {}; //making cost of top 5 items
let percent;
let med_amount_;
let med_discount_;
var freebie; //true or false
var freebie_mc_per; //making cost for freebie

class Result {
    constructor(promo, min_burn, max_burn, med_burn, percent_acceptable) {
        this.promo = promo;
        this.min_burn = min_burn;
        this.max_burn = max_burn;
        this.med_burn = med_burn;
        this.percent_acceptable = percent_acceptable;
    }
}