const Koa = require("koa");
const Router = require("koa-router");
const next = require("next");
const session = require("koa-session");
const RedisSessionStore = require("./server/session-store");
const Redis = require("ioredis");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });

const handle = app.getRequestHandler();

// 创建redis client
const redis = new Redis();

app.prepare().then(() => {
  const server = new Koa();
  const router = new Router();

  server.keys = ["kkxxll for safe"]; // 用于加密的随机字符串
  const SESSION_CONFIG = {
    key: "sessionId",
    store: new RedisSessionStore(redis),
  };

  server.use(session(SESSION_CONFIG, server));

  server.use(async (ctx, next) => {
    console.log("user", ctx.session);
    await next();
  });

  router.get("/set/user", async (ctx) => {
    ctx.session.user = {
      name: "xxx",
      age: "18",
    };
    ctx.body = "set success";
  });

  router.get("/del/user", async (ctx) => {
    ctx.session = null;
    ctx.body = "del success";
  });

  router.get("/a/:id", async (ctx) => {
    const id = ctx.params.id;
    await handle(ctx.req, ctx.res, {
      pathname: "/a",
      query: { id },
    });
    ctx.respond = false;
  });

  server.use(router.routes());

  server.use(async (ctx, next) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
  });
  server.listen(3000, () => {
    console.log("koa server listening on 3000");
  });
});
