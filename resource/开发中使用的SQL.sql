-- Active: 1672713749142@@127.0.0.1@3306@coderhub_db
# 创建用户表
CREATE TABLE IF NOT EXISTS `user`(
	id INT PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(30) NOT NULL UNIQUE,
	password VARCHAR(50) NOT NULL,
	createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

# 新增用户语句
INSERT INTO `user` (name,password) VALUES ('admin','admin');
# 根据name查找user
SELECT * FROM `user` WHERE name = 'admin';
# 创建moment表
CREATE TABLE IF NOT EXISTS `moment`(
	id INT PRIMARY KEY AUTO_INCREMENT,
	content VARCHAR(1000) NOT NULL,
	user_id INT NOT NULL,
	createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	FOREIGN KEY(user_id) REFERENCES user(id)
);
# 新增moment动态
INSERT INTO `moment` (content,user_id) VALUES ('lilililili','9');
INSERT INTO moment (content, user_id) VALUES ('纵然再苦守数百年 我的心意 始终如一', 1);
INSERT INTO moment (content, user_id) VALUES ('曾几何时，他也好，她也好，都是这家伙的被害者。所以我才憎恶着。这个强求着所谓“大家”的世界。必须建立在牺牲某人之上才能成立的低劣的和平。以温柔和正义粉饰，明明是恶毒之物却登大雅之堂，随着时间的流逝越发凶恶，除欺瞒外别无其二的空虚的概念。过去和世界都是无法改变的。发生过的事情和所谓的“大家”都是无法改变的。但是，并不是说自己只能隶属于他们', 1);
INSERT INTO moment (content, user_id) VALUES ('不要告诉我你不需要保护，不要告诉我你不寂寞，知微，我只希望你，在走过黑夜的那个时辰，不要倔强的选择一个人。', 3);
INSERT INTO moment (content, user_id) VALUES ('If you shed tears when you miss the sun, you also miss the stars.如果你因失去了太阳而流泪，那么你也将失去群星了。', 1);
INSERT INTO moment (content, user_id) VALUES ('在世间万物中我都发现了你，渺小时，你是阳光下一粒种子，伟大时，你隐身在高山海洋里。', 2);
INSERT INTO moment (content, user_id) VALUES ('某一天，突然发现，许多结果都与路径无关。', 4);
INSERT INTO moment (content, user_id) VALUES ('限定目的，能使人生变得简洁。', 2);
INSERT INTO moment (content, user_id) VALUES ('翅膀长在你的肩上，太在乎别人对于飞行姿势的批评，所以你飞不起来', 4);
INSERT INTO moment (content, user_id) VALUES ('一个人至少拥有一个梦想，有一个理由去坚强。心若没有栖息的地方，到哪里都是在流浪。', 2);
INSERT INTO moment (content, user_id) VALUES ('不乱于心，不困于情。不畏将来，不念过往。如此，安好。', 3);
INSERT INTO moment (content, user_id) VALUES ('如果你给我的，和你给别人的是一样的，那我就不要了。', 3);
INSERT INTO moment (content, user_id) VALUES ('故事的开头总是这样，适逢其会，猝不及防。故事的结局总是这样，花开两朵，天各一方。', 2);
INSERT INTO moment (content, user_id) VALUES ('你不愿意种花，你说，我不愿看见它一点点凋落。是的，为了避免结束，你避免了一切开始。', 2);
INSERT INTO moment (content, user_id) VALUES ('你如果认识从前的我，也许你会原谅现在的我。', 4);
INSERT INTO moment (content, user_id) VALUES ('每一个不曾起舞的日子，都是对生命的辜负。', 2);
INSERT INTO moment (content, user_id) VALUES ('向来缘浅，奈何情深。', 2);
INSERT INTO moment (content, user_id) VALUES ('心之所向 素履以往 生如逆旅 一苇以航', 3);
INSERT INTO moment (content, user_id) VALUES ('生如夏花之绚烂，死如秋叶之静美。', 3);
INSERT INTO moment (content, user_id) VALUES ('答案很长，我准备用一生的时间来回答，你准备要听了吗？', 4);
INSERT INTO moment (content, user_id) VALUES ('因为爱过，所以慈悲；因为懂得，所以宽容。', 4);
INSERT INTO moment (content, user_id) VALUES ('我们听过无数的道理，却仍旧过不好这一生。', 1);
INSERT INTO moment (content, user_id) VALUES ('我来不及认真地年轻，待明白过来时，只能选择认真地老去。', 2);

# 查询动态列表
SELECT 
	m.id id,m.content content,m.`createAt` createAt,m.`updateAt` updateAt,
	JSON_OBJECT('id',u.id,'name',u.name,'createAt',u.`createAt`,'updateAt',u.`updateAt`) user,
	(SELECT COUNT(*) FROM comment WHERE moment_id = m.id) commentCount
FROM moment m
LEFT JOIN user u
ON u.id = m.user_id
LIMIT 10 OFFSET 0;

SELECT COUNT(*) FROM comment WHERE moment_id = 1;
# 查询动态详情
SELECT 
	m.id id,m.content content,m.`createAt` createAt,m.`updateAt` updateAt,
	JSON_OBJECT('id',u.id,'name',u.name,'createAt',u.`createAt`,'updateAt',u.`updateAt`) user,
	JSON_ARRAYAGG(
		JSON_OBJECT(
			'id',c.id,'content',c.content,'createAt',c.createAt,'momentId',c.moment_id,'commentId',c.comment_id,
			'user',JSON_OBJECT('id',cu.id,'name',cu.name)
		)
	) commentList
FROM moment m
LEFT JOIN user u
ON u.id = m.user_id
LEFT JOIN comment c
ON c.moment_id = m.id
LEFT JOIN user cu
ON cu.id = c.user_id
WHERE m.id = 1;


#修改动态
UPDATE moment SET content = ? WHERE id = ?;
# 依据momentId userId查询
SELECT * FROM moment WHERE id = 1 AND user_id = 9;
# 删除动态
DELETE FROM moment WHERE id = ? ;

# 创建评论表
CREATE TABLE IF NOT EXISTS `comment`(
	id INT PRIMARY KEY AUTO_INCREMENT,
	content VARCHAR(1000) NOT NULL,
	moment_id INT NOT NULL,
	user_id INT NOT NULL,
	comment_id INT DEFAULT NULL,
	createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	
	FOREIGN KEY(moment_id) REFERENCES moment(id) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY(user_id) REFERENCES user(id) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY(comment_id) REFERENCES comment(id) ON DELETE CASCADE ON UPDATE CASCADE
);
# 新建评论
INSERT INTO comment (content,moment_id,user_id) VALUES (?,?,?);
# 回复评论
INSERT INTO comment (content,moment_id,comment_id,user_id) VALUES (?,?,?,?);
# 删除评论
DELETE FROM comment WHERE id = ?;

# 创建label表
CREATE TABLE IF NOT EXISTS `label`(
	id INT PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(10) NOT NULL UNIQUE,
	createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
# 创建label
INSERT INTO label (name) VALUES ('足球');
# 查询label
SELECT * FROM label WHERE name LIKE '%足%' LIMIT 10 OFFSET 0;
# 创建动态与标签关系表
CREATE TABLE IF NOT EXISTS `moment_label`(
	moment_id INT NOT NULL,
	label_id INT NOT NULL,
	createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY(moment_id, label_id),
	FOREIGN KEY (moment_id) REFERENCES moment(id) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (label_id) REFERENCES label(id) ON DELETE CASCADE ON UPDATE CASCADE
);
# 动态与标签关系表添加数据
INSERT INTO moment_label (moment_id,label_id) VALUES (?,?);
# 根据momentid删除关系表数据
DELETE FROM moment_label WHERE moment_id = ?;
# 查询动态列表时，带上label个数
SELECT 
	m.id id,m.content content,m.`createAt` createAt,m.`updateAt` updateAt,
	JSON_OBJECT('id',u.id,'name',u.name,'createAt',u.`createAt`,'updateAt',u.`updateAt`) user,
	(SELECT COUNT(*) FROM comment WHERE moment_id = m.id) commentCount,
	(SELECT COUNT(*) FROM moment_label ml WHERE ml.moment_id = m.id) labelCount
FROM moment m
LEFT JOIN user u
ON u.id = m.user_id
LIMIT 10 OFFSET 0;

# 查询动态详情时，带上label数组
SELECT 
	m.id id,m.content content,m.createAt createAt,m.updateAt updateAt,
	JSON_OBJECT('id',u.id,'name',u.name,'createAt',u.createAt,'updateAt',u.updateAt) user,
	(
		SELECT
			JSON_ARRAYAGG(
				JSON_OBJECT(
					'id',c.id,
					'content',c.content,
					'createAt',c.createAt,
					'momentId',c.moment_id,
					'commentId',c.comment_id,
					'user', JSON_OBJECT('id', cu.id, 'name', cu.name)
					
				)
			)  
		FROM comment c 
		LEFT JOIN user cu ON c.user_id = cu.id
		WHERE c.moment_id = m.id
	) commentList,
	(
		SELECT 
			JSON_ARRAYAGG(
				JSON_OBJECT(
					'id',l.id,
					'name',l.name
				)
			)
		FROM moment_label ml
		LEFT JOIN label l ON ml.label_id = l.id
		WHERE ml.moment_id = m.id
	) labelList
FROM moment m
LEFT JOIN user u ON u.id = m.user_id
WHERE m.id = 30;
# 创建头像信息表
CREATE TABLE IF NOT EXISTS `avatar`(
	id INT PRIMARY KEY AUTO_INCREMENT,
	filename VARCHAR(255) NOT NULL UNIQUE,
	originalname VARCHAR(255),
	mimetype VARCHAR(30),
	size INT,
	user_id INT,
	createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE ON UPDATE CASCADE
);
# 保存avatar
INSERT INTO avatar (filename,originalname,mimetype,size,user_id) VALUES (?,?,?,?,?);

# 查询头像
SELECT * FROM avatar WHERE user_id = ?;

# user表新增avatar_url字段
ALTER TABLE `user` ADD `avatar_url` VARCHAR(200);

# user表保存avatar_url值
UPDATE user SET avatar_url = ? WHERE id = ?;
# 动态的配图表
CREATE TABLE IF NOT EXISTS `picture`(
	id INT PRIMARY KEY AUTO_INCREMENT,
	filename VARCHAR(255) NOT NULL UNIQUE,
	originalname VARCHAR(255),
	mimetype VARCHAR(30),
	size INT,
	moment_id INT,
	createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	FOREIGN KEY (moment_id) REFERENCES moment(id) ON DELETE CASCADE ON UPDATE CASCADE
);
# 保存配图
INSERT INTO picture (filename,originalname,mimetype,size,moment_id) VALUES (?,?,?,?,?);
# 查看动态列表带配图
SELECT 
	m.id id,m.content content,m.`createAt` createAt,m.`updateAt` updateAt,
	JSON_OBJECT('id',u.id,'name',u.name,'createAt',u.`createAt`,'updateAt',u.`updateAt`) user,
	(SELECT COUNT(*) FROM comment WHERE moment_id = m.id) commentCount,
	(SELECT COUNT(*) FROM moment_label ml WHERE ml.moment_id = m.id) labelCount,
	(SELECT JSON_ARRAYAGG(picture_url) FROM picture p WHERE p.moment_id = m.id) pictrueUrl
FROM moment m
LEFT JOIN user u
ON u.id = m.user_id
LIMIT 10 OFFSET 40;
# 根据pictureId查看配图
SELECT * FROM picture WHERE id = ?;

# picture表新增avatar_url字段
ALTER TABLE `picture` ADD `picture_url` VARCHAR(200);
# 根据pictureid保存pictureurl
UPDATE picture SET picture_url = ? WHERE id = ?;

# 查看动态详情带配图
SELECT 
	m.id id,m.content content,m.createAt createAt,m.updateAt updateAt,
	JSON_OBJECT('id',u.id,'name',u.name,'createAt',u.createAt,'updateAt',u.updateAt) user,
	(
		SELECT
			JSON_ARRAYAGG(
				JSON_OBJECT(
					'id',c.id,
					'content',c.content,
					'createAt',c.createAt,
					'momentId',c.moment_id,
					'commentId',c.comment_id,
					'user', JSON_OBJECT('id', cu.id, 'name', cu.name)
					
				)
			)  
		FROM comment c 
		LEFT JOIN user cu ON c.user_id = cu.id
		WHERE c.moment_id = m.id
	) commentList,
	(
		SELECT 
			JSON_ARRAYAGG(
				JSON_OBJECT(
					'id',l.id,
					'name',l.name
				)
			)
		FROM moment_label ml
		LEFT JOIN label l ON ml.label_id = l.id
		WHERE ml.moment_id = m.id
	) labelList,
	(SELECT JSON_ARRAYAGG(picture_url) FROM picture p WHERE p.moment_id = m.id) pictrueUrlList
FROM moment m
LEFT JOIN user u ON u.id = m.user_id
WHERE m.id = 50;

# 删除动态所有配图
DELETE FROM picture WHERE moment_id = ?;