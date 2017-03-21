class SessionsController < ApplicationController
  def new
    if User.find_by(id: session[:user])
     redirect_to game_path
   else
     @user = User.new
   end
  end

  def create
    @user = User.new(user_params)
    if @user.save
      session[:user] = @user.id
      redirect_to game_path
    else
      redirect_to new_session_path
    end
  end

  def destroy
    session[:user] = nil
  end

  private

  def user_params
    params.require(:user).permit(:initials)
  end
end
