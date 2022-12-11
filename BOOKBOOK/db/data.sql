
-- thêm người dùng
BEGIN;
INSERT INTO user_info(username,pwd,secret_key,email,admin) VALUES ('admin1','1','1','admin@bookbook.com','true');
INSERT INTO user_info(username,pwd,secret_key,email,admin) VALUES ('user1','1','1','user1@bookbook.com','false');
INSERT INTO user_info(username,pwd,secret_key,email,admin) VALUES ('user2','1','1','user2@bookbook.com','false');
INSERT INTO user_info(username,pwd,secret_key,email,admin) VALUES ('user3','1','1','user3@bookbook.com','false');
COMMIT;

-- thêm trang cá nhân
BEGIN;
INSERT INTO user_profile(username,fullname,gender,location,about,avatar) VALUES ('user1','Người dùng 1','female','hcmus','khum có gì để nói','public/defaultavt.png');
INSERT INTO user_profile(username,fullname,gender,location,about,avatar) VALUES ('user2','Người dùng 2','male','hcmus','nothing to say','public/defaultavt.png');
INSERT INTO user_profile(username,fullname,gender,location,about,avatar) VALUES ('user3','Người dùng 3','male','hcmus','nothing to say','public/defaultavt.png');
COMMIT;

-- tạo relationship user1 follow user2
BEGIN;
INSERT INTO follow(usr_follow,usr_followed) VALUES ('user1','user2');
COMMIT;

-- tạo 2 group
BEGIN;
INSERT INTO group_info(group_id,group_name,description) VALUES (1,'group 101','Nhóm này để test group');
INSERT INTO group_info(group_id,group_name,description) VALUES (2,'group thứ 2','Đây là 1 group xàm');
COMMIT;

-- group 1 : user1-admin, user2-member
-- group 2 : user2-admin, user3-member
BEGIN;
INSERT INTO group_member(group_id,username,permission) VALUES (1,'user1',1);
INSERT INTO group_member(group_id,username,permission) VALUES (1,'user2',0);
INSERT INTO group_member(group_id,username,permission) VALUES (2,'user2',1);
INSERT INTO group_member(group_id,username,permission) VALUES (2,'user1',0);
COMMIT;

-- khi user1 đăng bài lên trang cá nhân sẽ có 2 bước
-- b1 tạo bài đăng
BEGIN;
INSERT INTO general_post(post_id, author_username,img, text) VALUES (1,'user1','public/testpost.png','đây là một post để test');
COMMIT;
-- b1 đưa lên trang cá nhân
BEGIN;
INSERT INTO user_wall(username, post_id) VALUES ('user1',1);
COMMIT;

-- user2 react post1 với loại react là 0 (eg. 0 ='like')
BEGIN;
INSERT INTO reaction(react_on, react_type, react_by) VALUES (1,0,'user2');
COMMIT;

-- user2 cmt on post1
BEGIN;
INSERT INTO general_comment(cmt_id, cmt_on,cmt_by,text) VALUES (1,1,'user2','đây là 1 comment');
COMMIT;

-- user2 đăng bài trong market
BEGIN;
INSERT INTO market_post(post_id, post_by, img, text, price, title, tag) 
VALUES (1,'user2','public/testmarket.png','test chợ',10000,'Đồ cần bán','{"free ship","đồ ăn"}');
COMMIT;

-- user1 comment on bài đăng của user2
BEGIN;
INSERT INTO market_comment(
	cmt_id, cmt_on, cmt_by, text)
	VALUES (1,1,'user1','mắc vl');
COMMIT;