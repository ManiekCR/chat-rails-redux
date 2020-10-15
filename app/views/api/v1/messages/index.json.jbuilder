json.array! @messages do |message|
  json.extract! message, :id, :content
  json.author message.user.username
  json.created_at message.created_at.strftime('%H:%M - %e/%m/%y')
end
