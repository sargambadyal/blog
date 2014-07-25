#controls Calculator
class CalculatorController < ApplicationController
  def update
    command = params[:command]
    render :text => "5.0", :status => :ok
  end
end