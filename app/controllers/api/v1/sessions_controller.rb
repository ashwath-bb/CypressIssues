# frozen_string_literal: true

class Api::V1::SessionsController < Devise::SessionsController
  skip_before_action :verify_authenticity_token

  def destroy
    sign_out(current_user)
    reset_session
    redirect_to destroy_user_session_path
  end
end
