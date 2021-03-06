import { useEffect } from "react";
import { Button, Icon, Tabs } from "antd";
import getCofnig from "next/config";
import { connect } from "react-redux";
import Router, { withRouter } from "next/router";
import Repo from "../components/Repo";
import LRU from "lru-cache";

// import { cacheArray } from "../lib/repo-basic-cache";

const api = require("../lib/api");

const cache = new LRU({
  maxAge: 1000 * 10,
})

const { publicRuntimeConfig } = getCofnig();

let cachedUserRepos, cachedUserStaredRepos;

const isServer = typeof window === "undefined";

function Index({ userRepos, userStaredRepos, user, router }) {
  const tabKey = router.query.key || "1";

  useEffect(() => {
    if (!isServer) {
      if (userRepos) {
        cache.set('userRepos', userRepos)
      }
      if (userStaredRepos) {
        cache.set('userStaredRepos', userStaredRepos)
      }
    }
  }, [userRepos, userStaredRepos]);

  useEffect(() => {
    if (!isServer) {
      // cacheArray(userRepos);
      // cacheArray(userStaredRepos);
    }
  });

  if (!user || !user.id) {
    return (
      <div className="root">
        <p>亲，您还没有登录哦~</p>
        <Button type="primary" href={publicRuntimeConfig.OAUTH_URL}>
          点击登录
        </Button>
        <style jsx>{`
          .root {
            height: 400px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
        `}</style>
      </div>
    );
  }
  const handleTabChange = (activeKey) => {
    Router.push(`/?key=${activeKey}`);
  };
  return (
    <div className="root">
      <div className="user-info">
        <img src={user.avatar_url} alt="user avatar" className="avatar" />
        <span className="login">{user.login}</span>
        <span className="name">{user.name}</span>
        <span className="bio">{user.bio}</span>
        <p className="email">
          <Icon type="mail" style={{ marginRight: 10 }} />
          <a href={`mailto:${user.email}`}>{user.email}</a>
        </p>
      </div>
      <div className="user-repos">
        <Tabs activeKey={tabKey} onChange={handleTabChange} animated={false}>
          <Tabs.TabPane tab="你的仓库" key="1">
            {userRepos.map((repo) => (
              <Repo key={repo.id} repo={repo} />
            ))}
          </Tabs.TabPane>
          <Tabs.TabPane tab="你关注的仓库" key="2">
            {userStaredRepos.map((repo) => (
              <Repo key={repo.id} repo={repo} />
            ))}
          </Tabs.TabPane>
        </Tabs>
      </div>
      <style jsx>{`
        .root {
          display: flex;
          align-items: flex-start;
          padding: 20px 0;
        }
        .user-info {
          width: 200px;
          margin-right: 40px;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
        }
        .login {
          font-weight: 800;
          font-size: 20px;
          margin-top: 20px;
        }
        .name {
          font-size: 16px;
          color: #777;
        }
        .bio {
          margin-top: 20px;
          color: #333;
        }
        .avatar {
          width: 100%;
          border-radius: 5px;
        }
        .user-repos {
          flex-grow: 1;
        }
      `}</style>
    </div>
  );
}
Index.getInitialProps = async ({ ctx, reduxStore }) => {
  const user = reduxStore.getState().user;
  if (!user || !user.id) {
    return {
      isLogin: false,
    };
  }

  if (!isServer) {
    // if (cachedUserRepos && cachedUserStaredRepos) {
    //   return {
    //     userRepos: cachedUserRepos,
    //     userStaredRepos: cachedUserStaredRepos,
    //   };
    // }
    if (cache.get('userRepos') && cache.get('userStaredRepos')) {
      return {
        userRepos: cache.get('userRepos'),
        userStaredRepos: cache.get('userStaredRepos'),
      }
    }
  }
  const userRepos = await api.request(
    {
      url: `/users/${user.name}/repos`,
    },
    ctx.req,
    ctx.res
  );
  const userStaredRepos = await api.request(
    {
      url: `/users/${user.name}/starred`,
    },
    ctx.req,
    ctx.res
  );

  return {
    isLogin: true,
    userRepos: userRepos.data,
    userStaredRepos: userStaredRepos.data,
  };
};

// 由于withRouter和connect的生命周期可能会冲突
// 导致tab中的激活key可能不准确，因此将withRouter放在外层

// 处理缓存时，需要注意，服务端渲染中的变量是会一直存在在node服务中
// 所以需要判断非服务端环境，才使用变量进行缓存

// 由于登出后，不会加载该页面，因此getInitialProps不会执行，登录状态不会更新
// 所以需要根据connect获取最新的登录状态
export default withRouter(
  connect(function mapState(state) {
    return {
      user: state.user,
    };
  })(Index)
);
