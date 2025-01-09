import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

export default function Loading() {
  return (
    <div style={{
      padding: 24,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: 'calc(100vh - 180px)'
    }}>
      <Spin
        indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
        tip="页面加载中..."
      />
    </div>
  );
}
