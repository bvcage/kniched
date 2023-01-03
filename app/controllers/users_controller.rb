class UsersController < ApplicationController
  skip_before_action :authorized, only: :create

  def create
    user = User.find_by(email: params[:email])
    if user.nil?
      user = User.create!(user_params)
      Login.create!(user_id: user.id, password: params[:password])
      user.update(join_date: DateTime.now)
      render json: user, status: :created
    else
      render json: {error: "account already exists for #{user.email}"}, status: :conflict
    end
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
