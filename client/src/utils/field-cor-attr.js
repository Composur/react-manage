import React from "react";
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
  InputNumber
} from "antd";
import request from "./request.js";
import TextField from "../components/TextField";
import TextAreaField from "../components/TextAreaField";
import DateFormat from "../components/Date";
import DropDownField from "../components/DropDown";
import DateSection from "../components/DateSection";
import RadioBox from "../components/RadioBox";

import Attachment from "../components/Attachment";
import CascadeDrop from "../components/CascadeDrop";
import FormHidden from "../components/FormHidden";
import MultipleBox from "../components/MultipleBox";
import FormLayout from "../components/FormLayout";
import TextNumberField from '../components/TextNumberField';
import TextMoneyField from '../components/TextMoneyField';
import Util from '../utils/utils-form-design';
const TextFieldAttr = TextField.TextFieldAttr;
const TextAreaFieldAttr = TextAreaField.TextAreaFieldAttr;
const DateAttr = DateFormat.DateAttr;
const DropDownFieldAttr = DropDownField.DropDownFieldAttr;
const AttachmentAttr = Attachment.AttachmentAttr;
const FormHiddenAttr = FormHidden.FormHiddenAttr;
const DateSectionAttr = DateSection.DateSectionAttr;
const RadioBoxAttr = RadioBox.RadioBoxAttr;
const CascadeDropAttr = CascadeDrop.CascadeDropAttr;
const MultipleBoxAttr = MultipleBox.MultipleBoxAttr;
const FormLayoutAttr = FormLayout.FormLayoutAttr;
const TextNumberFieldAttr = TextNumberField.TextNumberFieldAttr;
const TextMoneyFieldAttr = TextMoneyField.TextMoneyFieldAttr;



const Option = Select.Option;
const { TextArea } = Input;
const { RangePicker } = DatePicker;
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
const radioStyle = {
  display: "block",
  height: "30px",
  lineHeight: "30px"
};
const FieldCorAttr = {
  textfield: {
    initValues: {
      titleValue: "单行输入框",
      tipValue: "请输入",
      name: "input",
      verifyValue: false
    },
    showField: rest => {
      return <TextField {...rest} />;
    },
    showAttr: rest => {
      return <TextFieldAttr {...rest} />;
    },
    getReallyField: item => {
      return <Input placeholder={item.tipValue}/>;
    }
  },
  number: {
    initValues: {
      titleValue: "数字输入框",
      tipValue: "请输入数字",
      name: "input",
      verifyValue: false
    },
    showField: rest => {
      return <TextNumberField {...rest} />;
    },
    showAttr: rest => {
      return <TextNumberFieldAttr {...rest} />;
    },
    getReallyField: item => {
      return <InputNumber placeholder={item.tipValue} />;
    }
  },
  money: {
    initValues: {
      titleValue: "金额",
      tipValue: "请输入金额",
      name: "input",
      verifyValue: false
    },
    showField: rest => {
      return <TextMoneyField {...rest} />;
    },
    showAttr: rest => {
      return <TextMoneyFieldAttr {...rest} />;
    },
    getReallyField: item => {
      return <InputNumber placeholder={item.tipValue} />;
    }
  },
  textareafield: {
    initValues: {
      titleValue: "多行输入框",
      tipValue: "请输入",
      name: "textarea",
      verifyValue: false
    },
    showField: rest => {
      return <TextAreaField {...rest} />;
    },
    showAttr: rest => {
      return <TextAreaFieldAttr {...rest} />;
    },
    getReallyField: item => {
      return <TextArea placeholder={item.tipValue} autosize />;
    }
  },
  dropdownfield: {
    initValues: {
      titleValue: "下拉框",
      tipValue: "请选择",
      name: "select",
      verifyValue: false,
      dropdownoptions: [{ key: "", value: "" }]
    },
    showField: rest => {
      return <DropDownField {...rest} />;
    },
    showAttr: rest => {
      return <DropDownFieldAttr {...rest} />;
    },
    getReallyField: ({ dropdownoptions, name, tipValue }) => {
      return (
        <Select placeholder={tipValue}>
          {dropdownoptions.map((val, i) => {
            return (
              <Option value={val["key"]} key={i} name={name}>
                {val["value"]}
              </Option>
            );
          })}
        </Select>
      );
    }
  },
  cascadedrop: {
    initValues: {
      titleValue: "级联下拉框",
      tipValue: "请选择",
      name: "select",
      verifyValue: false,
      url: ""
    },
    showField: rest => {
      return <CascadeDrop {...rest} />;
    },
    showAttr: rest => {
      return <CascadeDropAttr {...rest} />;
    },
    getReallyField: item => {
      let options = [];
      if (!item.url) {
      } else {
        options = request(item.url);
      }
      return <Cascader options={options} placeholder={item.tipvalue} />;
    }
  },
  attachment: {
    initValues: {
      titleValue: "附件",
      name: "attachment",
      verifyValue: false
    },
    showField: rest => {
      return <Attachment {...rest} />;
    },
    showAttr: rest => {
      return <AttachmentAttr {...rest} />;
    },
    getReallyField: item => {
      return (
        <Upload>
          <Button>
            <Icon type="upload" />
            上传
          </Button>
        </Upload>
      );
    }
  },
  formhidden: {
    initValues: {
      titleValue: "隐藏域",
      name: "formhidden",
    },
    showField: rest => {
      return <FormHidden {...rest} />;
    },
    showAttr: rest => {
      return <FormHiddenAttr {...rest} />;
    },
    getReallyField: item => {
      return <Input type="hidden" name={item.name} />;
    }
  },
  dateformat: {
    initValues: {
      titleValue: "日期",
      tipValue: "请选择",
      name: "date",
      formatValue: "YYYY-MM-DD HH:mm",
      verifyValue: false
    },
    showField: rest => {
      return <DateFormat {...rest} />;
    },
    showAttr: rest => {
      return <DateAttr {...rest} />;
    },
    getReallyField: item => {
      return <DatePicker format={item.formatValue} placeholder={item.tipValue} style={{ width: "100%" }} />;
    }
  },
  dateformatsection: {
    initValues: {
      titleValue: "日期区间",
      tipValue: "请选择",
      name: "datesection",
      formatValue: "YYYY-MM-DD HH:mm",
      verifyValue: false
    },
    showField: rest => {
      return <DateSection {...rest} />;
    },
    showAttr: rest => {
      return <DateSectionAttr {...rest} />;
    },
    getReallyField: item => {
      return (
        <RangePicker  format={item.formatValue} style={{ width: "100%" }} />
      );
    }
  },
  radiobox: {
    initValues: {
      titleValue: "单选框",
      tipValue: "请选择",
      name: "radiobox",
      verifyValue: false,
      radioboxoptions: [{ key: "", value: "" }]
    },
    showField: rest => {
      return <RadioBox {...rest} />;
    },
    showAttr: rest => {
      return <RadioBoxAttr {...rest} />;
    },
    getReallyField: ({ radioboxoptions, name, tipValue }) => {
      return (
        <RadioGroup placeholder={tipValue}>
          {radioboxoptions.map((val, i) => {
            return (
              <Radio
                style={radioStyle}
                value={radioboxoptions[i]}
                key={i}
                name={name}
                onChange={e => {
                  this.handleChange({ name: e.target.value });
                }}
              >
                {val["value"]}
              </Radio>
            );
          })}
        </RadioGroup>
      );
    }
  },
  multiplebox: {
    initValues: {
      titleValue: "多选框",
      tipValue: "请选择",
      name: "multiselect",
      verifyValue: false,
      multiselectoptions: [{ key: "", value: "" }]
    },
    showField: rest => {
      return <MultipleBox {...rest} />;
    },
    showAttr: rest => {
      return <MultipleBoxAttr {...rest} />;
    },
    getReallyField: ({ multiselectoptions, name, tipValue }) => {
      return (
        <CheckboxGroup placeholder={tipValue}>
          <Row>
            {multiselectoptions.map((val, i) => {
              return (
                <Col key={val.value}>
                  <Checkbox value={multiselectoptions[i]}>{val.value}</Checkbox>
                </Col>
              );
            })}
          </Row>
        </CheckboxGroup>
      );
    }
  },
  grid: {
    initValues: {
      rowoptions:[
        {key:1,value:1},
        {key:2,value:2},
        {key:3,value:3},
        {key:4,value:4},
        {key:5,value:5},
        {key:6,value:6},
        {key:7,value:7},
        {key:8,value:8},
      ],
      rowoptionvalue:1,
      coloptionvalue:1,
      coloptions:[
        {key:1,value:1},
        {key:2,value:2},
        {key:3,value:3},
        {key:4,value:4},
        {key:5,value:5},
        {key:6,value:6},
        {key:7,value:7},
        {key:8,value:8}
      ],
      grid:{row:1,col:1,rowtem:Util.initGridRowOrColumn(1),coltem:Util.initGridRowOrColumn(1), cells:[{cellIndex:0}]},
    },
    showField: rest => {
      return <FormLayout {...rest} />;
    },
    showAttr: rest => {
      return <FormLayoutAttr {...rest} />;
    },
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
    }
  }
};
export default FieldCorAttr;
