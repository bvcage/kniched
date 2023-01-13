class TimerSerializer < ActiveModel::Serializer
  attributes :id, :project_id, :began, :concluded, :duration
end
