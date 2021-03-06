require 'rails_helper'

describe 'Router' do

  let(:calculator){

    Calculator.new({:state => 0})
  }

  let(:calculator1){
    Calculator.new({:state => 5})
  }
  it 'should return 5 for ["add",5] ' do
    router = Router.new(calculator)
    expect(router.map(["add",5])).to eq(5)
  end

  it 'should return -5 for ["sub",5] ' do
    router = Router.new(calculator)
    expect(router.map(["sub",5])).to eq(-5)
  end

  it 'should return 25 for ["mul",5] ' do
    router = Router.new(calculator1)
    expect(router.map(["mul",5])).to eq(25)
  end

  it 'should return 1 for ["div",5] ' do
    router = Router.new(calculator1)
    expect(router.map(["div",5])).to eq(1)
  end

  it 'should return 0 for ["cancel"] ' do
    router = Router.new(calculator)
    expect(router.map(["cancel"])).to eq(0)
  end

  it 'should return "Incorrect command" for ["lol"] ' do
    router = Router.new(calculator)
    expect(router.map(["lol"])).to eq("Incorrect command")
  end

end