var Calculator = function (commandHistory) {
    this.commandHistoryId = commandHistory;
    this.button = document.getElementById("myButton");
    this.command = document.getElementById("myInput");
    this.initialize();

};

Calculator.prototype = {
    initialize: function () {
        alert("initialize");
        var calc = this;

        $.ajax({
            url: "api/calculator_create",
            method: "POST"
        }).done(function (data, statusText, xhr) {
            alert("calculator found or created");
            $("#" + calc.commandHistoryId).append("<h4>Your Calculator is  " + (xhr.status == 201 ? "Created" : "Found") + "</h4>");
        })
        return


    },



    calculate: function (command) {
        alert("calculating..");
        var calc = this;
        $.ajax({
            url: "api/calculator_update",
            method: "PUT",
            data: {command: command},
            success: function (data) {
                calc.append_command_history(data.state);
            }
        })
    },
    append_command_history: function (state) {
        alert("appending history..");
        var displayStatement = "<h4>Command was : " + $(this.command).val() + " Result was : " + (state == null ? "Undefined Operation" : state) + "</h4>";
        $("#" + this.commandHistoryId).append(displayStatement);
    }
};


$(document).ready(function () {
    alert("hello user");
    var calculator = new Calculator("myHistory");


        alert("clicked..");
        $(calculator.button).click(function () {
            alert("clicked2..");
            calculator.calculate($(calculator.command).val());

        });
});

