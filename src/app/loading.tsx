"use client";
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

export default function Loading() {
  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      background: '#fff'
    }}>
      <Spin
        indicator={<LoadingOutlined style={{ fontSize: 40 }} spin />}
        tip={
          <div style={{ marginTop: 16, color: '#1890ff', fontSize: 16 }}>
            系统初始化中...
          </div>
        }
      />
    </div>
  );
}
