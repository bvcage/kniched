class Project < ApplicationRecord
  belongs_to :pattern, optional: true
  belongs_to :user
  has_many :timers
end
