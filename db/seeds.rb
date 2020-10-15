puts 'wiping the database'
  Message.destroy_all
  User.destroy_all
  Channel.destroy_all

names = %w(general berlin react ruby)
usernames = %w(Ghost Maniek George Abdel Klaus)

channels = names.map do |name|
  Channel.find_or_create_by(name: name)
end

users = usernames.map do |username|
  User.create(email: "#{username.downcase}@lewagon.com", username: username, password: "testtest")
end

20.times do
  Message.create! user: users.sample, channel: channels.sample, content: Faker::TvShows::HowIMetYourMother.quote
end

puts 'Channels:'
channels.each do |channel|
  puts "- #{channel.id}: #{channel.name}"
end
