FIRSTNAMES = %w(Anna Bertha Elisabeth Emma Frieda Hans Heinz Helmut Herbert Karl Kurt)
LASTNAMES = %w(Abel Aller Bach Bank Bayer Beck Bieber Bose Cruse Federer Fink Gabel Gossmann)

puts 'wiping the database'
  User.destroy_all
  Message.destroy_all
  Channel.destroy_all

puts 'creating 5 channels'

Channel.create!(name: 'Berlin')
Channel.create!(name: 'Ruby on Rails')
Channel.create!(name: 'React/Redux')
Channel.create!(name: 'Javascript')
Channel.create!(name: 'Fun')

puts 'creating 5 fake users'

5.times do
  User.create!(
    email: "#{FIRSTNAMES.sample}.#{LASTNAMES.sample}@example.com",
    password: "123456",
    name: FIRSTNAMES.sample
  )
end

