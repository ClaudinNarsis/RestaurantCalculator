function excelToWorkbook10(file) {

    var reader = new FileReader();
    reader.onload = function(e) {
        var data = e.target.result;
        gtable10 = XLSX.read(data, {
            type: 'binary'
        });
    };
    reader.onerror = function(ex) {
        console.log(ex);
    };
    reader.readAsBinaryString(file);

}

function excelToWorkbook65(file) {

    var reader = new FileReader();
    reader.onload = function(e) {
        var data = e.target.result;
        gtable65 = XLSX.read(data, {
            type: 'binary'
        });
    };
    reader.onerror = function(ex) {
        console.log(ex);
    };
    reader.readAsBinaryString(file);

}
$(document).ready(function() {
    // $(".form-wrapper .button").click(function() {
    //     var button = $(this);
    //     var currentSection = button.parents(".section");
    //     var currentSectionIndex = currentSection.index();
    //     var headerSection = $('.steps li').eq(currentSectionIndex);
    //     currentSection.removeClass("is-active").next().addClass("is-active");
    //     headerSection.removeClass("is-active").next().addClass("is-active");

    //     $(".form-wrapper").submit(function(e) {
    //         e.preventDefault();
    //     });


    //     if (currentSectionIndex === 3) {
    //         $(document).find(".form-wrapper .section").first().addClass("is-active");
    //         $(document).find(".steps li").first().addClass("is-active");
    //     }
    // });
    // $(".form-wrapper #fileupload").click(function() {
    //     var fileexcel10 = document.getElementById('excel10').value;
    //     console.log(fileexcel10.target);


    // });
    var excel10 = document.getElementById('excel10');
    excel10.onchange = e => {
        var file = e.target.files[0];
        excelToWorkbook10(file);
    }
    var excel65 = document.getElementById('excel65');
    excel65.onchange = e => {
        var file = e.target.files[0];
        excelToWorkbook65(file);
    }
    $(".form-wrapper #fileupload").click(function() {
        console.log('next button pressed');
        basicFunction();

        if (top_5 != null && percent != null && med_amount_ != null && med_discount_ != null) {
            var button = $(this);
            var currentSection = button.parents(".section");
            var currentSectionIndex = currentSection.index();
            var headerSection = $('.steps li').eq(currentSectionIndex);
            currentSection.removeClass("is-active").next().addClass("is-active");
            headerSection.removeClass("is-active").next().addClass("is-active");
        } else {
            alert('something went wrong, Please try again');
        }
    });

    $(".form-wrapper #submitdata").click(function() {

        function rounddigit(num) {
            num = num * 100;
            num = Math.round(num);
            return num / 100;
        }

        let off_freebie = document.getElementsByName('r1');
        freebie = off_freebie[0].checked;
        freebie_mc_per = Number(document.getElementById('off_freebie_making_cost').value);
        if (freebie == true && freebie_mc_per == 0) {
            alert('something went wrong, Please fill value of freebie');
            return;
        }
        let _i = 1;
        for (let t in top_5) {

            top_5_mc[t] = Number(document.getElementById('off_most' + _i + '_making_cost').value);
            if (top_5_mc[t] == 0) {
                alert('something went wrong, Please fill value of' + t);
                return;
            }
            _i++
        }
        calculateAllPossibilities();
        var button = $(this);
        var currentSection = button.parents(".section");
        var currentSectionIndex = currentSection.index();
        var headerSection = $('.steps li').eq(currentSectionIndex);
        currentSection.removeClass("is-active").next().addClass("is-active");
        headerSection.removeClass("is-active").next().addClass("is-active");


        var table = document.getElementById('resulttable');
        for (let i = 0; i < results.length; i++) {
            var row = table.insertRow(i + 1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
            var cell5 = row.insertCell(4);
            var cell6 = row.insertCell(5);
            var cell7 = row.insertCell(6);
            cell1.innerHTML = results[i].promo;
            cell2.innerHTML = rounddigit(results[i].min_burn * 100) + '%';
            cell3.innerHTML = rounddigit(results[i].max_burn * 100) + '%';
            cell4.innerHTML = rounddigit(results[i].med_burn * 100) + '%';
            cell5.innerHTML = rounddigit(results[i].percent_acceptable * 100) + '%';
            // cell6.innerHTML = rounddigit(((med_discount_ / med_amount_) - results[i].med_burn) * 100) + '%';
            // cell7.innerHTML = rounddigit((results[i].percent_acceptable * 100) - percent) + '%';
            cell6.innerHTML = 'From ' + rounddigit(((med_discount_ / med_amount_)) * 100) + '% To ' + rounddigit((results[i].med_burn) * 100) + '%';
            cell7.innerHTML = 'From ' + rounddigit(percent) + '% To ' + rounddigit((results[i].percent_acceptable * 100)) + '%';
            if (rounddigit(((med_discount_ / med_amount_)) * 100) >= rounddigit((results[i].med_burn) * 100))
                cell6.style.color = 'green';
            else
                cell6.style.color = 'red';

            if (rounddigit(percent) <= rounddigit((results[i].percent_acceptable * 100)))
                cell7.style.color = 'green';
            else
                cell7.style.color = 'red';

        }



    });

});