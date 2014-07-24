class AddStateToCalculator < ActiveRecord::Migration
  def change
    add_column :calculators, :state, :float
  end
end
