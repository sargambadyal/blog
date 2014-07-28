#controls Calculator
module Api
  class CalculatorController < ActionController::Base

    def create

      if (Calculator.first)
        head :ok
      else
        Calculator.create({:state => 0})
        head :created
      end
    end

    def update
      calculator = Calculator.first

      unless calculator
        head :not_found
      else
        parser = Parser.new(calculator)
        command = params[:command]
        parser.operation(command)
        render :json => {:state => calculator.state}
      end

    end

  end
end
