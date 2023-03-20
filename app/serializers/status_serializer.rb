class StatusSerializer < ActiveModel::Serializer
  attributes :id, :code, :title, :description
end
