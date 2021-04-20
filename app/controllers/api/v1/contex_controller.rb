class Api::V1::ContexController < ApplicationController

	def index
		@contex = Contex.all
		render json: @contex
	end
	def show
   	    @contex = Contex.find_by_id(params[:id])
	    if @contex
	      render json: @contex
	    else
	      render json: {error:'Not found'},status:404
	    end
    end
    def create
    	@contex = Contex.new(contex_params)
    	if @contex.save
    		render json: {message:"contex prams update",value:@contex}, status:200
    		else
    		render json: {message:'Cannot update'}, status:500
    	end
    end
    def destroy
    @contex=Contex.find(params[:id])
    if@contex
      @contex.destroy
      render json:{message:"User delete Success"},status: 200
    else
      render json:{error:"Unable to delete"}, status:500
    end
  end

  private
  def contex_params
    params.require(:contex).permit(:value)
  end
end
