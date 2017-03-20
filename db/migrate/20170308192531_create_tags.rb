class CreateTags < ActiveRecord::Migration[5.0]
  def change
    create_table :tags do |t|
      t.integer "front_id", null: false
      t.text "tag", null: false
      t.string "name", null: false
      t.timestamps
    end
  end
end
