class TimersController < ApplicationController

  def create
    timer = Timer.create!(timer_params)
    render json: timer, status: :created
  end

  def index
    if (params[:project_id])
      project = Project.find(params[:project_id])
      timers = project.timers
    else
      timers = Timer.all
    end
    render json: timers, status: :ok
  end

  private

  def timer_params
    params.permit(:project_id, :began, :concluded, :duration)
  end
end
