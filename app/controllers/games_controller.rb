class GamesController < ApplicationController
  def show
    @current_user = User.find_by(id: session[:user])
    unless @current_user
      redirect_to new_session_path
    end
  end
end
