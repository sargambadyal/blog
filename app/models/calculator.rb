#models a calculator
class Calculator < ActiveRecord::Base
  belongs_to :user

  def + operand
    self.state += operand
    self.save
    self.state
  end

  def - operand
    self.state  -= operand
    self.save
    self.state
  end

  def * operand
    self.state *= operand
    self.save
    self.state
  end

  def / operand
    self.state /= operand
    self.save
    self.state
  end

  def reset
    self.state = 0
    self.save
    self.state
  end


end
