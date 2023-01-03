class Login < ApplicationRecord
  has_secure_password
  belongs_to :user, dependent: :destroy
end
