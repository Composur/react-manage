export const SET_HEAD_TITLE = "set_head_title";

export default {
  headTitle(state = "查询", action) {
    const { type, payload } = action;
    switch (type) {
      case SET_HEAD_TITLE:
        return payload;
      default:
    }

    return state;
  }
};

// 设置 head title
export function setHeadTitle(title) {
  return {
    type: SET_HEAD_TITLE,
    payload: title
  };
}
