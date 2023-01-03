class CreateProjects < ActiveRecord::Migration[7.0]
  def change
    create_table :projects do |t|
      t.string :name
      t.integer :pattern_id
      t.integer :user_id
      t.date :start_date
      t.date :end_date
      t.integer :status
      t.interval :time_spent

      t.timestamps
    end
  end
end
