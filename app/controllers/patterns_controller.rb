class PatternsController < ApplicationController

  def index
    if (params[:user_id])
      user = User.find_by!(id: params[:user_id])
      patterns = user.patterns.uniq
    elsif (params[:ids])
      ids = params[:ids].split(',')
      patterns = []
      ids.each do |id|
        patterns << Pattern.find_by(id: id)
      end
    else
      patterns = Pattern.all
    end
    render json: patterns, status: :ok
  end

  def show
    pattern = Pattern.find(params[:id])
    render json: pattern, status: :ok
  end

  #################
  # CUSTOM ROUTES

  def explore
    order = Pattern.gen_explore_order
    render json: order, status: :ok
  end

  def filters
    filters = Pattern.gen_filters
    render json: filters, status: :ok
  end

  def diagram
    pattern = Pattern.find(params[:pattern_id])
    diagram = pattern.gen_diagram
    render json: diagram, include: [:stitch], status: :ok
  end

end
