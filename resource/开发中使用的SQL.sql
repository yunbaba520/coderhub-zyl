# 新增用户语句
INSERT INTO `user` (name,password) VALUES ('admin','admin');
# 根据name查找user
SELECT * FROM `user` WHERE name = 'admin';