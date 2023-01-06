class User < ApplicationRecord
  has_many :projects
  has_many :patterns
  has_many :patterns, through: :projects
  
  def full_name
    "#{self.first} #{self.last}"
  end
end
