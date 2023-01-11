class DiagramSerializer < ActiveModel::Serializer
  attributes :row_num, :col_num_start, :col_num_end
  belongs_to :stitch, only: [:img, :name, :shorthand, :symbol]
end
