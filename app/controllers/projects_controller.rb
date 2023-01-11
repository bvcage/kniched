class ProjectsController < ApplicationController

  def index
    user = User.find(params[:user_id])
    render json: user.projects, status: :ok
  end

  def show
    project = Project.find_by(id: params[:id])
    if project.present?
      render json: project, status: :ok
    else
      render json: {error: 'project not found'}, status: :not_found 
    end
  end

  def create
    pp params
    project = Project.create!({
      name: params[:name],
      start_date: params[:start],
      end_date: params[:end],
      pattern_id: params[:pattern_id],
      user_id: params[:user_id]
    })
    render json: project, status: :created
  end

end
