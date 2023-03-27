# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_03_27_020335) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "crafts", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "diagrams", force: :cascade do |t|
    t.integer "pattern_id"
    t.integer "stitch_id"
    t.integer "row_num"
    t.integer "col_num_start"
    t.integer "col_num_end"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "logins", force: :cascade do |t|
    t.integer "user_id"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "patterns", force: :cascade do |t|
    t.string "name"
    t.string "url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "skill_level"
    t.integer "owner_id"
    t.bigint "craft_id"
    t.index ["craft_id"], name: "index_patterns_on_craft_id"
  end

  create_table "projects", force: :cascade do |t|
    t.string "name"
    t.integer "pattern_id"
    t.integer "user_id"
    t.date "start_date"
    t.date "end_date"
    t.integer "status_id"
    t.interval "time_spent"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "statuses", force: :cascade do |t|
    t.integer "code"
    t.string "title"
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "stitches", force: :cascade do |t|
    t.string "name"
    t.string "shorthand"
    t.integer "num_loop_in"
    t.integer "num_loop_out"
    t.string "symbol"
    t.string "img"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "craft_id"
    t.index ["craft_id"], name: "index_stitches_on_craft_id"
  end

  create_table "timers", force: :cascade do |t|
    t.integer "project_id"
    t.datetime "began"
    t.datetime "concluded"
    t.interval "duration"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "first"
    t.string "last"
    t.string "username"
    t.string "email"
    t.datetime "join_date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "patterns", "users", column: "owner_id"
end
