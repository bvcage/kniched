class CraftsController < ApplicationController

  def index
    render json: Craft.all, status: :ok
  end

end
