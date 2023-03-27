class ProjectsController < ApplicationController

  def index
    user = User.find(params[:user_id])
    projects = user.projects
    if params[:status]
      status = params[:status].to_i
      projects = projects.filter{|proj| proj.status == status}
    end
    render json: projects, status: :ok
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
    project = Project.create!({
      name: params[:name],
      start_date: params[:start],
      end_date: params[:end],
      pattern_id: params[:pattern_id],
      user_id: params[:user_id],
    })
    if (project.start_date <= Date.today)
      project.update(status: 2)
    else
      project.update(status: 1)
    end
    render json: project, status: :created
  end

  def update
    project = Project.find_by!(id: params[:id])
    project.update!(update_params)
    render json: project, status: :accepted
  end

  private

  def update_params
    params.permit(
      :name,
      :status_id,
      :start_date,
      :end_date
    )
  end

end
