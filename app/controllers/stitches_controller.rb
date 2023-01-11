class StitchesController < ApplicationController
  has_many :diagrams
  has_many :patterns, through: :diagrams
end
