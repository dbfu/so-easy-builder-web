import React from 'react';
import { Layout, Menu } from 'antd';

import { useRoutes, useLocation, Link } from "react-router-dom"
import { routeConfig } from '../config/routes';

const { Header, Content, Sider } = Layout;

const BasicLayout: React.FC = () => {
  const routes = useRoutes(routeConfig);
  const location = useLocation();

  return (
    <Layout className="w-full h-[100vh] flex flex-col">
      <Header className="bg-[rgb(68,75,81)] h-[48px] flex basis-[48px] items-center px-0" >
        <div className="w-[200px] text-center">
          <h1 className='text-white font-bold text-[16px]'>so-easy-builder</h1>
        </div>
      </Header>
      <Layout className="flex-1">
        <Sider width={200}>
          <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            style={{ height: '100%', borderRight: 0 }}
            items={routeConfig.map(item => ({
              key: item.path,
              label: (
                <Link to={item.path}>{item.title}</Link>
              ),
              icon: item.icon,
            }))}
          />
        </Sider>
        <Layout className='p-[16px] '>
          <Content
            className='m-0 bg-white rounded-md'
          >
            {routes}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default BasicLayout;