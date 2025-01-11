"use client";
import { Card, Descriptions, Divider, Tag } from 'antd';
import dayjs from 'dayjs';
import { useExperimentFormStore } from '@/stores/experimentFormStore';
import TemplatePreview from '../template/TemplatePreview';

const Preview = () => {
  const { basicInfo, dataTemplate } = useExperimentFormStore();

  return (
    <div>
      <Card title="基本信息" bordered={false}>
        <Descriptions column={1}>
          <Descriptions.Item label="实验主题">
            {basicInfo.experimentTitle || '-'}
          </Descriptions.Item>
          <Descriptions.Item label="实验目标">
            {basicInfo.experimentObjective || '-'}
          </Descriptions.Item>
          <Descriptions.Item label="实验内容">
            {basicInfo.experimentContent || '-'}
          </Descriptions.Item>
          <Descriptions.Item label="实验周期">
            {basicInfo.experimentPeriod?.[0] && basicInfo.experimentPeriod?.[1]
              ? `${dayjs(basicInfo.experimentPeriod[0]).format('YYYY-MM-DD')} 至 ${dayjs(basicInfo.experimentPeriod[1]).format('YYYY-MM-DD')}`
              : '-'}
          </Descriptions.Item>
          <Descriptions.Item label="关键产出">
            {basicInfo.keyOutput || '-'}
          </Descriptions.Item>
          <Descriptions.Item label="关键节点">
            {basicInfo.keyMilestones?.split('\n').map((milestone, index) => (
              <div key={index}>{milestone}</div>
            )) || '-'}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Divider />

      {dataTemplate && (
        <Card
          title="数据采集模板"
          bordered={false}
          extra={dataTemplate.isPublic && <Tag color="blue">公共模板</Tag>}
        >
          <TemplatePreview template={dataTemplate} showCard={false} />
        </Card>
      )}
    </div>
  );
};

export default Preview;
