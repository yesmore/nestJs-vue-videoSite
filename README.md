# videoSite

> 暂停开发

一个基于`nodeJs(nestJs)`+`Vue`+`MongoDB`开发的全栈架构视频网站，采用单体仓库模式，客户端包括PC网站、app、小程序端。



[TOC]



## 架构

### sourse

```tsx
┌-	
├-  admin/							// 后台管理ui
    
├-  server/							// 服务端
    ├-  apps/						
△  		├-	admin/				    // 子项目1-管理端（后台接口）
    		├-	src/
△    		    ├-  users/						// 用户模块
                 	 ├-	 users.module.ts  		  // 模块入口
				    ├-  users.controller.ts		 // 模块控制器
    				├-  users.controller.spec.ts
△			   ├-  courses/					// 课程模块
△                ├-  episodes/					 // 课时模块
    			├- 	admin.controller.ts
    			├-	admin.module.ts
    			├-  admin.service.ts
    			├-  main.ts
    		├-	test/
    		├-  tsconfig.app.json

△       ├-	server/					// 子项目2-客户端
            ├-  src/
            ├-  tsconfig.app.json
    ├-  dist/apps/admin/
    ├-  libs/						// 公用模块
△      ├-  db						// 数据库模块
            ├-  src/
                ├-  models/			 // 数据库表模型
                	├-  user.model.ts
                ├-  db.module.ts
                ├-  db.service.ts
                ├-  index.ts
            ├-  tsconfig.lib.json 
    ├-  node_modules
    ├-  packege.json
    ├- 	package-lock.json
    ├-  nest-cli.json
    ├-  tsconfig.build.json
    ├-	tsconfig.js
    ├-  README.md
    ├-  .eslintrc.js/.gitignore/.prettierrc
    	├-  db.js				// 连接数据库配置
    	├-  
├-	.gitignore
├-	LICENSE
├-	README.md				// readme
└-	


```



### 模块栈

#### WEB端

> 功能模块

- [ ] 视频播放
- [ ] 注册登陆（手机号+社交账号）
- [ ] 点赞、评论、转发
- [ ] 支付购买（支付宝+微信）
- [ ] 积分等级系统

> 技术栈：vue+vuetifyjs+Nuxt（服务端渲染vue技术：先渲染再展示）



#### 管理端

> 功能模块

- [ ] 视频管理
- [ ] 基础信息管理
- [ ] 订单管理
- [ ] 用户管理
- [ ] 广告位管理

> 技术栈：`vue+elementUI`



#### APP+小程序端

> 功能模块

- [ ] 注册登录（手机号+社交账号）
- [ ] 视频播放
- [ ] 点赞、评论、转发
- [ ] 积分等级系统

> 技术栈：`vue+uni-app`



#### 服务端（管理端）

> 技术栈：`nestJs+MongoDB`

启动项目

`nest start -w admin`



#### 服务端（客户端）

> 技术栈：`nestJs+MongoDB`





### 插件

|        plugin        |    v    |        备注         | 端               |
| :------------------: | :-----: | :-----------------: | ---------------- |
|     @nestjs/cli      |  7.6.0  |     nest脚手架      | 服务端（管理端） |
|    nest-typegoose    | 7.1.38  |     适配数据库      | 服务端（管理端） |
| @typegoose/typegoose |  7.6.1  |       数据库        | 服务端（管理端） |
|   @types/mongoose    | 5.11.97 |       数据库        | 服务端（管理端） |
|       mongoose       | 5.12.13 |       数据库        | 服务端（管理端） |
| nestjs-mongoose-crud |  2.1.2  |   crud模块（up）    | 服务端（管理端） |
|   @nestjs/swagger    |  4.8.0  |  自动化api（官方）  | 服务端（管理端） |
|  swagger-ui-express  |  4.1.6  | 自动化api（第三方） | 服务端（管理端） |
|                      |         |                     |                  |



### 部署

- CoursesEdit.vue和EpisodesEdit.vue的`el-upload`标签中的`action`属性：

  http://video.aoau.top:3005/upload

- main.ts的baseURL：http://xxx:3005
- 
