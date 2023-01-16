# node练手项目，一个社交网站
# 相关技术
* koa
* mysql
# 使用
1. npm install
2. npm run serve
# 版本说明
1. v0.0.1 
  * 用户注册，登录（上传头像）
  * 发布动态（文字，图片，标签）
  * 发表/回复评论
2. v0.0.2
  * 敬请期待

# 接口说明
1. 用户注册接口
  * method: post
  * url: '/users/register'
  * params: json方式
  ```
    {
      "name":"admin",
      "password":"admin"
    }
  ```
