import React from 'react';
import { Modal, Button, Input, Row, Col, Form, Switch, Radio, InputNumber } from 'antd';

const { Search } = Input;

class SettingsModal extends React.Component {
    constructor() {
        super();
        this.state = {
            visible: false,
            settings: {}
        };
        this.setSetting = this.setSetting.bind(this);
    }

    setSetting = (key, value) => {
        const settings = this.state.settings;
        settings[key] = value;
        this.setState({ value });
    }

    setToDefault = () => {
        const { defaultSettings, handleCancel, handleSettingChange } = this.props;
        for (var key in defaultSettings) {
            this.setSetting(key, defaultSettings[key])
        }
        handleSettingChange(this.state.settings);
        handleCancel();
        
    }

    render() {
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        const { handleCancel, showModal, visible, pageSize, handleSettingChange } = this.props;
        return (
            <div>
                <Row type="flex" justify="space-between">
                    <Col>
                        <Button icon="setting" onClick={showModal} />
                    </Col>
                    <Col>
                        <Search
                            placeholder="input search text"
                            onSearch={value => console.log(value)}
                            style={{ width: 200 }}
                        />
                    </Col>
                </Row>

                <Modal
                    title="Settings"
                    visible={visible}
                    onOk={handleCancel}
                    onCancel={handleCancel}
                    footer={false}
                >
                    <Form {...formItemLayout}
                        onSubmit={(e) => (handleSettingChange(this.state.settings, e))}
                    >
                        <Form.Item label="Bordered">
                            <Switch onChange={(checked) => (this.setSetting('bordered', checked))} />
                        </Form.Item>
                        <Form.Item label="Size">
                            <Radio.Group onChange={(value) => (this.setSetting('size', value.target.value))}>
                                <Radio.Button value="default">default</Radio.Button>
                                <Radio.Button value="middle">middle</Radio.Button>
                                <Radio.Button value="small">small</Radio.Button>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item label="Rows per page">
                            <InputNumber min={1} max={15} defaultValue={pageSize} onChange={(value) => (this.setSetting('pageSize', value))} />
                            <span className="ant-form-text"> rows</span>
                        </Form.Item>
                        <Form.Item wrapperCol={{ span: 10, offset: 6 }}>
                            <Row type="flex" justify="space-between">
                                <Button type="primary" htmlType="submit">Submit</Button>
                                <Button type="default"
                                    onClick={() => (this.setToDefault())}
                                >To default</Button>
                            </Row>
                        </Form.Item>

                    </Form>

                </Modal>
            </div>
        );
    }
}


export default SettingsModal