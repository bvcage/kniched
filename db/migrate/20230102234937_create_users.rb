class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :first
      t.string :last
      t.string :username
      t.string :email
      t.datetime :join_date

      t.timestamps
    end
  end
end
