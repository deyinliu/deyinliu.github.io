"use client";
import { Form, Input, DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const BasicInfo = () => {
  return (
    <>
      <Form.Item
        label="实验主题"
        name="experimentTitle"
        rules={[{ required: true, message: '请输入实验主题' }]}
      >
        <Input placeholder="请输入实验主题" />
      </Form.Item>

      <Form.Item
        label="实验目标"
        name="experimentObjective"
        rules={[{ required: true, message: '请输入实验目标' }]}
      >
        <TextArea rows={4} placeholder="请输入实验目标" />
      </Form.Item>

      <Form.Item
        label="实验内容"
        name="experimentContent"
        rules={[{ required: true, message: '请输入实验内容' }]}
      >
        <TextArea rows={4} placeholder="请输入实验内容" />
      </Form.Item>

      <Form.Item
        label="实验周期"
        name="experimentPeriod"
        rules={[{ required: true, message: '请选择实验周期' }]}
      >
        <RangePicker style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        label="关键产出"
        name="keyOutput"
        rules={[{ required: true, message: '请输入关键产出' }]}
      >
        <TextArea rows={4} placeholder="请输入关键产出" />
      </Form.Item>

      <Form.Item
        label="关键节点"
        name="keyMilestones"
        rules={[{ required: true, message: '请输入关键节点' }]}
      >
        <TextArea rows={4} placeholder="请输入关键节点，每行一个" />
      </Form.Item>
    </>
  );
};

export default BasicInfo;
