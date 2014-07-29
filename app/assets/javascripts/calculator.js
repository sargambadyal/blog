var Calculator = function (commandHistory, form) {
    this.commandHistoryId = $("#" + commandHistory);
    this.viewElement = $("#" + form);
    this.button = this.viewElement.find(".myButton");
    this.command = this.viewElement.find(".myInput");
    this.observers = $({});
    //console.log(this.command);
    this.initialize();


};

Calculator.prototype = {
    initialize: function () {
        //alert("initialize");
        this.click();
        $.ajax({
            url: "api/calculator_create",
            method: "POST"
        }).done(_.bind(f, this));
    },
    
    click: function () {
        var self = this;
        $(this.button).click(function () {

            console.log("clicked button");
            console.log("this");
            console.log(this);
            console.log("self");
            console.log(self);
            console.log("self.command");
            console.log(self.command);
            console.log(self.command.val());
            self.calculate(self.command.val());


        });

    },

    calculate: function (command) {
        //alert("calculating..");
        var calc = this;
        $.ajax({
            url: "api/calculator_update",
            method: "PUT",
            data: {command: command}
        }).success(_.bind(f2, this))

    },
    append_command_history: function (state, command) {
        //alert("appending history..");
        var displayStatement = "<h4>Command was : " + $(command).val() + " Result was : " + (state == null ? "Undefined Operation" : state) + "</h4>";
        console.log("append_command_history");
        console.log(displayStatement);
        this.extract(displayStatement);

    },
    extract: function (display) {
        console.log("this is display block");
        this.commandHistoryId.append(display);
//        this.notify(display);


    },
    registerObserver: function (calc) {
        console.log("this is register observers");
        this.observers.bind('update:history', function (event, state, command) {
            calc.append_command_history(state, command);
        });
    },
    notify: function (state, command) {
        console.log("this is trigger block");
        this.observers.trigger('update:history', [state, command]);
    }

};


var f = function (data, statusText, xhr) {
    //alert("calculator found or created");
    console.log("calculator found or created");
    console.log(this);
    this.commandHistoryId.append("<h4>Your Calculator is  " + (xhr.status == 201 ? "Created" : "Found") + "</h4>");
};

var f2 = function (data) {
    console.log("data");
    console.log(data);
    this.append_command_history(data.state, this.command);
    this.notify(data.state, this.command);
};


$(document).ready(function () {
    console.log("inside ready")
    var calculator = new Calculator("myHistory", "myForm");
    var calculator1 = new Calculator("myHistory1", "myForm1");


    console.log(calculator.observers);
    console.log(calculator1.observers);

    calculator.registerObserver(calculator1);
    calculator1.registerObserver(calculator);


});

