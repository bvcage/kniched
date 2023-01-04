class UsersController < ApplicationController
  skip_before_action :authorized, only: :create

  def create
    user = User.find_by(email: params[:email])
    if user.nil?
      user = User.create!(user_params)
      Login.create!(user_id: user.id, password: params[:password])
      username = user.first + user.last[0] + Time.now.to_formatted_s(:number)[4..-1]
      user.update(join_date: DateTime.current, username: username)
      render json: user, status: :created
    else
      render json: {error: "account already exists for #{user.email}"}, status: :conflict
    end
  end

  def show
    user = User.find(params[:id])
    render json: user, status: :ok
  end

  private

  def user_params
    params.permit(
      :first,
      :last,
      :email
    )
  end

end
