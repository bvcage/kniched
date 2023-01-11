class CreateDiagrams < ActiveRecord::Migration[7.0]
  def change
    create_table :diagrams do |t|
      t.integer :pattern_id
      t.integer :stitch_id
      t.integer :row_num
      t.integer :col_num_start
      t.integer :col_num_end

      t.timestamps
    end
  end
end
