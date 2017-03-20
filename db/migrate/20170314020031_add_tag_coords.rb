class AddTagCoords < ActiveRecord::Migration[5.0]
  def change
    add_column :tags, :tagX, :string
    add_column :tags, :tagY, :string
    remove_column :tags, :tag
  end
end
