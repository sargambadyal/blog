var Calculator = function (commandHistory, form) {
    this.commandHistoryId = $("#" + commandHistory);
    this.viewElement = $("#" + form);
    this.button = this.viewElement.find(".myButton");
    this.command = this.viewElement.find(".myInput");
    //console.log(this.command);
    this.initialize();
    this.click();

};

Calculator.prototype = {
    initialize: function () {
        //alert("initialize");
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
    append_command_history: function (state) {
        //alert("appending history..");
        var displayStatement = "<h4>Command was : " + $(this.command).val() + " Result was : " + (state == null ? "Undefined Operation" : state) + "</h4>";
        console.log("append_command_history");
        console.log(displayStatement);
        this.commandHistoryId.append(displayStatement);
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
    this.append_command_history(data.state);
};


$(document).ready(function () {
    console.log("inside ready")
    var calculator = new Calculator("myHistory", "myForm");
    var calculator1 = new Calculator("myHistory1", "myForm1");

});

