require 'rspec'

describe 'Router' do

  it 'should return 5 for ' do
    router = Router.new()
    expect(router.map(["add",5])).to eq(5)
  end
end