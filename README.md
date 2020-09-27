## アプリの概要
中間テーブルを用いたグループチャットができる

## アプリの挙動
### ユーザーの登録
![demo](https://gyazo.com/2e08b215f4f135c814fbf89743ddf962/raw)

### ユーザー編集
![demo](https://gyazo.com/d3b1d28d3f5229a18a6c4d0f8ab8e0f4/raw)

### グループ作成
![demo](https://gyazo.com/4af88a7a64eca43502401d79c3791341/raw)

### 投稿機能(非同期通信)
![demo](https://gyazo.com/0b65f86a62adfa1b7b70021eaa621fe7/raw)

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|email|text|null: false|
|password|text|null: false|

###Association
- has_many :groups_users
- has_many :groups, through: :groups_users
- has_many :comments

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

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
|text|text||
|image|string||
|created_at|integer||
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

###Association
- belongs_to :group
- belongs_to :user