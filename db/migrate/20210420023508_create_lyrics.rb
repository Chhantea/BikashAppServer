class CreateLyrics < ActiveRecord::Migration[6.1]
  def change
    create_table :lyrics do |t|
      t.string :title
      t.string :body
      t.string :link
      t.references :contex, null: false, foreign_key: true

      t.timestamps
    end
  end
end
