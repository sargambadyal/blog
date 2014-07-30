class RemoveColumn < ActiveRecord::Migration
  def change
    remove_column :calculators, :user_id
  end
end
