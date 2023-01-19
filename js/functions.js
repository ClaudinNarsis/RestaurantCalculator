function basicFunction() {
    const table = gtable10;
    const sheet = table.Sheets[table.SheetNames[0]];
    var range = XLSX.utils.decode_range(sheet['!ref']);
    const table65 = gtable65;
    const sheet65 = table65.Sheets[table.SheetNames[0]];
    var range65 = XLSX.utils.decode_range(sheet65['!ref']);



    let med = 0;

    function removeDuplicates(arr) {
        return arr.filter((item,
            index) => arr.indexOf(item) === index);
    }

    function med_discount() {
        const discount = [];
        for (let rowNum = 10; rowNum <= range.e.r; rowNum++) {
            const secondCell = sheet[XLSX.utils.encode_cell({ r: rowNum, c: 17 })];
            discount.push(secondCell.v); // secondCell.v contains the value, i.e. string or number
        }
        discount.sort(function(a, b) { return a - b });

        let n = discount.length;
        if (n % 2 == 0) {
            let median1 = discount[Math.floor(n / 2)];
            let median2 = discount[Math.floor(n / 2) - 1];
            med = (median1 + median2) / 2;
        } else {
            med = discount[Math.floor(n / 2)];
        }
        return med;
    }

    function med_amount() {
        const amount = [];
        for (let rowNum = 10; rowNum <= range.e.r; rowNum++) {
            const secondCell = sheet[XLSX.utils.encode_cell({ r: rowNum, c: 16 })];
            amount.push(secondCell.v); // secondCell.v contains the value, i.e. string or number
        }

        amount.sort(function(a, b) { return a - b });
        /*var iterator = discount.values();
          
        // Here all the elements of the array is being printed.
        for (let elements of iterator) {
          console.log(elements);
        }*/
        let n = amount.length;
        if (n % 2 == 0) {
            let median1 = amount[Math.floor(n / 2)];
            let median2 = amount[Math.floor(n / 2) - 1];
            med = (median1 + median2) / 2;
        } else {
            med = amount[Math.floor(n / 2)];
        }

        return med;
    }

    function user_percent() {
        let user = 0;
        let ud = 0;
        for (let rowNum = 10; rowNum <= range.e.r; rowNum++) {
            const secondCell = sheet[XLSX.utils.encode_cell({ r: rowNum, c: 17 })];
            user = user + 1;
            if (secondCell.v != 0) {
                ud = ud + 1;
            }
        }
        let percent = (ud / user) * 100;
        return percent;
    }

    function category() {
        var categories = {};
        var order_categories = {};
        var top_5 = {};
        var count = 0;
        var invoice = [];
        var keys = Object.keys(categories);
        for (let rowNum = 7; rowNum <= range65.e.r; rowNum++) {
            const secondCell = sheet65[XLSX.utils.encode_cell({ r: rowNum, c: 18 })];
            keys = Object.keys(categories);
            if (!keys.includes(secondCell.v)) {
                categories[secondCell.v] = 0;
                order_categories[secondCell.v] = 0;
            }
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
            var keys = Object.keys(order_categories);
            keys.forEach(function(key) {
                order_categories[key] = 0;
            });
            for (let rowNum = 7; rowNum <= range65.e.r; rowNum++) {
                const secondCell = sheet65[XLSX.utils.encode_cell({ r: rowNum, c: 2 })];
                const thirdcell = sheet65[XLSX.utils.encode_cell({ r: rowNum, c: 8 })];
                const fourthcell = sheet65[XLSX.utils.encode_cell({ r: rowNum, c: 18 })];
                if (elements == secondCell.v) {
                    order_categories[fourthcell.v] += thirdcell.v;
                }
            }
            var dup = keys.values();
            for (let ee of dup) {
                if (order_categories[ee] > 1) {
                    categories[ee] += 1;
                }

            }

        }
        var values = [];
        var keys = Object.keys(categories);
        keys.forEach(function(key) {
            values.push(categories[key]);
        });
        values.sort(function(a, b) { return a - b });
        var length = values.length;

        for (let i = length - 1; i > length - 7; i--) {
            var dup = keys.values();
            for (let ee of dup) {
                if (categories[ee] == values[i]) {
                    top_5[ee] = values[i];
                    count = count + 1;

                }
                if (count == 5) {
                    break;
                }

            }
            if (count == 5) {
                break;
            }
        }
        return top_5;
    }

    function settop5category(top_5) {
        let c = 1;
        for (let cat in top_5) {
            $('#get_making_cost').append('<label for="off_most' + c + '_making_cost" id="' + c + '_making_cost"> What is the food cost of the ' + cat + ' item (in Rupee)<br><input type="number" name="off_most' + c + '_making_cost" id="off_most' + c + '_making_cost"></label><br><br>');
            c++;
        }

    }
    top_5 = category();
    settop5category(top_5);
    console.log('Top 5 categories');
    console.log(top_5);

    percent = user_percent();
    console.log('user percent');
    console.log(percent);


    med_amount_ = med_amount();
    console.log('med_amount');
    console.log(med_amount_);

    med_discount_ = med_discount();
    console.log('med_discount');
    console.log(med_discount_);




}