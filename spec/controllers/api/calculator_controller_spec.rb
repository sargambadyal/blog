require 'rails_helper'

describe Api::CalculatorController do

  let(:user) {
    User.create({:email => 'test@user.com', :password => 'password'})
  }

  context "happy path" do

    before(:each) do
      sign_in user

    end

    it "should create the new calculator if instance of calculator is not present" do
      post :create
      expect(response.status).to eq(201)
      expect(Calculator.count).to eq(1)
    end

    it "should create only 1 calculator per user" do
      post :create
      sign_out user
      user2 = User.create({:email => 'test2@user2.com', :password => 'password'})
      sign_in user2
      post :create
      expect(Calculator.count).to eq(2)
    end


    it "should create only 1 calculator per user" do
      post :create
      post :create
      expect(Calculator.count).to eq(1)
    end

    it "should give error code 404 user is created and  Calculator not created" do
      put :update, :command => "add 10"
      expect(response.status).to eq(404)
    end


    it "should give error code 200 if Calculator existing already for a given user" do
      post :create
      put :update, :command => "add 10"
      expect(response.status).to eq(200)
    end

    it "should update the calculator" do
      Calculator.create({:state => 4, :user_id => user.id})
      put :update, :command => "add 5"
      expect(response.body).to eq({:state => 9.0}.to_json)
    end
  end


  context 'sad path' do

    it 'should return 401 if user is not there and create calculator is called' do
      post :create, {:format => :json}
      expect(response.status).to eq(401)

    end
  end

end
