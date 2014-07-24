#models a calculator
class Calculator < ActiveRecord::Base

  def initialize initial_state = 0
    @state = initial_state
  end

  def +(operand)
    @state += 5
  end
end
