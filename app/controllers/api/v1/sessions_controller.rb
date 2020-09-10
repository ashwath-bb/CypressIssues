# frozen_string_literal: true

class Api::V1::SessionsController < Devise::SessionsController
  skip_before_action :verify_authenticity_token

  def create
    user = User.find_for_database_authentication(email: params[:user] && params[:user][:email])

    if invalid_password?(user)
      flash[:notice] = "Incorrect email or password"
    else
      sign_in "user", user
      flash[:notice] = 'Successfully logged in'
    end
    redirect_to root_path
  end

  def destroy
    sign_out(current_user)
    redirect_to destroy_user_session_path
  end

  private

    def invalid_password?(user)
      user.blank? || !user.valid_password?(params[:user][:password])
    end
end
