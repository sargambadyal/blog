require 'rails_helper'

describe 'Parser' do

  it 'should be ["add",5] for add 5' do
      parser = Parser.new()
      expect(parser.parse("add 5")).to eq(["add",5])
  end

  it 'should be ["sub",5] for sub 5' do
    parser = Parser.new()
    expect(parser.parse("sub 5")).to eq(["sub",5])
  end
end