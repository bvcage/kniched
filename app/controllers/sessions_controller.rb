class SessionsController < ApplicationController

  skip_before_action :authorized, only: :create

  def create
    pp params
    user = User.find_by!(email: params[:email])
    login = Login.find_by!(user_id: user.id)
    if user && login.authenticate(params[:password])
      session[:user_id] = user.id
      render json: user, status: :created
    else
      render json: {error: {login: 'invalid username or password'}}, status: :unauthorized
    end
  end

end