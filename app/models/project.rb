class Project < ApplicationRecord
  belongs_to :pattern
  belongs_to :user
  has_many :timers
end
