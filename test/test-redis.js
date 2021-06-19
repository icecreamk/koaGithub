async function test() {
  const Redis = require("ioredis");

  const redis = new Redis({
    port: 6379,
    // password: 123456, // 有设置时需要配置
  });

  const kesy = await redis.keys("*");
  console.log(kesy);
}

test()