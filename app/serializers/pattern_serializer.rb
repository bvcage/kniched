class PatternSerializer < ActiveModel::Serializer
  attributes :id, :name, :url, :skill_level, :owner_info, :craft

  def craft
    object.craft.name
  end
end
