import React, { PureComponent } from "react";
export default class FormHiddenAttr extends PureComponent {
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
  render() {
    const {
      activeItem: {
        attrInfo: { titleValue, name}
      }
    } = this.props;
    return (
      <div className="wf-panel wf-settingpanel open">
        <div className="wf-sidepanel-head">{titleValue}</div>
        <div className="wf-settings-pane">
          <div className="wf-form wf-widgetsettings">
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
          </div>
        </div>
      </div>
    );
  }
}
