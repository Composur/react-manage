import React, { PureComponent } from "react";
import { Checkbox, Button } from "antd";

export default class DropDownFieldAttr extends PureComponent {
  handleChange = (item) => {
    const { activeItem, onSave } = this.props;
    const { index, attrInfo, cellIndex } = activeItem;
    const updateAttrInfo = {
      ...attrInfo,
      ...item,
    };
    const updateActiveItem = { ...activeItem, attrInfo: updateAttrInfo };
    onSave(updateActiveItem, index, cellIndex);
  };
  handleAddOptions({ index, dropdownoptions }) {
    dropdownoptions = [...dropdownoptions, { key: "", value: "" }];
    this.handleChange({ dropdownoptions: dropdownoptions });
  }
  handleUpdateOptions({ index, dropdownoptions, key, value }) {
    let option = { ...dropdownoptions[index], key: key, value: value };
    dropdownoptions = [
      ...dropdownoptions.slice(0, index),
      option,
      ...dropdownoptions.slice(index + 1),
    ];
    this.handleChange({ dropdownoptions: dropdownoptions });
  }
  handleDelOptions(index, dropdownoptions) {
    dropdownoptions = dropdownoptions.filter((val, idx) => idx !== index);
    this.handleChange({ dropdownoptions: dropdownoptions });
  }
  render() {
    const {
      activeItem: {
        attrInfo: { titleValue, tipValue, verifyValue, name, dropdownoptions },
      },
    } = this.props;
    return (
      <div className="wf-panel wf-settingpanel open">
        <div className="wf-sidepanel-head">下拉框</div>
        <div className="wf-settings-pane">
          <div className="wf-form wf-widgetsettings">
            <div className="wf-setter-field wf-setting-label">
              <div className={`fieldname`}>
                标题
                <span
                  className={`fieldinfo ${
                    Array.from(titleValue).length > 20 ? "error-toolong" : ""
                  }`}
                >
                  最多20字
                </span>
              </div>
              <div className="fieldblock">
                <input
                  type="text"
                  value={titleValue}
                  onChange={(e) => {
                    this.handleChange({ titleValue: e.target.value });
                  }}
                />
              </div>
            </div>
            <div className="wf-setter-field wf-setting-label">
              <div className="fieldname">
                字段名
                <span
                  className={`fieldinfo ${
                    Array.from(name).length > 20 ? "error-toolong" : ""
                  }`}
                >
                  最多20字
                </span>
              </div>
              <div className="fieldblock">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    this.handleChange({ name: e.target.value });
                  }}
                />
              </div>
            </div>
            <div className="wf-setter-field wf-setting-placeholder">
              <div className="fieldname">
                提示文字
                <span
                  className={`fieldinfo ${
                    Array.from(tipValue).length > 50 ? "error-toolong" : ""
                  }`}
                >
                  最多50字
                </span>
              </div>
              <div className="fieldblock">
                <input
                  type="text"
                  value={tipValue}
                  data-spm-anchor-id="0.0.0.i48.42024490REaRWU"
                  onChange={(e) => {
                    this.handleChange({ tipValue: e.target.value });
                  }}
                />
              </div>
            </div>
            <div className="wf-setter-field wf-setting-options">
              <div className="fieldname">
                选项
                <span className="fieldinfo">最多200项，每项最多50个字</span>
              </div>
              <div className="fieldname">
                <em>Key</em>
                <em>Value</em>
              </div>
              {dropdownoptions.map((val, index) => {
                return (
                  <div className="options" key={index}>
                    <div className="fieldblock wf-setting-option">
                      <input
                        type="text"
                        maxLength="50"
                        value={val.key}
                        onChange={(e) => {
                          const key = e.target.value;
                          const value = val.value;
                          this.handleUpdateOptions({
                            index,
                            dropdownoptions,
                            key,
                            value,
                          });
                        }}
                      />
                      <input
                        type="text"
                        maxLength="50"
                        value={val.value}
                        className="margin-left-5px"
                        onChange={(e) => {
                          const key = val.key;
                          const value = e.target.value;
                          this.handleUpdateOptions({
                            index,
                            dropdownoptions,
                            key,
                            value,
                          });
                        }}
                      />
                      <Button type='link'
                        className="action action-del"
                        onClick={() =>
                          this.handleDelOptions(index, dropdownoptions)
                        }
                      >
                        <i className="icon icon-minus" />
                      </Button>
                      <a
                        className="action action-add"
                        href
                        onClick={() =>
                          this.handleAddOptions({ index, dropdownoptions })
                        }
                      >
                        <i
                          className="icon icon-plus"
                          data-spm-anchor-id="0.0.0.i30.42024490REaRWU"
                        />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
            {dropdownoptions.length === 0 ? (
              <div className="wf-setting-line">
                <Button
                  type='link'
                  onClick={() =>
                    this.handleAddOptions({ index: 0, dropdownoptions: [] })
                  }
                >
                  新增
                </Button>
              </div>
            ) : (
              ""
            )}
            <div className="wf-setter-field wf-setting-required">
              <div className="fieldname">验证</div>
              <label className="fieldblock">
                <Checkbox
                  checked={verifyValue}
                  onChange={(e) => {
                    this.handleChange({ verifyValue: e.target.checked });
                  }}
                >
                  （必填）
                </Checkbox>
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
