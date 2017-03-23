class UsersController < ApplicationController
  def update
    @current_user = User.find(params[:id])
    if @current_user.update(user_params)
      respond_to do |format|
        format.json { render json: @user, status: :ok }
      end
    else
      p "ERRORS @@@@@@@@"
    end
  end

  private

  def user_params
    params.require(:user).permit(:score)
  end
end
