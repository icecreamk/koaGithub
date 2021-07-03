import React, { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import Router, { withRouter } from "next/router";
import { connect } from "react-redux";
import { Layout, Menu, Input, Avatar, Tooltip, Icon, Dropdown } from "antd";
import Container from "./Container";

const { Header, Content, Footer } = Layout;

const MyComp = ({ color, children }) => <div style={{ color }}>{children}</div>;

export default ({ children }) => {
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
  });
  return (
    <Layout>
      <Header>
        <div className="header-inner">
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
              <Avatar size={40} icon="user" />
            </div>
          </div>
        </div>
      </Header>
      <Content>
        <Container><MyComp color="red">{children}</MyComp></Container>
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
};
