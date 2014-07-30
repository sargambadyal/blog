#controls Calculator
module Api
  class CalculatorController < ApiController
   respond_to :json

    def create
      user = User.find(current_user)
      if(user.nil?)
        head :unauthorized
      elsif(user.calculator)
        head :ok
      else
        Calculator.create({:state => 0, :user_id => user.id})
        head :created
      end
    end

    def update
      user = User.find(current_user)
      calculator = user.calculator

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