class Api::V1::MessagesController < ApplicationController
  before_action :set_channel

  def index
    @messages = @channel&.messages&.order('created_at ASC')
  end

  def create
    message = @channel&.messages&.build(content: params[:content])
    message.user = current_user
    message.save
    render :json => {
      id: message.id,
      content: message.content,
      created_at: message.created_at,
      author: message.user.username
    }
  end

  private

  def set_channel
    @channel = Channel.find_by(name: params[:channel_id])
  end
end
