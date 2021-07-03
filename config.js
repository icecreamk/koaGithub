const GITHUB_OAUTH_URL = "https://github.com/login/oauth/authorize";
const SCOPE = "user"; // 权限配置，暂时只需要user权限即可
const client_id = "Iv1.8e692e2b2358cd1a";

module.exports = {
  github: {
    request_token_url: "https://github.com/login/oauth/access_token",
    client_id: client_id,
    client_secret: "647eb9f86031e5028ad94e40659f5d7178f81069",
  },
  GITHUB_OAUTH_URL,
  OAUTH_URL: `${GITHUB_OAUTH_URL}?client_id=${client_id}&scope=${SCOPE}`,
};
