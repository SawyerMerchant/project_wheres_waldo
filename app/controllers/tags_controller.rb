class TagsController < ApplicationController
  # respond_to :json

  def create
    current_user = User.find_by(id: session[:user])
    @tag = current_user.tags.build(tag_params)
    # puts tag_params
    puts "#{@tag} is the tag///////////////////////////////"

    if @tag.save
      respond_to do |format|
        format.json do
          render json: @tag, status: :created, location: @tag
        end
      end
    else
      p "Errors @@@@@@@@@@@@@"
      p current_user
    end
  end

  def destroy
    @tag = Tag.find_by_front_id(params[:id])

    if @tag.destroy
      respond_to do |format|
        format.json { render json: @tag, status: :ok }
      end
    end
  end


  private

  def tag_params
    params.require(:tag).permit(:front_id, :name, :tag_object, :tagX, :tagY, :user_id)
  end
end
