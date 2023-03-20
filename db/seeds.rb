
puts "seeding craft categories..."

CRAFTS = ["knitting", "crochet"]
CRAFTS.each do |craft|
  Craft.create!(name: craft)
end

puts "done seeding craft categories"


puts "seeding statuses..."

STATUSES = [
  [100, "to-do"],
  [200, "in progress"],
  [300, "complete"],
  [400, "on hold"]
]
STATUSES.each do |status|
  Status.create!(code: status[0], name: status[1])
end


puts "done seeding statuses"


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
skill_choices = ["beginner", "intermediate", "experienced"]
num_patterns.times do
  Pattern.create({
    name: Faker::Artist.name,
    url: Faker::Internet.domain_name,
    craft_id: rand(1..CRAFTS.length),
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


puts "seeding stitches..."

knit = Stitch.create({
  name: "knit",
  shorthand: "k",
  num_loop_in: 1,
  num_loop_out: 1,
  symbol: " ",
  craft_id: Craft.find_by!(name: "knitting").id
})
purl = Stitch.create({
  name: "purl",
  shorthand: "p",
  num_loop_in: 1,
  num_loop_out: 1,
  symbol: "|",
  craft_id: Craft.find_by!(name: "knitting").id
})

puts "done seeding stitches"


puts "seeding diagrams..."

knitting = Craft.find_by(name: "knitting")
knitting_patterns = Pattern.where(craft_id: knitting.id)
knitting_patterns.each do |pattern|
  col = 1
  num_rib = rand(1..3)
  num_rib.times do
    Diagram.create({
      pattern_id: pattern.id,
      stitch_id: knit.id,
      row_num: 1,
      col_num_start: col,
      col_num_end: col
    })
    col += 1
  end
  num_rib.times do
    Diagram.create({
      pattern_id: pattern.id,
      stitch_id: purl.id,
      row_num: 1,
      col_num_start: col,
      col_num_end: col
    })
    col += 1
  end
  num_rib.times do
    Diagram.create({
      pattern_id: pattern.id,
      stitch_id: purl.id,
      row_num: 2,
      col_num_start: col,
      col_num_end: col
    })
    col += 1
  end
  num_rib.times do
    Diagram.create({
      pattern_id: pattern.id,
      stitch_id: knit.id,
      row_num: 2,
      col_num_start: col,
      col_num_end: col
    })
    col += 1
  end
end

puts "done seeding diagrams"


puts "done seeding data!"