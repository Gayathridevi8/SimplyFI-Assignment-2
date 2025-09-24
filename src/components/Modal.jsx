import { Modal, Form, Input, Divider } from "antd";
import { useEffect } from "react";

const ModalComponent = ({
  initialValues,
  isModalOpen,
  setIsModalOpen,
  onSave,
}) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values) => {
    onSave(values);
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isModalOpen) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, isModalOpen, form]);

  return (
    <>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="OK"
        cancelText="Cancel"
        width={600}
        centered
      >
        <Divider style={{ margin: "0 0 24px 0" }} />
        <Form
          form={form}
          layout="horizontal"
          className="mt-4"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          initialValues={initialValues}
          onFinish={onFinish}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "This field is required" }]}
          >
            <Input placeholder="Enter name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "This field is required" },
              { type: "email", message: "Invalid email" },
            ]}
          >
            <Input placeholder="Enter email" />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
            rules={[{ required: true, message: "This field is required" }]}
          >
            <Input placeholder="Enter phone number" />
          </Form.Item>

          <Form.Item
            label="Website"
            name="website"
            rules={[{ required: true, message: "This field is required" }]}
          >
            <Input placeholder="Enter website" />
          </Form.Item>
        </Form>
        <Divider style={{ margin: "48px 0 0 0" }} />
      </Modal>
    </>
  );
};

export default ModalComponent;
