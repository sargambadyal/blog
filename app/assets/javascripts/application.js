// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

$(document).ready(function() {
    $.ajaxSetup({
        'beforeSend': function (xhr) {
            xhr.setRequestHeader("Accept", "text/javascript")
        }
    });
    var submit = document.getElementsByName("Calculate");
    var calculatorCreated = false;
    $(submit).click(function () {

        if (calculatorCreated == false) {
            $.ajax({
                type: "POST",
                url: "api/calculator/create"
            }).success(function (data) {
                calculatorCreated = true;
                console.log('CalculatorCreated');
                calculate($('#command').val());
            });

        }
        else
        {
            calculate($('#command').val());
        }
    });
    function calculate(command)
    {
        $.ajax({
            type: "PUT",
            url: "api/calculator/update",
            data: {command: command}
        }).success(function (data) {
            console.log(data.state);
            var result = document.getElementsByClassName("result");
            $(result).text("Result is "+ data.state);
        });
    }
});



