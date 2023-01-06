class Pattern < ApplicationRecord
  has_many :projects
  has_many :users, through: :projects

  def owner_info
    owner = User.find_by(id: self.owner_id)
    {
      :owner_id => owner.id,
      :username => owner.username,
      :first => owner.first,
      :last => owner.last,
      :full_name => owner.full_name,
    }
  end
  
  # returns array of pattern id's in random order
  def self.gen_explore_order
    Pattern.all.pluck(:id).shuffle
  end
  
end
