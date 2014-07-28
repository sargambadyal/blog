var Calculator = function (commandHistory,form) {
    this.commandHistoryId = $("#"+ commandHistory);
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
        var calc = this;
        $.ajax({
            url: "api/calculator_create",
            method: "POST"
        }).done(function (data, statusText, xhr) {
            //alert("calculator found or created");
            console.log("calculator found or created");
            calc.commandHistoryId.append("<h4>Your Calculator is  " + (xhr.status == 201 ? "Created" : "Found") + "</h4>");
        });



    },

    click:function(){
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
            data: {command: command},
            success: function (data) {
                console.log("data");
                console.log(data);
                calc.append_command_history(data.state);
            }
        })
    },
    append_command_history: function (state) {
        //alert("appending history..");
        var displayStatement = "<h4>Command was : " + $(this.command).val() + " Result was : " + (state == null ? "Undefined Operation" : state) + "</h4>";
        console.log("append_command_history")
        console.log(displayStatement)
        this.commandHistoryId.append(displayStatement);
    }
};


$(document).ready(function () {
   console.log("inside ready")
    var calculator = new Calculator("myHistory","myForm");
    var calculator1 = new Calculator("myHistory1","myForm1");

});

