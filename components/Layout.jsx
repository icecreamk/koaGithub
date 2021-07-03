import React, { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import Router, { withRouter } from "next/router";
import { connect } from "react-redux";
import { Layout, Menu, Input, Avatar, Tooltip, Icon, Dropdown } from "antd";
import Container from "./Container";
import getConfig from "next/config";
import { logout } from "../store";
import axios from "axios";

const { publicRuntimeConfig } = getConfig();

const { Header, Content, Footer } = Layout;

const MyComp = ({ color, children, style }) => (
  <div style={{ color, ...style }}>{children}</div>
);

function MyLayout({ children, user, logout, router }) {
  const [search, setSearch] = useState("");
  // useEffect(() => {
  //   if (queryText && !search) {
  //     setSearch(queryText);
  //   }
  // });

  const githubIconStyle = {
    color: "white",
    fontSize: 40,
    display: "block",
    paddingTop: 10,
    marginRight: 20,
  };

  const footerStyle = {
    textAlign: "center",
  };

  const handleSearchChange = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  const handleSearch = useCallback(() => {
    Router.push(`/search?query=${search}`);
  });

  const handleAvatarClick = useCallback((e) => {
    e.preventDefault();
  }, []);

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  const handleGotoOAuth = useCallback((e) => {
    e.preventDefault();
    axios
      .get(`/prepare-auth?url=${router.asPath}`)
      .then((res) => {
        if (res.status === 200) {
          location.href = publicRuntimeConfig.OAUTH_URL;
        } else {
          console.log("prepare auth failed");
        }
      })
      .catch((err) => {
        console.log("prepare", err);
      });
  });

  const userDropdown = (
    <Menu>
      <Menu.Item>
        <a href="javascript:void(0)" onClick={handleLogout}>
          登出
        </a>
      </Menu.Item>
    </Menu>
  );
  return (
    <Layout>
      <Header>
        <Container renderer={<div className="header-inner" />}>
          <div className="header-left">
            <div className="logo">
              <Link href="/">
                <Icon type="github" style={githubIconStyle} />
              </Link>
            </div>
            <div>
              <Input.Search
                placeholder="搜索仓库"
                value={search}
                onChange={handleSearchChange}
                onSearch={handleSearch}
              />
            </div>
          </div>
          <div className="header-right">
            <div className="user">
              {user && user.id ? (
                <Dropdown overlay={userDropdown}>
                  <Avatar size={40} icon="user" src={user.avatar_url} />
                </Dropdown>
              ) : (
                <Tooltip title="点击进行登录">
                  <a
                    href={publicRuntimeConfig.OAUTH_URL}
                    // onClick={handleGotoOAuth}
                  >
                    <Avatar size={40} icon="user" />
                  </a>
                </Tooltip>
              )}
            </div>
          </div>
        </Container>
      </Header>
      <Content>
        <Container
          renderer={<MyComp color="red" />}
          styles={{ fontSize: "40px" }}
        >
          {children}
        </Container>
      </Content>
      <Footer style={footerStyle}>develop by kkk</Footer>
      <style jsx>{`
        .content {
          color: red;
        }
        .header-inner {
          display: flex;
          justify-content: space-between;
        }
        .header-left {
          display: flex;
          justify-content: flex-start;
        }
      `}</style>
      <style jsx global>{`
        #__next {
          height: 100%;
        }
        .ant-layout {
          min-height: 100%;
        }
        .ant-layout-header {
          padding-left: 0;
          padding-right: 0;
        }
        .ant-layout-content {
          background: #fff;
        }
      `}</style>
    </Layout>
  );
}

export default connect(
  function mapStateToProps(state) {
    return {
      user: state.user,
    };
  },
  function mapDispatchToProps(dispatch) {
    return {
      logout: () => dispatch(logout()),
    };
  }
)(withRouter(MyLayout));
