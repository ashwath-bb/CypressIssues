# frozen_string_literal: true

module ApplicationHelper
  def super_admin_signed_in?
    user_signed_in? && current_user.super_admin?
  end

  def nav_link(text, path, condition = false, options = {})
    class_name = (current_page?(path) || condition) ? "active" : ""

    content_tag(:li, class: class_name) do
      options[:title] = text unless options.has_key?(:title)
      link_to text, path, options
    end
  end

  def user_details
    {
      email: current_user.email,
      user_name: current_user.name,
      editLink: edit_user_url(current_user),
      logoutUrl: api_v1_logout_url
    }
  end

  def edit_user_details
    {
      first_name: current_user.first_name,
      last_name: current_user.last_name,
      email: current_user.email,
      auth_token: current_user.authentication_token,
      update_url: api_v1_user_url(current_user)
    }
  end
end
