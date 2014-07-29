var Calculator = function (templateId) {

    var calculator = $(templateId).find(".calculator").clone().appendTo(".baseDiv");

    this.command = $(calculator).find(".myInput");
    this.button = $(calculator).find(".myButton");
    this.commandHistory = $(calculator).find(".myHistory");
    this.observer = $({});
    this.initialize();
};

Calculator.prototype = {
    initialize: function () {
        //alert("initialize");
        this.click();
        this.createAjax();

    },

    createAjax: function () {
        $.ajax({
            url: "api/calculator_create",
            method: "POST"
        }).done(_.bind(this.checkForCalculator, this));
    },

    click: function () {
        var self = this;
        $(this.button).click(function () {
            self.calculate(self.command.val());
        });

    },

    calculate: function (command) {
        console.log("calculating..");
        var calc = this;
        $.ajax({
            url: "api/calculator_update",
            method: "PUT",
            data: {command: command}
        }).success(_.bind(this.updateCommandHistory, this));

    },

    append_command_history: function (state, command) {
        console.log("appending history..");
        var displayStatement = "<h4>Command was : " + $(command).val() +
            " Result was : " + (state === null ? "Undefined Operation" : state) + "</h4>";
        console.log("append_command_history");
        console.log(displayStatement);
        this.extract(displayStatement);

    },

    extract: function (display) {
        console.log("this is display block");
        this.commandHistory.append(display);

    },

    registerObserver: function (calculatorObserver) {
        console.log("this is register observers");
        this.observer.bind('update:history', _.bind(calculatorObserver.responseFunction, calculatorObserver));
    },

    responseFunction: function (event, state, command) {
        this.append_command_history(state, command);
    },

    notify: function (state, command) {
        console.log("this is trigger block");
        this.observer.trigger('update:history', [state, command]);
    },
    checkForCalculator: function (data, statusText, xhr) {
        //alert("calculator found or created");
        console.log("calculator found or created");
        console.log(this);
        this.commandHistory.append("<h4>Your Calculator is  " +
            (xhr.status == 201 ? "Created" : "Found") + "</h4>");
    },
    updateCommandHistory: function (data) {
        console.log("data");
        console.log(data);
        this.append_command_history(data.state, this.command);
        this.notify(data.state, this.command);
    }

};

var CalculatorHolder = function () {
    this.initialize();

};

CalculatorHolder.prototype = {
    initialize: function () {
        this.calculators = [];
        this.addCalculator();
    },
    addCalculator: function () {
        var self = this;
        $('#addCalculatorButton').click(function () {
            var newCalculator = new Calculator('#template');
            var i = 0;
            for (i = 0; i < self.calculators.length; i += 1) {
                self.calculators[i].registerObserver(newCalculator);
                newCalculator.registerObserver(self.calculators[i]);
            }
            self.calculators.push(newCalculator);
        });
    },
    clearCalculators: function () {
        var self = this;
        $('#clear').click(function () {
            self.initialize();
            $(".baseDiv").empty();

        });
    }
};


$(document).ready(function () {
    alert("YOUR APPLICATION IS READY!!");
    var myApplication = new CalculatorHolder();
    myApplication.clearCalculators();

});




