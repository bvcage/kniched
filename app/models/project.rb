class Project < ApplicationRecord
  belongs_to :pattern, optional: true
  belongs_to :user
  belongs_to :status
  has_many :timers

  def self.gen_filters
    {
      :status => Status.all.pluck(:title).uniq
    }
  end

  def self.gen_sort_options
    [
      'name',
      'status'
    ]
  end

end
