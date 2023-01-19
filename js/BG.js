function BG(category, b, g, mcost) {
    function removeDuplicates(arr) {
        return arr.filter((item,
            index) => arr.indexOf(item) === index);
    }

    function median(arr) {
        n = arr.length;
        if (n % 2 == 0) {
            let median1 = arr[Math.floor(n / 2)];
            let median2 = arr[Math.floor(n / 2) - 1];
            med = (median1 + median2) / 2;
        } else {
            med = arr[Math.floor(n / 2)];
        }
        return med;
    }

    function gt0(i) {
        return i > 0;
    }

    const table65 = gtable65;
    const sheet65 = table65.Sheets[table65.SheetNames[0]];
    var range65 = XLSX.utils.decode_range(sheet65['!ref']);
    var invoice = [];
    var burnarr = [];
    var burnval = 0
    var totalcount = 0;
    var eligiblecount = 0;
    var cartval = 0;
    var burn_med = 0;
    var burn_min = 0;
    var flag = 0;
    var burn_max = 0;

    for (let rowNum = 7; rowNum <= range65.e.r; rowNum++) {
        const secondCell = sheet65[XLSX.utils.encode_cell({ r: rowNum, c: 18 })];
    }
    for (let rowNum = 7; rowNum <= range65.e.r; rowNum++) {
        const secondCell = sheet65[XLSX.utils.encode_cell({ r: rowNum, c: 2 })];
        if (!invoice.includes(secondCell.v)) {
            invoice.push(secondCell.v);
        }
    }
    invoice = removeDuplicates(invoice);
    var iterator = invoice.values();
    for (let elements of iterator) {
        var count = 0;
        burnval = 0;
        totalcount++;
        cartval = 0;
        var tmcost = 0;
        for (let rowNum = 7; rowNum <= range65.e.r; rowNum++) {
            const inno = sheet65[XLSX.utils.encode_cell({ r: rowNum, c: 2 })];
            const qty = sheet65[XLSX.utils.encode_cell({ r: rowNum, c: 8 })];
            const cat = sheet65[XLSX.utils.encode_cell({ r: rowNum, c: 18 })];
            const subtotal = sheet65[XLSX.utils.encode_cell({ r: rowNum, c: 9 })];
            if (elements == inno.v) {
                cartval += subtotal.v;
                if (category == cat.v) {
                    count += qty.v;
                }
            }
        }
        //console.log(elements,' ', cartval);


        if (count > b && (count - b) >= g) {
            eligiblecount++;
            flag = 1;
            for (var i = 0; i < g; i++) {
                tmcost += mcost;

            }
            burnval = (tmcost / cartval) * 100;
        }
        //console.log(elements,' ',tmcost);
        burnarr.push(burnval);
    }

    var promo = "B" + b + "G" + g + " for " + category;

    if (flag == 1) {
        burnarr.sort(function(a, b) { return a - b });
        burn_med = median(burnarr);

        burnarr = burnarr.filter(gt0);
        burn_min = Math.min(...burnarr);
        burn_max = Math.max(...burnarr);
    }
    var burn_percent = (eligiblecount / totalcount) * 100;
    return { promo, burn_med, burn_min, burn_max, burn_percent };
}

function callBG(category) {
    x = [];
    var keys = Object.keys(category);
    keys.forEach(function(key) {
        for (var b = 1; b <= 4; b++) {
            for (var g = 1; g <= 4; g++) {
                x.push(BG(key, b, g, category[key]));
            }
        }
    })
    return x;
}
let category = {
    'Non Veg Kathi Rolls [abbys]': 35,
    'Veg Kathi Rolls [abbys]': 30,
    'Kati Roll': 35,
    'Veg Combos [abbys]': 30,
    'Munchies [abbys]': 20
}
callBG(category);