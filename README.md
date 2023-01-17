# node练手项目，一个社交网站
# 相关技术
* node
* koa
* mysql
# 使用
1. npm install
2. npm install nodemon -g
3. npm run serve
# 版本说明
1. v0.0.1 
  * 用户注册，登录（上传头像）
  * 发布动态（文字，图片，标签）
  * 发表/回复评论
1. v0.0.2
  * 敬请期待

# 接口列表
1. 用户注册
2. 用户登录
3. 用户上传头像
4. 查看用户头像
5. 发布动态
6. 获取动态列表
7. 获取动态详情
8. 修改动态
9. 删除动态
10. 查看动态配图
11. 发布评论
12. 回复评论
13. 删除评论
14. 创建标签
15. 标签列表



# 接口详情
1. 用户注册
  * method: post
  * url: '/users/register'
  * params: json方式
  ```
    {
      "name":"admin",
      "password":"admin"
    }
  ```
2. 用户登录
  * method: post
  * url: '/login'
  * params: json方式 
  ```
    {
      "name":"admin",
      "password":"admin"
    }
  ```
3. 用户上传头像
  * method: post
  * url: '/users/avatar'
  * params: form-data 
  ```
      "avatar":单文件图片,
  ```
4. 查看用户头像
  * method: get
  * url: '/users/avatar/:userId'
  * params: params方式
  ```
   http://localhost:9000/users/avatar/1
  ```
5. 发布动态
  * method: post
  * url: '/moment'
  * params: form-data
  ```
      "content":动态内容字符串,
      "labels":标签数组,存在标签id,
      "picture":动态配图,0-9个图片
  ```
6. 获取动态列表
  * method: get
  * url: '/moment/list'
  * params: query
  ```
   http://localhost:9000/moment/list?offset=40&size=10
  ```
7. 获取动态详情
  * method: get
  * url: '/moment/detail/:momentId'
  * params: params方式
  ```
   http://localhost:9000/moment/detail/50
  ```
8. 修改动态
  * method: patch
  * url: '/moment/update/:momentId'
  * params: form-data
  ```
    "content":动态内容字符串,
    "labels":标签数组,存在标签id,
    "picture":动态配图,0-9个图片
  ```
9. 删除动态
  * method: delete
  * url: '/moment/delete/:momentId'
  * params: params方式
  ```
   http://localhost:9000/moment/delete/1
  ```
10.  查看动态配图
  * method: get
  * url: '/moment/picture/:momentId'
  * params: params方式
  ```
   http://localhost:9000/moment/picture/2
  ```
11.  发布评论
  * method: post
  * url: '/comment'
  * params: json
  ```
  {
    "content":"kunkun打球好帅",
    "momentId":"8"
  }
  ```
12.  回复评论
  * method: post
  * url: '/comment/reply'
  * params: json
  ```
  {
    "content":"那是必须的，还会唱跳rap篮球呢",
    "momentId":"1",
    "commentId": "8"
  }
  ```
13.  删除评论
  * method: delete
  * url: '/comment/:commentId'
  * params: params方式
  ```
    http://localhost:9000/comment/5
  ```
14.  创建标签
  * method: post
  * url: '/label'
  * params: json
  ```
  {
    "name":"世界杯"
  }
  ```
15.  标签列表
  * method: post
  * url: '/label/list'
  * params: json
  ```
  {
    "offset":"0",
    "size":"10",
    "name":"球"
  }
  ```
