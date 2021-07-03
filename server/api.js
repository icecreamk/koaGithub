const axios = require("axios");
// const Router = require("koa-router");

// const { requestGithub } = require("../lib/api");

const github_base_url = "https://api.github.com";

module.exports = (server) => {
  server.use(async (ctx, next) => {
    const url = ctx.url;
    // const method = ctx.method;

    if (url.startsWith("/github/")) {
      const session = ctx.session;
      const githubAuth = session && session.githubAuth;
      const githubPath = `${github_base_url}${url.replace("/github/", "/")}`;

      let headers = {};
      if (githubAuth && githubAuth.access_token) {
        headers[
          "Authorization"
        ] = `${githubAuth.token_type} ${githubAuth.access_token}`;
      }
      console.log("pppp", url);

      console.log(githubPath);

      try {
        const result = await axios({
          method: "GET",
          url: githubPath,
          headers,
        });
        if (result.status === 200) {
          ctx.body = result.data;
          ctx.set("Content-Type", "application/json");
        } else {
          ctx.status = result.status;
          ctx.body = {
            success: false,
          };
          ctx.set("Content-Type", "application/json");
        }
      } catch (error) {
        ctx.body = {
          success: false,
        };
        ctx.set("Content-Type", "application/json");

        // console.log("github req error", error);
      }
    } else {
      await next();
    }
  });
};
