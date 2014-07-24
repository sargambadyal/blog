require 'rails_helper'

describe 'Calculator' do

  context "Addition" do
  it 'should add 5 to stored value 0' do
    calculator  = Calculator.new(0)
    expect(calculator.+(5)).to eq(5)
  end

  end


end