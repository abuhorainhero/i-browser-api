import * as Types from "../actions/Types";

let initial = {
  sidebarActive: false,
};

const sidebarRenderer = (state = initial, action) => {
  switch (action.type) {
    case Types.SIDEBAR_ACTIVE: {
      let result = { ...state }
      result.sidebarActive = !result.sidebarActive;
      return result;
    }
    default:
      return state;
  }
};

export default sidebarRenderer;
