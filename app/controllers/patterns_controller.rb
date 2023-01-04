class PatternsController < ApplicationController

  def index
    user = User.find_by!(id: params[:user_id])
    render json: user.patterns, status: :ok
  end

  def show
    pattern = Pattern.find(params[:id])
    render json: pattern, status: :ok
  end

end
