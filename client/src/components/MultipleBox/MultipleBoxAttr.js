import React, { PureComponent } from "react";
import { Checkbox } from "antd";
export default class MultipleBoxAttr extends PureComponent {
  handleChange = item => {
    const { activeItem, onSave } = this.props;
    const{
     index,
     attrInfo,
     cellIndex
    } = activeItem;
    const updateAttrInfo = {
      ...attrInfo,
      ...item
    };
    const updateActiveItem = {...activeItem,attrInfo:updateAttrInfo}
    onSave(updateActiveItem, index, cellIndex);
  };
  handleAddOptions({ index, multiselectoptions }) {
    multiselectoptions = [...multiselectoptions, { key: "", value: "" }];
    this.handleChange({ multiselectoptions: multiselectoptions });
  }
  handleUpdateOptions({ index, multiselectoptions, key, value }) {
    let option = { ...multiselectoptions[index], key: key, value: value };
    multiselectoptions = [
      ...multiselectoptions.slice(0, index),
      option,
      ...multiselectoptions.slice(index + 1)
    ];
    this.handleChange({ multiselectoptions: multiselectoptions });
  }
  handleDelOptions(index, multiselectoptions) {
    multiselectoptions = multiselectoptions.filter((val, idx) => idx !== index);
    this.handleChange({ multiselectoptions: multiselectoptions });
  }
  render() {
    const {
      activeItem: {
        attrInfo: { titleValue, tipValue, verifyValue, name, multiselectoptions }
      }
    } = this.props;
    return (
      <div className="wf-panel wf-settingpanel open">
        <div className="wf-sidepanel-head">多选框</div>
        <div className="wf-settings-pane">
          <div className="wf-form wf-widgetsettings">
            <div className="wf-setter-field wf-setting-label">
              <div className="fieldname">
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
                  onChange={e => {
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
                  onChange={e => {
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
                  onChange={e => {
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
              {multiselectoptions.map((val, index) => {
                return (
                  <div className="options" key={index}>
                    <div className="fieldblock wf-setting-option">
                      <input
                        type="text"
                        maxLength="50"
                        value={val.key}
                        onChange={e => {
                          const key = e.target.value;
                          const value = val.value;
                          this.handleUpdateOptions({
                            index,
                            multiselectoptions,
                            key,
                            value
                          });
                        }}
                      />
                      <input
                        type="text"
                        maxLength="50"
                        value={val.value}
                        className="margin-left-5px"
                        onChange={e => {
                          const key = val.key;
                          const value = e.target.value;
                          this.handleUpdateOptions({
                            index,
                            multiselectoptions,
                            key,
                            value
                          });
                        }}
                      />
                      <a
                        className="action action-del"
                        href
                        onClick={() =>
                          this.handleDelOptions(index, multiselectoptions)
                        }
                      >
                        <i className="icon icon-minus" />
                      </a>
                      <a
                        className="action action-add"
                        href
                        onClick={() =>
                          this.handleAddOptions({ index, multiselectoptions })
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
            {multiselectoptions.length === 0 ? (
              <div className="wf-setting-line">
                <a
                  href
                  onClick={() =>
                    this.handleAddOptions({ index: 0, multiselectoptions: [] })
                  }
                >
                  新增
                </a>
              </div>
            ) : (
              ""
            )}
            <div className="wf-setter-field wf-setting-required">
              <div className="fieldname">验证</div>
              <label className="fieldblock">
                <Checkbox
                  checked={verifyValue}
                  onChange={e => {
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
