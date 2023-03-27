class UpdateStatusColsToRefStatusTable < ActiveRecord::Migration[7.0]
  def change
    rename_column :projects, :status, :status_id
  end
end
