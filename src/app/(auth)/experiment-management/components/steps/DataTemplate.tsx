"use client";
import { Radio, Button, Card } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import TemplateDesigner from '../template/TemplateDesigner';
import TemplateList from '../template/TemplateList';
import { useExperimentFormStore } from '@/stores/experimentFormStore';

const DataTemplateStep = () => {
  const { dataTemplate, setDataTemplate } = useExperimentFormStore();
  const { sourceFrom } = dataTemplate;
  return (
    <div style={{ minHeight: 400 }}>
      <div style={{ marginBottom: 16 }}>
        <Radio.Group value={sourceFrom} onChange={(e) => setDataTemplate({ ...dataTemplate, sourceFrom: e.target.value })}>
          <Radio.Button value="select">选择已有模板</Radio.Button>
          <Radio.Button value="create">创建新模板</Radio.Button>
        </Radio.Group>
      </div>

      {
        sourceFrom === 'select' ? (
          <Card
            title="选择模板"
            extra={
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setDataTemplate({ ...dataTemplate, sourceFrom: 'create' })}
              >
                创建新模板
              </Button>
            }
          >
            <TemplateList
              onSelect={setDataTemplate}
              selectedTemplate={dataTemplate}
            />
          </Card>
        ) : (
          <Card title="创建新模板">
            <TemplateDesigner />
          </Card>
        )
      }
    </div >
  );
};

export default DataTemplateStep;
