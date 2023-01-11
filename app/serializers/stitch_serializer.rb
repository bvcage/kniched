class StitchSerializer < ActiveModel::Serializer
  attributes :id, :name, :shorthand, :num_loop_in, :num_loop_out, :symbol, :img
end
