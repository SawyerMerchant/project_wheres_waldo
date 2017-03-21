class AddUserIdToTags < ActiveRecord::Migration[5.0]
  def change
    add_reference :tags, :user, index: true, foreign_key: true
  end
end
