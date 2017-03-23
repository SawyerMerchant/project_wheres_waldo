class ChangeScoreToString < ActiveRecord::Migration[5.0]
  def change
    change_column :users, :score, :string
  end
end
