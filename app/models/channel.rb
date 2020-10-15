class Channel < ApplicationRecord
  has_many :messages

  validates :name, presence: true
  validates :name, length: { maximum: 15 }
end
