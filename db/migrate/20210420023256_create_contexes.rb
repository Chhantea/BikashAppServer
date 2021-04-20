class CreateContexes < ActiveRecord::Migration[6.1]
  def change
    create_table :contexes do |t|
      t.string :value

      t.timestamps
    end
  end
end
