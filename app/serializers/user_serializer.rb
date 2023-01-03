class UserSerializer < ActiveModel::Serializer
  attributes :id, :first, :last, :username, :email, :join_date
end
