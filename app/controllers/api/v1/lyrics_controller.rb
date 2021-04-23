class Api::V1::LyricsController < ApplicationController

before_action :find_lyric, only: [:show,:update,:destroy]

	def index
		puts "--------------------------"
		puts params
		@Lyrics = Lyric.where(contex_id: params[:contex_id])
		render json: @Lyrics
	end
	def show
	    if @lyrics
	      render json: @lyrics
	    else
	      render json: {error:'Not found'}
	    end
    end
    def create
    	@lyrics = Lyric.new(lyric_params)
    	if @lyrics.save
    		render json: @lyrics
    		else
    		render json: {message:'Cannot update'}, status: 400
    	end
    end
    def update
        if @lyrics.update(lyric_params)
          render json: @lyrics
        else
          render json: {message:'Cannot update'}, status: 400
        end
    end
    def destroy
    @lyrics=Lyric.find(params[:id])
    if@lyrics
      @lyrics.destroy
      render json:{message:"Data delete Success"}
    else
      render json:{error:"Unable to delete"},status: 400
    end
  end

  private
  def lyric_params
    params.require(:lyric).permit(:title, :body,:contex_id,:link)
  end
  def find_lyric
  	@lyrics = Lyric.find(params[:id])
  end
end
