
puts "seeding users..."

num_users = 5
num_users.times do
  first = Faker::Name.first_name
  last = Faker::Name.last_name
  email = Faker::Internet.safe_email(name: "#{first} #{last}")
  username = first + last[0] + Time.now.to_formatted_s(:number)[4..-1]
  user = User.create!({
    first: first,
    last: last,
    email: email,
    username: username,
    join_date: Date.current
  })
  Login.create!({
    user_id: user.id,
    password: 'pass'
  })
end

puts "done seeding users"


puts "seeding patterns..."

num_patterns = 10
craft_choices = ["knitting", "crochet"]
skill_choices = ["beginner", "intermediate", "experienced"]
num_patterns.times do
  Pattern.create({
    name: Faker::Artist.name,
    url: Faker::Internet.domain_name,
    craft: craft_choices.sample,
    skill_level: skill_choices.sample,
    owner_id: rand(1..num_users)
  })
end

puts "done seeding patterns"


puts "seeding projects..."

ITEMS = %w(scarf hat sweater socks)
25.times do
  Project.create({
    name: ITEMS.sample + " for " + Faker::Name.first_name,
    pattern_id: rand(1..num_patterns),
    user_id: rand(1..num_users),
    start_date: Faker::Date.backward(days:14),
    status: rand(1..3),
    time_spent: "P0Y0M#{rand(0..2)}DT#{rand(0..23)}H#{rand(0..59)}M#{rand(0..59)}S"
  })
end

puts "done seeding projects"


puts "done seeding data!"