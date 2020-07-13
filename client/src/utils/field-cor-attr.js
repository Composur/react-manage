import React from 'react';
import {
  Select,
  Input,
  Cascader,
  DatePicker,
  Upload,
  Button,
  Icon,
  Radio,
  Checkbox,
  Col,
  Row,
  InputNumber,
} from 'antd';
import request from './request.js';
import TextField from '../components/TextField';
import TextAreaField from '../components/TextAreaField';
import DateFormat from '../components/Date';
import DropDownField from '../components/DropDown';
import DateSection from '../components/DateSection';
import RadioBox from '../components/RadioBox';

// 测试组件
import Test from '../components/test/index';

import Attachment from '../components/Attachment';
import CascadeDrop from '../components/CascadeDrop';
import FormHidden from '../components/FormHidden';
import MultipleBox from '../components/MultipleBox';
import FormLayout from '../components/FormLayout';
import TextNumberField from '../components/TextNumberField';
import TextMoneyField from '../components/TextMoneyField';
import Util from './utils-form-design';

const { TextFieldAttr } = TextField;
const { TextAreaFieldAttr } = TextAreaField;
const { DateAttr } = DateFormat;
const { DropDownFieldAttr } = DropDownField;
const { AttachmentAttr } = Attachment;
const { FormHiddenAttr } = FormHidden;
const { DateSectionAttr } = DateSection;
const { RadioBoxAttr } = RadioBox;
const { CascadeDropAttr } = CascadeDrop;
const { MultipleBoxAttr } = MultipleBox;
const { FormLayoutAttr } = FormLayout;
const { TextNumberFieldAttr } = TextNumberField;
const { TextMoneyFieldAttr } = TextMoneyField;
const TestFieldAttr = Test.TextFieldAttr;


const { Option } = Select;
const { TextArea } = Input;
const { RangePicker } = DatePicker;
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
const radioStyle = {
  display: 'block',
  height: '30px',
  lineHeight: '30px',
};
// 各个组件的配置项，需要传入的 props
const FieldCorAttr = {
  test: {
    initValues: {
      titleValue: '测试-title',
      tipValue: 'tips',
      name: '字段名',
      verifyValue: false,
    },
    // 布局
    showField: (rest) => <Test {...rest} />,
    // 配置项
    showAttr: (rest) => <TestFieldAttr {...rest} />,
    // 预览-真实的 Input
    getReallyField: (item) => <Button placeholder={item.tipValue} />,
  },
  textfield: {
    initValues: {
      titleValue: '单行输入框',
      tipValue: '请输入',
      name: 'input',
      verifyValue: false,
    },
    // 布局
    showField: (rest) => <TextField {...rest} />,
    // 配置项
    showAttr: (rest) => <TextFieldAttr {...rest} />,
    // 预览-真实的 Input
    getReallyField: (item) => <Input placeholder={item.tipValue} />,
  },
  number: {
    initValues: {
      titleValue: '数字输入框',
      tipValue: '请输入数字',
      name: 'input',
      verifyValue: false,
    },
    showField: (rest) => <TextNumberField {...rest} />,
    showAttr: (rest) => <TextNumberFieldAttr {...rest} />,
    getReallyField: (item) => <InputNumber placeholder={item.tipValue} />,
  },
  money: {
    initValues: {
      titleValue: '金额',
      tipValue: '请输入金额',
      name: 'input',
      verifyValue: false,
    },
    showField: (rest) => <TextMoneyField {...rest} />,
    showAttr: (rest) => <TextMoneyFieldAttr {...rest} />,
    getReallyField: (item) => <InputNumber placeholder={item.tipValue} />,
  },
  textareafield: {
    initValues: {
      titleValue: '多行输入框',
      tipValue: '请输入',
      name: 'textarea',
      verifyValue: false,
    },
    showField: (rest) => <TextAreaField {...rest} />,
    showAttr: (rest) => <TextAreaFieldAttr {...rest} />,
    getReallyField: (item) => <TextArea placeholder={item.tipValue} autosize />,
  },
  dropdownfield: {
    initValues: {
      titleValue: '下拉框',
      tipValue: '请选择',
      name: 'select',
      verifyValue: false,
      dropdownoptions: [{ key: '', value: '' }],
    },
    showField: (rest) => <DropDownField {...rest} />,
    showAttr: (rest) => <DropDownFieldAttr {...rest} />,
    getReallyField: ({ dropdownoptions, name, tipValue }) => (
      <Select placeholder={tipValue}>
        {dropdownoptions.map((val, i) => (
          <Option value={val.key} key={i} name={name}>
            {val.value}
          </Option>
        ))}
      </Select>
    ),
  },
  cascadedrop: {
    initValues: {
      titleValue: '级联下拉框',
      tipValue: '请选择',
      name: 'select',
      verifyValue: false,
      url: '',
    },
    showField: (rest) => <CascadeDrop {...rest} />,
    showAttr: (rest) => <CascadeDropAttr {...rest} />,
    getReallyField: (item) => {
      let options = [];
      if (!item.url) {
      } else {
        options = request(item.url);
      }
      return <Cascader options={options} placeholder={item.tipvalue} />;
    },
  },
  attachment: {
    initValues: {
      titleValue: '附件',
      name: 'attachment',
      verifyValue: false,
    },
    showField: (rest) => <Attachment {...rest} />,
    showAttr: (rest) => <AttachmentAttr {...rest} />,
    getReallyField: (item) => (
      <Upload>
        <Button>
          <Icon type="upload" />
          上传
        </Button>
      </Upload>
    ),
  },
  formhidden: {
    initValues: {
      titleValue: '隐藏域',
      name: 'formhidden',
    },
    showField: (rest) => <FormHidden {...rest} />,
    showAttr: (rest) => <FormHiddenAttr {...rest} />,
    getReallyField: (item) => <Input type="hidden" name={item.name} />,
  },
  dateformat: {
    initValues: {
      titleValue: '日期',
      tipValue: '请选择',
      name: 'date',
      formatValue: 'YYYY-MM-DD HH:mm',
      verifyValue: false,
    },
    showField: (rest) => <DateFormat {...rest} />,
    showAttr: (rest) => <DateAttr {...rest} />,
    getReallyField: (item) => <DatePicker format={item.formatValue} placeholder={item.tipValue} style={{ width: '100%' }} />,
  },
  dateformatsection: {
    initValues: {
      titleValue: '日期区间',
      tipValue: '请选择',
      name: 'datesection',
      formatValue: 'YYYY-MM-DD HH:mm',
      verifyValue: false,
    },
    showField: (rest) => <DateSection {...rest} />,
    showAttr: (rest) => <DateSectionAttr {...rest} />,
    getReallyField: (item) => (
      <RangePicker format={item.formatValue} style={{ width: '100%' }} />
    ),
  },
  radiobox: {
    initValues: {
      titleValue: '单选框',
      tipValue: '请选择',
      name: 'radiobox',
      verifyValue: false,
      radioboxoptions: [{ key: '', value: '' }],
    },
    showField: (rest) => <RadioBox {...rest} />,
    showAttr: (rest) => <RadioBoxAttr {...rest} />,
    getReallyField: ({ radioboxoptions, name, tipValue }) => (
      <RadioGroup placeholder={tipValue}>
        {radioboxoptions.map((val, i) => (
          <Radio
            style={radioStyle}
            value={radioboxoptions[i]}
            key={i}
            name={name}
            onChange={(e) => {
              this.handleChange({ name: e.target.value });
            }}
          >
            {val.value}
          </Radio>
        ))}
      </RadioGroup>
    ),
  },
  multiplebox: {
    initValues: {
      titleValue: '多选框',
      tipValue: '请选择',
      name: 'multiselect',
      verifyValue: false,
      multiselectoptions: [{ key: '', value: '' }],
    },
    showField: (rest) => <MultipleBox {...rest} />,
    showAttr: (rest) => <MultipleBoxAttr {...rest} />,
    getReallyField: ({ multiselectoptions, name, tipValue }) => (
      <CheckboxGroup placeholder={tipValue}>
        <Row>
          {multiselectoptions.map((val, i) => (
            <Col key={val.value}>
              <Checkbox value={multiselectoptions[i]}>{val.value}</Checkbox>
            </Col>
          ))}
        </Row>
      </CheckboxGroup>
    ),
  },
  grid: {
    initValues: {
      rowoptions: [
        { key: 1, value: 1 },
        { key: 2, value: 2 },
        { key: 3, value: 3 },
        { key: 4, value: 4 },
        { key: 5, value: 5 },
        { key: 6, value: 6 },
        { key: 7, value: 7 },
        { key: 8, value: 8 },
      ],
      rowoptionvalue: 1,
      coloptionvalue: 1,
      coloptions: [
        { key: 1, value: 1 },
        { key: 2, value: 2 },
        { key: 3, value: 3 },
        { key: 4, value: 4 },
        { key: 5, value: 5 },
        { key: 6, value: 6 },
        { key: 7, value: 7 },
        { key: 8, value: 8 },
      ],
      grid: {
        row: 1, col: 1, rowtem: Util.initGridRowOrColumn(1), coltem: Util.initGridRowOrColumn(1), cells: [{ cellIndex: 0 }],
      },
    },
    showField: (rest) => <FormLayout {...rest} />,
    showAttr: (rest) => <FormLayoutAttr {...rest} />,
    getReallyField: () => {
      // let layout = [];
      // const span = 24 / col;
      // for (let i = 0; i < row; i++) {
      //   let obj = {};
      //   obj["col"] = [];
      //   for (let j = 0; j < col; j++) {
      //     obj["col"].push(j);
      //   }
      //   layout.push(obj);
      // }

      // return layout.map((val, index) => {
      //   return (
      //     <Row key={index}>
      //       {val.col.map((value, idx) => {
      //         return <Col key={idx} span={span} />;
      //       })}
      //     </Row>
      //   );
      // });
    },
  },
};
export default FieldCorAttr;
