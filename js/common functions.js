function gt200() {
    const table = gtable10;
    const sheet = table.Sheets[table.SheetNames[0]];
    var range = XLSX.utils.decode_range(sheet['!ref']);
    var count = 0;
    for (let rowNum = 10; rowNum <= range.e.r; rowNum++) {

        const secondCell = sheet[XLSX.utils.encode_cell({ r: rowNum, c: 16 })];
        if (secondCell.v > 199) {
            count++;
        }
    }
    return count;
}

function calculateminmaxpromocode(percent, upto) {
    const table = gtable10;
    const sheet = table.Sheets[table.SheetNames[0]];
    var range = XLSX.utils.decode_range(sheet['!ref']);
    let min = 999;
    let max = 0;
    let ct = 0;
    let ctt = 0;
    for (let rowNum = 10; rowNum <= range.e.r; rowNum++) {
        ctt++;
        let dis;
        const secondCell = sheet[XLSX.utils.encode_cell({ r: rowNum, c: 16 })];
        if (secondCell.v * percent > upto) {
            dis = upto / secondCell.v;
        } else {
            dis = (secondCell.v * percent) / secondCell.v;
        }
        if (dis < min)
            min = dis;
        if (dis > max)
            max = dis;
        if (secondCell.v > 149)
            ct++;
    }
    return { min, max, ct, ctt }
}

function calculateminmaxfixed(fixed) {
    const table = gtable10;
    const sheet = table.Sheets[table.SheetNames[0]];
    var range = XLSX.utils.decode_range(sheet['!ref']);
    let min = 999;
    let max = 0;
    let ct = 0;
    let ctt = 0;
    for (let rowNum = 10; rowNum <= range.e.r; rowNum++) {
        ctt++;
        let dis;
        const secondCell = sheet[XLSX.utils.encode_cell({ r: rowNum, c: 16 })];
        if (fixed / secondCell.v <= 1) {
            dis = fixed / secondCell.v;
            ct++;
        }

        if (dis < min)
            min = dis;
        if (dis > max)
            max = dis;


    }
    return { min, max, ct, ctt }
}

function calculateminmaxfreebie(n, max_cart) {
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
    var burn = [];
    const table = gtable10;
    const sheet = table.Sheets[table.SheetNames[0]];
    var range = XLSX.utils.decode_range(sheet['!ref']);
    let min = 999;
    let max = 0;
    let ct = 0;
    let ctt = 0;
    let med = 0;
    for (let rowNum = 10; rowNum <= range.e.r; rowNum++) {
        ctt++;
        let dis;
        const secondCell = sheet[XLSX.utils.encode_cell({ r: rowNum, c: 16 })];
        if (secondCell.v >= max_cart) {
            dis = n / secondCell.v;
            burn.push(dis);
            ct++;
        }

        if (dis < min)
            min = dis;
        if (dis > max)
            max = dis;


    }
    burn.sort(function(a, b) { return a - b });
    med = median(burn);
    return { min, max, med, ct, ctt }
}

function calculateallbogo(category, b, g, mcost) {
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
            burnval = (tmcost / cartval);
        }
        //console.log(elements,' ',tmcost);
        if (burnval != 0) {
            burnarr.push(burnval);
        }

    }

    var promo = "B" + b + "G" + g + " for " + category;

    if (flag == 1) {
        burnarr.sort(function(a, b) { return a - b });
        burn_med = median(burnarr);


        burn_min = Math.min(...burnarr);
        burn_max = Math.max(...burnarr);
    }
    var burn_percent = (eligiblecount / totalcount);
    return { promo, burn_med, burn_min, burn_max, burn_percent };
}