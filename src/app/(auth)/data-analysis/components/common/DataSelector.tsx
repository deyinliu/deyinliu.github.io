import React from 'react';
import { Card, Upload, Button, Radio, Table, Space, message, Tag } from 'antd';
import { UploadOutlined, DatabaseOutlined } from '@ant-design/icons';
import Papa from 'papaparse';
import type { UploadProps } from 'antd';
import { RcFile } from 'antd/lib/upload';
import { dbService } from '@/app/(auth)/data-management/import/services/indexdb';

interface DataSelectorProps {
  onDataSelect: (type: string, data: any) => void;
  onDataParse?: (headers: string[], data: any[][]) => void;
}

const DataSelector: React.FC<DataSelectorProps> = ({ onDataSelect, onDataParse }) => {
  const [dataSource, setDataSource] = React.useState('system');
  const [systemData, setSystemData] = React.useState([
    {
      key: '1',
      name: '麻醉数据集2023',
      description: '全麻手术患者生命体征数据',
      count: 1200,
      updateTime: '2023-12-01',
      type: 'system'
    },
    {
      key: '2',
      name: '术后随访数据',
      description: '术后疼痛评分数据',
      count: 850,
      updateTime: '2023-11-15',
      type: 'system'
    }
  ]);

  // 加载预处理数据
  React.useEffect(() => {
    loadPreprocessedData();
  }, []);

  const loadPreprocessedData = async () => {
    try {
      const data = await dbService.getData();
      if (data.length > 0) {
        setSystemData(prev => [...prev, {
          key: 'preprocessed',
          name: '预处理数据',
          description: '已完成预处理的分析数据',
          count: data.length,
          updateTime: new Date().toLocaleDateString(),
          type: 'preprocessed',
          rawData: data
        }]);
      }
    } catch (error) {
      console.error('加载预处理数据失败:', error);
    }
  };

  const handleSystemDataSelect = (selectedRowKeys: string[], selectedRows: any[]) => {
    const selectedRow = selectedRows[0];
    if (selectedRow.type === 'preprocessed' && selectedRow.rawData) {
      // 处理预处理数据
      const headers = Object.keys(selectedRow.rawData[0]);
      const parsedData = selectedRow.rawData.map(row =>
        headers.map(header => row[header])
      );
      onDataParse?.(headers, parsedData);
    }
    onDataSelect(selectedRow.type, selectedRow.key);
  };

  const systemDataColumns = [
    { title: '数据集名称', dataIndex: 'name', key: 'name' },
    { title: '描述', dataIndex: 'description', key: 'description' },
    { title: '记录数', dataIndex: 'count', key: 'count' },
    { title: '更新时间', dataIndex: 'updateTime', key: 'updateTime' },
    {
      title: '数据类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => (
        <Tag color={type === 'preprocessed' ? 'green' : 'blue'}>
          {type === 'preprocessed' ? '预处理数据' : '系统数据'}
        </Tag>
      )
    }
  ];

  const handleUpload: UploadProps['beforeUpload'] = (file: RcFile) => {
    if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
      message.error('只支持上传 CSV 文件！');
      return false;
    }

    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        if (results.errors.length > 0) {
          message.error('文件解析失败，请检查文件格式。');
          return;
        }

        const headers = results.meta.fields || [];
        const parsedData = results.data.map((row) =>
          headers.map((header) => row[header])
        );

        onDataParse?.(headers, parsedData);
        message.success('文件解析成功！');
      },
      error: () => {
        message.error('文件解析失败，请检查文件格式。');
      },
    });

    return false;
  };

  return (
    <Card size="small" title="选择数据来源" bordered={false}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Radio.Group
          value={dataSource}
          onChange={(e) => setDataSource(e.target.value)}
        >
          <Radio.Button value="system">
            <DatabaseOutlined /> 系统数据
          </Radio.Button>
          <Radio.Button value="upload">
            <UploadOutlined /> 上传数据
          </Radio.Button>
        </Radio.Group>

        {dataSource === 'upload' ? (
          <div style={{ padding: '16px 0' }}>
            <Upload
              accept=".csv"
              beforeUpload={handleUpload}
              showUploadList={false}
            >
              <Button icon={<UploadOutlined />}>上传CSV文件</Button>
            </Upload>
          </div>
        ) : (
          <Table
            columns={systemDataColumns}
            dataSource={systemData}
            size="small"
            pagination={false}
            rowSelection={{
              type: 'radio',
              onChange: handleSystemDataSelect
            }}
          />
        )}
      </Space>
    </Card>
  );
};

export default DataSelector;
