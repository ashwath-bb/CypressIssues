# frozen_string_literal: true

class UsersController < ApplicationController
  before_action :set_user, only: [:edit]

  def update
    if @user.blank?
      respond_with_error "User with id #{params[:id]} not found.", :not_found

    elsif @user.update(user_params)
      render json: @user

    else
      render json: { error: @user.errors.full_messages.to_sentence }, status: 422
    end
  end

  def edit
    render
  end

  private

    def set_user
      @user = User.find(params[:id])
    end

    def user_params
      params.require(:user).permit([ :first_name, :last_name]).to_h
    end
end