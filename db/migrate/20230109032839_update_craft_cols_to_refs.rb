class UpdateCraftColsToRefs < ActiveRecord::Migration[7.0]
  def change
    remove_column :patterns, :craft
    add_reference :patterns, :craft, index:true
    add_reference :stitches, :craft, index:true
  end
end
