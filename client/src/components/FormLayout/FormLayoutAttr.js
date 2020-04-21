import React, { PureComponent } from "react";
import { Select, Button } from "antd";
import Util from "../../utils/utils-form-design";

const Option = Select.Option;
export default class FormLayoutAttr extends PureComponent {
  handleChange = ({ rowoptionvalue, coloptionvalue }) => {
    const { activeItem, onSave } = this.props;
    const { gridIndex, attrInfo } = activeItem;
    const updateAttrInfo = {
      ...attrInfo,
      rowoptionvalue:rowoptionvalue,
      coloptionvalue:coloptionvalue,
      grid:{
        row:rowoptionvalue,
        col:coloptionvalue,
        rowtem:Util.initGridRowOrColumn(rowoptionvalue),
        coltem:Util.initGridRowOrColumn(coloptionvalue),
        cells:Util.initArray(rowoptionvalue * coloptionvalue)
      }
    };
    const updateActiveItem = { ...activeItem, attrInfo: updateAttrInfo };
    onSave(updateActiveItem, gridIndex);
  };
  onClick = ()=>{
    const { activeItem, onSave } = this.props;
    const {  attrInfo ,attrInfo:{grid:{row,col,cells}}} = activeItem;
    const updateAttrInfo = {
      ...attrInfo,
      grid:{
        row,
        col,
        rowtem:Util.initGridRowOrColumn(row),
        coltem:Util.initGridRowOrColumn(col),
        cells
      }
    };
    const updateActiveItem = { ...activeItem, attrInfo: updateAttrInfo };
    onSave(updateActiveItem);
  }

  render() {
    const {
      activeItem: {
        attrInfo: { coloptions, coloptionvalue, rowoptions, rowoptionvalue }
      }
    } = this.props;
    return (
      <div className="wf-panel wf-settingpanel open">
        <div className="wf-sidepanel-head">布局设置</div>
        <div className="wf-settings-pane">
          <div className="wf-form wf-widgetsettings">
            <div className="wf-setter-field wf-setting-label">
              <div className="fieldname">行</div>
              <div className="fieldblock">
                <Select
                  value={rowoptionvalue}
                  style={{ width: 120 }}
                  onChange={value => {
                    this.handleChange({
                      rowoptionvalue: value,
                      coloptionvalue: coloptionvalue
                    });
                  }}
                >
                  {rowoptions.map((val, index) => {
                    return (
                      <Option value={val.key} key={index}>
                        {val.value}
                      </Option>
                    );
                  })}
                </Select>
              </div>
              <div className="fieldblock">
                <div className="fieldname">列</div>
                <Select
                  value={coloptionvalue}
                  style={{ width: 120 }}
                  onChange={value => {
                    this.handleChange({
                      rowoptionvalue: rowoptionvalue,
                      coloptionvalue: value
                    });
                  }}
                >
                  {coloptions.map((val, index) => {
                    return (
                      <Option value={val.key} key={index}>
                        {val.value}
                      </Option>
                    );
                  })}
                </Select>
              </div>
              <div className="fieldblock">
                <Button type="primary" onClick={this.onClick}>重置</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
