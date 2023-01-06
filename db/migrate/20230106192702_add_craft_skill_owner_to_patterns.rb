class AddCraftSkillOwnerToPatterns < ActiveRecord::Migration[7.0]
  def change
    add_column :patterns, :craft, :string
    add_column :patterns, :skill_level, :string
    add_column :patterns, :owner_id, :integer
    add_foreign_key :patterns, :users, column: :owner_id
  end
end
