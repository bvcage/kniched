class CreateStitches < ActiveRecord::Migration[7.0]
  def change
    create_table :stitches do |t|
      t.string :name
      t.string :shorthand
      t.integer :num_loop_in
      t.integer :num_loop_out
      t.string :symbol
      t.string :img

      t.timestamps
    end
  end
end
