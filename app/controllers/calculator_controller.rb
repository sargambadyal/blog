
#controls Calculator
  class CalculatorController < ApplicationController

    def index
      Calculator.last || Calculator.create({:state => 0})
    end

    def update
      @calculator = Calculator.last || Calculator.create({:state => 0})
      parser = Parser.new(@calculator)
      command = params[:command]
      @subtext = parser.operation(command)
      puts @subtext
      render 'index'
    end

  end
