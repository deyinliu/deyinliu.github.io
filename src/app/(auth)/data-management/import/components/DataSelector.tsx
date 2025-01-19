import { Table, Space, Tooltip, Card, Tabs, Button } from 'antd';
import { InfoCircleOutlined, RightCircleOutlined } from '@ant-design/icons';
import { preprocessableColumns } from '../constants';
import { usePreprocessStore } from '../store/usePreprocessStore';
import type { TabsProps } from 'antd';

interface DataSelectorProps {
  onNext?: () => void;
}

export const DataSelector = ({ onNext }: DataSelectorProps) => {
  const { rawData, selectedColumns, setSelectedColumns } = usePreprocessStore();

  const renderColumnSelector = () => (
    <Table
      rowSelection={{
        type: 'checkbox',
        selectedRowKeys: selectedColumns,
        onChange: setSelectedColumns
      }}
      columns={[
        { title: '列名', dataIndex: 'title', key: 'title' },
        {
          title: '数据类型',
          dataIndex: 'type',
          key: 'type',
          render: (text, record) => (
            <Space>
              {text}
              <Tooltip title={record.description}>
                <InfoCircleOutlined />
              </Tooltip>
            </Space>
          )
        },
        {
          title: '数据预览',
          key: 'preview',
          render: (_, record) => {
            const values = rawData.map(item => item[record.dataIndex]);
            return `${values.slice(0, 3).join(', ')}...`;
          }
        }
      ]}
      dataSource={preprocessableColumns.map(col => ({
        ...col,
        key: col.dataIndex
      }))}
      pagination={false}
      size="small"
    />
  );

  const renderRawDataPreview = () => {
    const columns = Object.keys(rawData[0] || {}).map(key => ({
      title: preprocessableColumns.find(col => col.dataIndex === key)?.title || key,
      dataIndex: key,
      key: key,
      width: 150,
      render: (value: any) => {
        if (typeof value === 'number') {
          return value.toString();
        }
        return value;
      }
    }));

    return (
      <Table
        columns={columns}
        dataSource={rawData.map((item, index) => ({ ...item, key: index }))}
        scroll={{ x: 'max-content', y: 400 }}
        pagination={{ pageSize: 10 }}
        size="small"
      />
    );
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: '选择数据列',
      children: renderColumnSelector()
    },
    {
      key: '2',
      label: '原始数据预览',
      children: renderRawDataPreview()
    }
  ];

  return (
    <Card>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Tabs items={items} />
        {selectedColumns.length > 0 && (
          <Button
            type="primary"
            icon={<RightCircleOutlined />}
            onClick={onNext}
            style={{ marginTop: 16 }}
          >
            开始预处理 ({selectedColumns.length}个字段)
          </Button>
        )}
      </Space>
    </Card>
  );
};
