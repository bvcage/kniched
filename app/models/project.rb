class Project < ApplicationRecord
  belongs_to :pattern, optional: true
  belongs_to :user
  belongs_to :status
  has_many :timers
end
