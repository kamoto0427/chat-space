## usersテーブル
|Column|Type|Options|
|------|----|-------|
|username|string|null: false|
|email|text|null: false|
|password|text|null: false|

###Association
- has_many :groups_users
- has_many :groups, through: :groups_users
- has_many :comments

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|group_name|string|null: false|
|user_id|integer|null: false, foreign_key: true|

###Association
- has_many :groups_users
- has_many :users, through: :groups_users
- has_many :comments

## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

###Association
- belongs_to :group
- belongs_to :user

## commentsテーブル
|Column|Type|Options|
|------|----|-------|
|text|text|null: false|
|date|integer|null: false|
|time|integer|null: false|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

###Association
- belongs_to :group
- belongs_to :user