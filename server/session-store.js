// const debug = require('debug')('server:session-store')

function debug(err) {
  console.log(err);
}

function getRedisId(sid) {
  return `ssid:${sid}`;
}

class RedisSessionStore {
  constructor(client) {
    this.client = client;
  }

  async get(sid) {
    const id = getRedisId(sid);
    const data = await this.client.get(`${id}`);
    if (!data) {
      return null;
    }
    try {
      const result = JSON.parse(data);
      // debug(`get session: ${sid}`, result.githubAuth, result.userInfo.login);
      return result;
    } catch (err) {
      debug("parse session error:", err);
    }
  }

  // 当数据设置为非null时，会自动调用set
  async set(sid, sess, ttl) {
    const id = getRedisId(sid);
    if (typeof ttl === "number") {
      // 转化成秒
      ttl = Math.ceil(ttl / 1000);
    }
    debug(`SET ${sid} ${sess}`);
    const sessStr = JSON.stringify(sess);
    if (ttl) {
      // debug(
      //   `SETEX ${sid} ${ttl} ${sess.githubAuth.access_token} ${sess.userInfo.login}`
      // );
      //   setex 表示设置有过期时间的值
      await this.client.setex(id, ttl, sessStr);
    } else {
      // debug(`SETEX ${sid} ${sess.githubAuth.access_token} ${sess.userInfo.login}`);
      await this.client.set(id, sessStr);
    }
    debug(`SET ${sid} complete`);
  }

  // 当数据设置为null时候，会自动调用destroy进行清除
  async destroy(sid) {
    const id = getRedisId(sid);
    debug(`DEL ${sid}`);
    await this.client.del(id);
    debug(`DEL ${sid} complete`);
  }
}

module.exports = RedisSessionStore;
