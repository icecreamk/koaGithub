const Koa = require("koa");
const Router = require("koa-router");
const next = require("next");
const session = require("koa-session");
const RedisSessionStore = require("./server/session-store");
const Redis = require("ioredis");
const auth = require("./server/auth");
const api = require("./server/api");

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

  // github OAuth
  auth(server);

  api(server);

  router.get("/a/:id", async (ctx) => {
    const id = ctx.params.id;
    await handle(ctx.req, ctx.res, {
      pathname: "/a",
      query: { id },
    });
    ctx.respond = false;
  });

  router.get("/api/user/info", async (ctx) => {
    const user = ctx.session.userInfo;
    if (!user) {
      ctx.status = 401;
      ctx.body = "Need Login";
    } else {
      ctx.body = user;
      ctx.set("Content-Type", "application/json");
    }
  });

  server.use(router.routes());

  server.use(async (ctx, next) => {
    ctx.req.session = ctx.session;
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
  });
  server.listen(3000, () => {
    console.log("koa server listening on 3000");
  });
});
