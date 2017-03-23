class ChangeScoreToInt < ActiveRecord::Migration[5.0]
  def change
    remove_column :users, :score
    add_column :users, :score, :integer
  end
end
