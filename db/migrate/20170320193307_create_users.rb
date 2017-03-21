class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.integer :score
      t.string :initials
      t.timestamps
    end
  end
end
