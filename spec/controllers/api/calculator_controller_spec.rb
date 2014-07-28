require 'rails_helper'

describe Api::CalculatorController do

  it "creates the new calculator if instance of calculator is not there" do
    post :create
    expect(response.status).to eq(201)
    expect(Calculator.count).to eq(1)
  end

  it "should create only 1 calculator" do
    post :create
    post :create
    expect(response.status).to eq(200)
    expect(Calculator.count).to eq(1)
  end

  it "should give error code 404 if Calculator not created" do
    put :update, :command => "add 10"
    expect(response.status).to eq(404)
  end

  it "should give error code 200 if Calculator existing already" do
    Calculator.create({:state => 0})
    put :update, :command => "add 10"
    expect(response.status).to eq(200)
  end

  it "should update the calculator" do
    Calculator.create({:state => 0})
    put :update, :command => "add 5"
    expect(response.body).to eq({:state => 5.0}.to_json)
  end
end
