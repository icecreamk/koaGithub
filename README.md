# koaGithub

- Nextjs 提供同构渲染
- Koa 提供数据接口和服务端路由
- Redis 提供 session 存储

#### redis

- 内存数据结构数据（快速存储和读取）
- 可持久存储（down 机之后，数据存储在硬盘）
- 支持多种数据结构

#### 启动 redis

> redis-server redis.conf
> redis-cli
> exit

#### 由于前端做了路由映射之后，但是再次刷新页面仍然会请求服务端，从而返回 404，因此服务端也需要做对应的映射关系

#### document

- 只有在服务端渲染时调用
- 用来修改服务端渲染的文档内容
- 一般配合第三方 css-in-js 方案使用


#### 认证与授权
- 认证可以通过手机号、邮箱、账号密码等方式
- 认证成功后，就可以对用户进行授权访问内容
- 授权不一定都需要认证，通常上一次认证生成的key会保存在客户端，key过期之前，用户都不需要重新认证


#### Comp大写开头，react才会解析
``` javascript
export default ({ children, comp: Comp }) => {
  return <Comp style={style}>{children}</Comp>;
}
````