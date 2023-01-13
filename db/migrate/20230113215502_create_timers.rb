class CreateTimers < ActiveRecord::Migration[7.0]
  def change
    create_table :timers do |t|
      t.integer :project_id
      t.datetime :began
      t.datetime :concluded
      t.interval :duration

      t.timestamps
    end
  end
end
