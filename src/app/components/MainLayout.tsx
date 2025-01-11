"use client";
import { Layout, Menu, Button } from 'antd';
import { usePathname } from 'next/navigation';
import { ExperimentOutlined, DatabaseOutlined, LineChartOutlined, LogoutOutlined } from '@ant-design/icons';
import { auth } from '../utils/auth';
import { RouteTransitionProvider, useRouteTransition } from '../contexts/RouteTransitionContext';
import { useRouteNavigate } from '../hooks/useRouteNavigate';

const { Header, Content, Sider } = Layout;

const menuItems = [
  {
    key: '/experiment-management/',
    label: '实验管理',
    icon: <ExperimentOutlined />,
  },
  {
    key: '/data-management/',
    label: '数据管理',
    icon: <DatabaseOutlined />,
  },
  {
    key: '/data-analysis/',
    label: '数据分析',
    icon: <LineChartOutlined />,
  }
];

function MainLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { navigate, replace } = useRouteNavigate();
  const { isTransitioning } = useRouteTransition();

  const handleMenuClick = (path: string) => {
    if (path === pathname) return;
    navigate(path);
  };

  const handleLogout = () => {
    auth.logout();
    replace('/login/');
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        width={200}
        theme="light"
        style={{ boxShadow: '2px 0 8px rgba(0,0,0,0.1)' }}
      >
        <div style={{
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottom: '1px solid #f0f0f0',
          backgroundColor: '#001529',
        }}>
          <h2 style={{ color: '#fff', margin: 0, fontSize: '18px' }}>MediFlow</h2>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[pathname]}
          activeKey='data-analysis'
          style={{
            height: '100%',
            borderRight: 0,
            fontWeight: 500,
          }}
          items={menuItems.map(item => ({
            key: item.key,
            icon: item.icon,
            label: item.label,
            onClick: () => handleMenuClick(item.key),
          }))}
        />
      </Sider>
      <Layout>
        <Header style={{
          padding: '0 16px',
          background: '#fff',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h1 style={{
            margin: 0,
            fontSize: '20px',
            fontWeight: 500,
          }}>
            MediFlow 医疗数据分析平台
          </h1>
          <Button
            icon={<LogoutOutlined />}
            onClick={handleLogout}
            type="text"
          >
            退出登录
          </Button>
        </Header>
        <Content style={{ margin: '24px 16px', overflow: 'initial' }}>
          <div style={{
            padding: 24,
            background: '#fff',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            minHeight: '500px',
            transition: 'opacity 0.3s ease',
            opacity: isTransitioning ? 0.6 : 1,
          }}>
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <RouteTransitionProvider>
      <MainLayoutContent>{children}</MainLayoutContent>
    </RouteTransitionProvider>
  );
}
