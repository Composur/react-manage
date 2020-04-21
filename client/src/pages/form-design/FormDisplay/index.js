import React, { PureComponent } from "react";
import { Form } from "antd";
import PropTypes from "prop-types";
import "./index.scss";
import FieldCorAttr from "../../../utils/field-cor-attr.js";
const FormItem = Form.Item;

export default class FormDisplay extends PureComponent {
  getFields(item) {
    const { getFieldDecorator } = this.props.form;
    const { attrInfo, type } = item;
    const { name, titleValue, verifyValue } = attrInfo;
    return (
      <FormItem label={titleValue}>
        {getFieldDecorator(name, {
          rules: [
            {
              required: verifyValue,
              message: "必填项!"
            }
          ]
        })(FieldCorAttr[type].getReallyField(attrInfo))}
      </FormItem>
    );
  }
  render() {
    const { fieldsData } = this.props;
    return (
      <div className="ant-advanced-search-form">
        {fieldsData.map((items, index) => {
          const grid = items.attrInfo.grid;
          const { rowtem, coltem, cells } = grid;
          const GridStyle = {
            display: "grid",
            gridTemplateRows: `${rowtem.join(" ")}`,
            gridTemplateColumns: `${coltem.join(" ")}`
          };
            return (
              <div className="grid" style={GridStyle} key={index}>
                {cells.map((item, idx) => {
                  const cellitem = item.item;
                  const type = cellitem && cellitem.type;
                  switch (type) {
                    case "grid":
                      const grid = cellitem.attrInfo.grid;
                      const { rowtem, coltem, cells } = grid;
                      const GridStyle = {
                        display: "grid",
                        gridTemplateRows: `${rowtem.join(" ")}`,
                        gridTemplateColumns: `${coltem.join(" ")}`
                      };
                      return (
                        <div className="cell" key={idx}>
                          <div className="grid" style={GridStyle}>
                            {cells.map((item, ix) => {
                              const cellitem = item.item;

                              return (
                                <div className="cell" key={ix}>
                                  {cellitem ? this.getFields(cellitem) : ""}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    default:
                      return (
                        <div className="cell" key={idx}>
                          {cellitem ? this.getFields(item.item) : ""}
                        </div>
                      );
                  }
                })}
              </div>
            );
          
        })}
      </div>
    );
  }
}

FormDisplay.propTypes = {
  form: PropTypes.object.isRequired,
  fieldsData: PropTypes.array.isRequired,
  formItemLayout: PropTypes.object
};
