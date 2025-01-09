"use client";
import { useState, useEffect } from 'react';
import { Form, Input, Button, message, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { auth } from '../utils/auth';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // 确保组件挂载后立即移除 loading
    const loader = document.getElementById('global-loading');
    if (loader) {
      loader.remove();
    }

    if (auth.isAuthenticated()) {
      router.replace('/experiment-management/');
    }
  }, [router]);

  const onFinish = async (values: { username: string; password: string }) => {
    setLoading(true);
    try {
      // 模拟登录请求
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (values.username === 'admin' && values.password === 'admin123') {
        auth.setToken('mock_token');
        auth.setUser({ username: values.username });
        message.success('登录成功');
        router.replace('/experiment-management/');
      } else {
        message.error('用户名或密码错误');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#f0f2f5'
    }}>
      <Card style={{ width: 400 }}>
        <h2 style={{ textAlign: 'center', marginBottom: 30 }}>
          MediFlow 医疗数据分析平台
        </h2>
        <Form
          name="login"
          onFinish={onFinish}
          autoComplete='off'
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="用户名"
              autoComplete="off"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input
              prefix={<LockOutlined />}
              type="text"
              style={{ WebkitTextSecurity: 'disc' }}
              placeholder="密码"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
