import { Card, Table, Space, Button, message } from 'antd';
import { DownloadOutlined, SaveOutlined } from '@ant-design/icons';
import { usePreprocessStore } from '../store/usePreprocessStore';
import { dbService } from '../services/indexdb';
import { exportToCsv } from '../utils/export';
import { useState } from 'react';
import { useRouteNavigate } from '@/app/hooks/useRouteNavigate';
import { useDataStore } from '../../store/useDataStore';

export const ResultPreview: React.FC = () => {
  const { processedData } = usePreprocessStore();
  const { addData } = useDataStore();
  const { navigate } = useRouteNavigate();
  const [saving, setSaving] = useState(false);
  const [exporting, setExporting] = useState(false);

  const clearAndSaveData = async () => {
    if (!processedData?.length) {
      message.error('没有可保存的数据');
      return;
    }

    try {
      setSaving(true);
      // 确保数据库已初始化
      await dbService.init();

      // 清除所有历史数据
      const transaction = dbService.db!.transaction([dbService.STORE_NAME], 'readwrite');
      const store = transaction.objectStore(dbService.STORE_NAME);
      await new Promise<void>((resolve, reject) => {
        const clearRequest = store.clear();
        clearRequest.onsuccess = () => resolve();
        clearRequest.onerror = () => reject(clearRequest.error);
      });

      // 保存新数据
      await dbService.saveData(processedData);

      // 添加到数据列表
      addData(processedData);

      message.success('数据保存成功');
      // 返回数据管理页面
      navigate('/data-management/');
    } catch (error) {
      console.error('保存数据失败:', error);
      message.error('数据保存失败');
    } finally {
      setSaving(false);
    }
  };

  const handleExportData = () => {
    if (!processedData?.length) {
      message.error('没有可导出的数据');
      return;
    }

    try {
      setExporting(true);
      // 直接使用处理后的数据，而不是从 IndexDB 读取
      const dataToExport = processedData.slice(0, 100);
      exportToCsv(
        dataToExport,
        `regression_data_${new Date().toISOString().split('T')[0]}.csv`
      );
      message.success('数据导出成功');
    } catch (error) {
      console.error('导出数据失败:', error);
      message.error('导出数据失败');
    } finally {
      setExporting(false);
    }
  };

  const columns = processedData[0]
    ? Object.keys(processedData[0]).map(key => ({
      title: key,
      dataIndex: key,
      key: key,
    }))
    : [];

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Card>
        <Space style={{ marginBottom: 16 }}>
          <Button
            type="primary"
            icon={<SaveOutlined />}
            onClick={clearAndSaveData}  // 使用新的处理函数
            loading={saving}
          >
            保存数据
          </Button>
          <Button
            icon={<DownloadOutlined />}
            onClick={handleExportData}
            loading={exporting}
          >
            导出CSV
          </Button>
        </Space>
      </Card>

      <Table
        dataSource={processedData}
        columns={columns}
        scroll={{ x: true }}
        size="small"
        pagination={{ pageSize: 10 }}
      />
    </Space>
  );
};
