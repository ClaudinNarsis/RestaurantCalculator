function runPromocodeAlgo(_med_amt) {

    var per = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6];
    var upto = [40, 50, 75, 80, 100, 120];
    for (let index = 0; index < per.length; index++) {
        var discount = 0;
        if (_med_amt * per[index] > upto[index]) {
            discount = upto[index];
        } else {
            discount = _med_amt * per[index];
        }
        let functionresult = calculateminmaxpromocode(per[index], upto[index]);
        results.push(new Result('Promocode: ' + (per[index] * 100) + '% upto ' + upto[index], functionresult.min, functionresult.max, (discount / _med_amt), functionresult.ct / functionresult.ctt)); //percentage acceptable should be added
    }
}

function runFixedAlgo(_med_amt) {


    var discounts = [50, 75, 100, 125, 150, 250];

    for (let index = 0; index < discounts.length; index++) {
        if (discounts[index] / _med_amt <= 1) {
            let functionresult = calculateminmaxfixed(discounts[index]);
            results.push(new Result('Fixed Discount of Rs.' + discounts[index], functionresult.min, functionresult.max, (discounts[index] / _med_amt), functionresult.ct / functionresult.ctt)); //percentage acceptable should be added

        }
    }
}

function runFreebieAlgo(_med_amt, freebie_mc_per) {
    var limits = [99, 149, 199, 249, 299, 349, 399];
    for (let index = 0; index < limits.length; index++) {

        let functionresult = calculateminmaxfreebie(freebie_mc_per, limits[index]);
        results.push(new Result('Freebie worth of Rs.' + freebie_mc_per + ' on ordres above Rs. ' + limits[index], functionresult.min, functionresult.max, functionresult.med, functionresult.ct / functionresult.ctt)); //percentage acceptable should be added


    }
}

function runbogoAlgo(category) {
    var keys = Object.keys(category);
    keys.forEach(function(key) {
        for (var b = 1; b <= 4; b++) {
            for (var g = 1; g <= 4; g++) {
                let functionresult = calculateallbogo(key, b, g, category[key]);
                if (functionresult.burn_max != 0 || functionresult.burn_med != 0 || functionresult.burn_min != 0)
                    results.push(new Result(functionresult.promo, functionresult.burn_min, functionresult.burn_max, functionresult.burn_med, functionresult.burn_percent)); //percentage acceptable should be added

            }
        }
    })
}