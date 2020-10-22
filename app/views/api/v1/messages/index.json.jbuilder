json.array! @messages do |message|
  json.extract! message, :id, :content, :created_at
  json.author message.user.username
  json.channel message.channel.name
end
