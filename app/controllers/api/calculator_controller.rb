#controls Calculator
module Api
  class CalculatorController < ApplicationController

    def create
      Calculator.first || Calculator.create({:state => 0})
      head :created
    end

    def update
      calculator = Calculator.first

      unless calculator
        head :not_found
      else
        parser = Parser.new(calculator)
        command = params[:command]
        parser.operation(command)
        render :json => { :state => calculator.state }
      end

    end

  end
end
