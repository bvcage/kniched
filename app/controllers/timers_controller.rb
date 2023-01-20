class TimersController < ApplicationController

  def create
    timer = Timer.create!(timer_params)
    render json: timer, status: :created
  end

  private

  def timer_params
    params.permit(:project_id, :began, :concluded, :duration)
  end
end
