function calculateAllPossibilities() {
    runPromocodeAlgo(med_amount_);

    runFixedAlgo(med_amount_);
    if (freebie)
        runFreebieAlgo(med_amount_, freebie_mc_per);
    runbogoAlgo(top_5_mc);
    console.log(results);
}