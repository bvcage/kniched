class Pattern < ApplicationRecord
  has_many :projects
  has_many :users, through: :projects
  has_many :diagrams
  belongs_to :craft
  belongs_to :status

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

  # converts diagrams to array for frontend display
  def gen_diagram
    diagrams = self.diagrams
    # summary stats
    num_rows = diagrams.pluck(:row_num).uniq
    max_cols = diagrams.pluck(:col_num_end).max
    result = [{num_rows: num_rows.max, max_cols: max_cols}]
    # ensure sorted correctly
    num_rows.each do |n|
      result[n] = diagrams.where(row_num: n).order(col_num_end: :desc)
    end
    result
  end
  
  # returns array of pattern id's in random order
  def self.gen_explore_order
    Pattern.all.pluck(:id).shuffle
  end

  # returns object with filter keys & option values
  def self.gen_filters
    {
      :craft => Craft.all.pluck(:name),
      :skill_level => Pattern.all.pluck(:skill_level).uniq
    }
  end
  
end
