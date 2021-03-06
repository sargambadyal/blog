require 'rails_helper'

describe 'Parser' do

  let(:calculator){
    Calculator.new({:state => 0})
  }

  it 'should be ["add",5] for add 5' do
      parser = Parser.new(calculator)
      expect(parser.parse("add 5")).to eq(["add",5])
  end

  it 'should be ["sub",5] for sub 5' do
    parser = Parser.new(calculator)
    expect(parser.parse("sub 5")).to eq(["sub",5])
  end


  it 'should be ["mul",5] for mul 5' do
    parser = Parser.new(calculator)
    expect(parser.parse("mul 5")).to eq(["mul",5])
  end

  it 'should be ["div",5] for mul 5' do
    parser = Parser.new(calculator)
    expect(parser.parse("div 5")).to eq(["div",5])
  end

  it 'should call operation and add 5' do
    parser = Parser.new(calculator)
    expect(parser.operation("add 5")).to eq(5)
  end


end