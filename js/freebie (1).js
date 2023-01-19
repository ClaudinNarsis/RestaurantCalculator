var XLSX = require("xlsx");
const table = XLSX.readFile('/Users/ushanandhini/Downloads/Orders_Summary_2023_01_16_16_04_09.xlsx');
const sheet = table.Sheets[table.SheetNames[0]];
var range = XLSX.utils.decode_range(sheet['!ref']);
function median(arr){
    n=arr.length;
    if ( n %2 == 0){
        let median1=arr[Math.floor(n/2)];
        let median2=arr[Math.floor(n/2)-1];
        med= (median1+median2)/2;
    }
    else{
        med = arr[Math.floor(n/2)];
    }
    return med;
}
function freebie(n){
    var tcount=0;
    var pcount=0;
    var burn=[];
    var i_burn;
    var min;
    var max;
    var med;
    var percent;
    for (let rowNum = 10; rowNum <= range.e.r; rowNum++) {
        const secondCell = sheet[XLSX.utils.encode_cell({r: rowNum, c: 16})];
        tcount++
        if(secondCell.v>149){
            pcount++
            i_burn= (n/secondCell.v) * 100;
            burn.push(i_burn);
        }
    }
    burn.sort(function(a, b){return a - b});
    med= median(burn);
    min=Math.min(...burn);
    max=Math.max(...burn);
    percent=(pcount/tcount)*100;
    return{ med,min,max,percent};
}
var median1=freebie(120).med;
var max = freebie(120).max;
var min = freebie(120).min;
var percent= freebie(120).percent;
console.log(median1);
console.log(max);
console.log(min);
console.log(percent);
