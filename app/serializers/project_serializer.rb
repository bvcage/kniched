class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :name, :pattern, :user_id, :start_date, :end_date, :status, :time_spent
end
