import React, { PureComponent } from "react";
import { Button, Form, Tabs } from "antd";
import FormDesign from "./containers";
import "./index.scss";
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const { FormDisplay } = FormDesign;

class FormShow extends PureComponent {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  render() {
    const { fieldsData, form } = this.props;
    return (
      <Form
        className="form-display"
        layout="inline"
        onSubmit={this.handleSubmit}
      >
        <FormDisplay
          fieldsData={fieldsData}
          form={form}
          formItemLayout={{
            labelCol: {
              span: 8
            },
            wrapperCol: {
              span: 10
            }
          }}
        />
        <FormItem wrapperCol={{ span: 10, offset: 12 }}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedFormShow = Form.create({
  mapPropsToFields(props) {
    let obj = {};
    let { initValues } = props;
    if (initValues) {
      Object.keys(initValues).forEach(key => {
        obj[key] = Form.createFormField({
          value: initValues[key]
        });
      });
    }
    return obj;
  }
})(FormShow);
export default class  extends PureComponent {
  state = { fieldsData: [] };
  save = data => {
    this.setState({ fieldsData: data });
  };
  onSubmit = values => {
    console.log(values);
  };
  submit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const onSubmit = this.props;
        if (onSubmit) {
          onSubmit(values);
        }
      }
    });
  };
  render() {
    return (
      <Tabs type="card">
        <TabPane tab="form表单设计" key="1">
          <FormDesign onSave={this.save} fieldsData={this.state.fieldsData}/>
        </TabPane>
        <TabPane tab="form表单展示" key="2">
          <div style={{ backgroundColor: "#fff", padding: "15px 0" }}>
            <WrappedFormShow fieldsData={this.state.fieldsData} />
          </div>
        </TabPane>
        <TabPane tab="form表单还原" key="3">
          <FormDesign
            onSave={this.save}
            fieldsData={this.state.fieldsData}
          />
        </TabPane>
      </Tabs>
    );
  }
}
