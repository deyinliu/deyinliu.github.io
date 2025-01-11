"use client";
import { Card, Descriptions, Divider, Form, Space, Tag } from 'antd';
import dayjs from 'dayjs';
import type { ExperimentData, DataTemplate } from '@/types/experiment';
import TemplatePreview from '../template/TemplatePreview';

interface PreviewProps {
  data: ExperimentData;
}

const Preview: React.FC<PreviewProps> = ({ data }) => {
  return (
    <div>
      <Card title="基本信息" bordered={false}>
        <Descriptions column={1}>
          <Descriptions.Item label="实验主题">
            {data.experimentTitle}
          </Descriptions.Item>
          <Descriptions.Item label="实验目标">
            {data.experimentObjective}
          </Descriptions.Item>
          <Descriptions.Item label="实验内容">
            {data.experimentContent}
          </Descriptions.Item>
          <Descriptions.Item label="实验周期">
            {data.experimentPeriod?.[0] && data.experimentPeriod?.[1]
              ? `${dayjs(data.experimentPeriod[0]).format('YYYY-MM-DD')} 至 ${dayjs(data.experimentPeriod[1]).format('YYYY-MM-DD')}`
              : '-'}
          </Descriptions.Item>
          <Descriptions.Item label="关键产出">
            {data.keyOutput}
          </Descriptions.Item>
          <Descriptions.Item label="关键节点">
            {data.keyMilestones?.split('\n').map((milestone, index) => (
              <div key={index}>{milestone}</div>
            ))}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Divider />

      <Card
        title="数据采集模板"
        bordered={false}
        extra={data.dataTemplate?.isPublic && <Tag color="blue">公共模板</Tag>}
      >
        <TemplatePreview template={data.dataTemplate} />
      </Card>
    </div>
  );
};

export default Preview;
