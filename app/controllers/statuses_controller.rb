class StatusesController < ApplicationController

  def index
    render json: Status.all, status: :ok
  end
  
end
