import FieldCorAttr from './field-cor-attr';
import fieldImages from './field-images';

const layoutItems = [
  {
    name: '布局控件',
    url: fieldImages.img_formsection,
    type: 'grid',
  },
];
const baseItems = [
  {
    name: 'test',
    url: fieldImages.img_textfield,
    type: 'test',
  },
  {
    name: '单行输入框',
    url: fieldImages.img_textfield,
    type: 'textfield',
  },
  // {
  //   name: "多行输入框",
  //   url: fieldImages.img_textareafield,
  //   type: "textareafield",
  // },
  // {
  //   name: "日期",
  //   url: fieldImages.img_date,
  //   type: "dateformat",
  // },
  // {
  //   name: "日期区间",
  //   url: fieldImages.img_datesection,
  //   type: "dateformatsection",
  // },
  // {
  //   name: "单选框",
  //   url: fieldImages.img_radiobox,
  //   type: "radiobox",
  // },
  // {
  //   name: "多选框",
  //   url: fieldImages.img_multiplebox,
  //   type: "multiplebox",
  // },
  // {
  //   name: "下拉框",
  //   url: fieldImages.img_angledown,
  //   type: "dropdownfield",
  // },
  // {
  //   name: "级联下拉",
  //   url: fieldImages.img_cascadedrop,
  //   type: "cascadedrop",
  // },
  // {
  //   name: "附件",
  //   url: fieldImages.img_attachment,
  //   type: "attachment",
  // },
  // {
  //   name: "表单隐藏域",
  //   url: fieldImages.img_formhidden,
  //   type: "formhidden",
  // },
  // {
  //   name: "数字输入框",
  //   url: fieldImages.img_img_number,
  //   type: "number",
  // },
  // {
  //   name: "金额",
  //   url: fieldImages.img_img_money,
  //   type: "money",
  // },
];
const deepClone = (obj) => JSON.parse(JSON.stringify(obj));
const initArray = (num) => {
  const arr = [];
  for (let i = 0; i < num; i++) {
    arr[i] = { active: false, cellIndex: i };
  }
  return arr;
};
const resetArrayActive = (arr) => {
  arr.forEach((item) => {
    item.active = false;
    const { cells } = item.attrInfo.grid;
    cells.forEach((subItem) => (subItem.active = false));
  });
};
// for move
const resetArrayCellActive = (arr) => {
  arr.forEach((item) => {
    const { cells } = item.attrInfo.grid;
    cells.forEach((subItem) => (subItem.active = false));
  });
};
const resetArrayCellGridIndex = (arr) => {
  arr.forEach((item, index) => {
    const { cells } = item.attrInfo.grid;
    cells.forEach((subItem) => {
      subItem.item && (subItem.item.gridIndex = index);
      if (subItem.item && subItem.item.type === 'grid') {
        subItem.item.attrInfo.grid.cells.forEach(
          (cellGridItem) => cellGridItem.item && (cellGridItem.item.gridIndex = index),
        );
      }
    });
  });
};
const resetCellActive = (arr, gridIndex, cellIndex) => {
  const { cells } = arr[gridIndex].attrInfo.grid;
  cells.forEach((item) => (item.active = false));
  cells[cellIndex].active = true;
};
const addArrayIndex = (arr) => {
  arr.forEach((item, index) => (item.gridIndex = index));
};
const initLayoutValue = (item) => {
  const layoutInitValue = deepClone({
    ...FieldCorAttr[item.type].initValues,
  });
  const attrInfo = {
    titleValue: item.name,
    ...layoutInitValue,
  };
  return { ...item, attrInfo, active: true };
};
const initGridCells = (arr) => {
  arr.forEach((item, index) => {
    const { cells } = item.attrInfo.grid;
    cells.forEach((subItem, cellIndex) => {
      subItem.active = false;
      subItem.item = null;
      subItem.gridIndex = index;
      subItem.cellIndex = cellIndex;
    });
  });
};
const activeIndex = (arr, index) => {
  arr[index].active = true;
};
const getActiveItem = (arr) => arr.find((item) => item.active === true);
const getCellActiveItem = (arr, gridIndex, cellIndex) => arr[gridIndex].attrInfo.grid.cells[cellIndex].item;
const addCellItem = (arr, gridIndex, cellIndex, cellItem) => {
  arr[gridIndex].attrInfo.grid.cells[cellIndex].item = initLayoutValue(
    cellItem,
  );
  // arr[gridIndex].attrInfo.grid.cells[cellIndex].item = cellItem
};
const addCanvasItem = (arr, index, item) => {
  arr.splice(index + 1, 0, initLayoutValue(item));
};
const addcellGridcellGridIndex = (item) => {
  const cellGridIndex = item.cellIndex;
  const { cells } = item.attrInfo.grid;
  cells.forEach((item) => (item.cellGridIndex = cellGridIndex));
};
const updateCurrentCanvasItem = (arr, gridIndex, item) => {
  arr[gridIndex] = item;
};
const updateCurrentCellItem = (arr, gridIndex, cellIndex, item) => {
  arr[gridIndex].attrInfo.grid.cells[cellIndex].item = item;
};
const addCellItemGridIndex = (arr, index) => {
  arr.gridIndex = index;
};
const isgridCellHascellItem = (arr, gridIndex, cellIndex) => {
  const { item } = arr[gridIndex].attrInfo.grid.cells[cellIndex];
  const bool = !!item;
  return bool;
};
const addGridCellGridBaseItem = (
  arr,
  gridIndex,
  cellGridIndex,
  cellIndex,
  item,
) => {
  arr[gridIndex].attrInfo.grid.cells[cellGridIndex].item.attrInfo.grid.cells[
    cellIndex
  ].item = initLayoutValue(item);
};
const updateGridCellGridBaseItem = (
  arr,
  gridIndex,
  cellGridIndex,
  cellIndex,
  item,
) => {
  arr[gridIndex].attrInfo.grid.cells[cellGridIndex].item.attrInfo.grid.cells[
    cellIndex
  ].item = item;
};
const getGridCellGridCellActiveItem = (
  arr,
  gridIndex,
  cellGridIndex,
  cellIndex,
) => arr[gridIndex].attrInfo.grid.cells[cellGridIndex].item.attrInfo.grid
  .cells[cellIndex].item;
const resetGridCellGridCellActive = (
  arr,
  gridIndex,
  cellGridIndex,
  cellIndex,
) => {
  const gridCellGridCell = arr[gridIndex].attrInfo.grid.cells[cellGridIndex].item.attrInfo.grid.cells;
  gridCellGridCell.forEach((item) => (item.active = false));
  gridCellGridCell[cellIndex].active = true;
};
const resetAllGridCellGridCellActice = (arr) => {
  arr.forEach((items) => {
    const { cells } = items.attrInfo.grid;
    cells.forEach((item) => {
      item.item
        && item.item.type === 'grid'
        && item.item.attrInfo.grid.cells.forEach((ite) => (ite.active = false));
    });
  });
};
const initGridRowOrColumn = (row) => {
  const arr = [];
  for (let i = 0; i < row; i++) {
    arr.push('1fr');
  }
  return arr;
};
const resetGridRowOrColumn = (arr, index, col, width, totalCellWidth) => {
  if (index >= col) {
    index %= col;
  }
  arr[index] = `${width}px`;
  arr[index + 1] = `${totalCellWidth - width}px`;
  return arr;
};

const resetGridResizerRowOrColumn = (arr, index, col) => {
  if (index >= col) {
    index %= col;
  }
  arr[index] = '1fr';
  return arr;
};
const getCurrentAndNextCellWidth = (cellcol, idx) => {
  const currentcellStyle = getComputedStyle(cellcol[idx]);
  const currentcellWidth = parseFloat(
    currentcellStyle.getPropertyValue('width'),
  );
  const nextcellStyle = getComputedStyle(cellcol[idx + 1]);
  const nextcellWidth = parseFloat(nextcellStyle.getPropertyValue('width'));
  const totalCellWidth = currentcellWidth + nextcellWidth;
  return totalCellWidth;
};
const swapItem = (arr, gridIndex, item, srcItem) => {
  const { cells } = arr[gridIndex].attrInfo.grid;
  cells.splice(
    srcItem.cellIndex,
    1,
    ...cells.splice(item.cellIndex, 1, cells[srcItem.cellIndex]),
  );
};
const swapCellGridItem = (arr, gridIndex, cellGridIndex, item, srcItem) => {
  if (item.cellGridIndex === srcItem.cellGridIndex) {
    const cellGridcells = arr[gridIndex].attrInfo.grid.cells[cellGridIndex].item.attrInfo.grid
      .cells;
    cellGridcells.splice(
      srcItem.cellIndex,
      1,
      ...cellGridcells.splice(
        item.cellIndex,
        1,
        cellGridcells[srcItem.cellIndex],
      ),
    );
  } else {
    const { cells } = arr[gridIndex].attrInfo.grid;
    const itemCellGridCells = cells[item.cellGridIndex].item.attrInfo.grid.cells;
    const srcItemCellGridCells = cells[srcItem.cellGridIndex].item.attrInfo.grid.cells;
    itemCellGridCells.splice(
      item.cellIndex,
      1,
      ...srcItemCellGridCells.splice(
        srcItem.cellIndex,
        1,
        itemCellGridCells[item.cellIndex],
      ),
    );
  }
};
const swapCellGridBaseItem2CellBaseItem = (
  arr,
  gridIndex,
  cellGridIndex,
  item,
  srcItem,
) => {
  const cellGridcells = arr[gridIndex].attrInfo.grid.cells[cellGridIndex].item.attrInfo.grid.cells;
  const { cells } = arr[gridIndex].attrInfo.grid;
  cellGridcells.splice(
    item.cellIndex,
    1,
    ...cells.splice(srcItem.cellIndex, 1, cellGridcells[item.cellIndex]),
  );
};
const swapCellBaseItem2CellGridBaseItem = (
  arr,
  gridIndex,
  cellGridIndex,
  item,
  srcItem,
) => {
  const cellGridcells = arr[gridIndex].attrInfo.grid.cells[cellGridIndex].item.attrInfo.grid.cells;
  const { cells } = arr[gridIndex].attrInfo.grid;
  cellGridcells.splice(
    srcItem.cellIndex,
    1,
    ...cells.splice(item.cellIndex, 1, cellGridcells[srcItem.cellIndex]),
  );
};
const resetCellsIndex = (arr, gridIndex) => {
  const { cells } = arr[gridIndex].attrInfo.grid;
  cells.forEach((item, index) => {
    item.cellIndex = index;
    item.item && (item.item.cellIndex = index);
    if (item.item && item.item.type === 'grid') {
      item.item.attrInfo.grid.cells.forEach((subitem) => {
        subitem.item && (subitem.item.cellGridIndex = index);
      });
    }
  });
};
const resetcellGridCellsIndex = (arr, gridIndex, cellGridIndex) => {
  const { cells } = arr[gridIndex].attrInfo.grid.cells[cellGridIndex].item.attrInfo.grid;
  cells.forEach((item, index) => {
    item.cellIndex = index;
    item.item && (item.item.cellIndex = index);
  });
};
const resetCellGridIndexandCellItemIndex = (arr, gridIndex) => {
  const { cells } = arr[gridIndex].attrInfo.grid;
  cells.forEach((item, index) => {
    item.cellIndex = index;
    if (item.cellGridIndex !== undefined) {
      delete item.cellGridIndex;
    }
    item.item && (item.item.cellIndex = index);
    if (
      item.item
      && item.item.type !== 'grid'
      && item.item.cellGridIndex !== undefined
    ) {
      delete item.item.cellGridIndex;
    }
    if (item.item && item.item.type === 'grid') {
      item.item.attrInfo.grid.cells.forEach((subitem, idx) => {
        subitem.cellIndex = idx;
        subitem.cellGridIndex = index;
        if (subitem.item) {
          subitem.item.cellIndex = idx;
          subitem.item.cellGridIndex = index;
        }
      });
    }
  });
};
const resetAllGridIndexandCellItemIndex = (arr) => {
  arr.forEach((item, index) => {
    item.gridIndex = index;
    const { cells } = item.attrInfo.grid;
    cells.forEach((subitem, idx) => {
      subitem.cellIndex = idx;
      if (subitem.item) {
        subitem.item.cellIndex = idx;
        subitem.item.gridIndex = index;
      }
      if (subitem.item && subitem.item.type === 'grid') {
        subitem.item.attrInfo.grid.cells.forEach((sub2item, ix) => {
          sub2item.cellIndex = ix;
          sub2item.cellGridIndex = idx;
          if (sub2item.item) {
            sub2item.item.cellIndex = ix;
            sub2item.item.cellGridIndex = idx;
            sub2item.item.gridIndex = index;
          }
        });
      }
    });
  });
};
export default {
  deepClone,
  initArray,
  addArrayIndex,
  activeIndex,
  addCellItem,
  getActiveItem,
  addCanvasItem,
  resetCellActive,
  getCellActiveItem,
  resetArrayActive,
  updateCurrentCanvasItem,
  updateCurrentCellItem,
  addCellItemGridIndex,
  resetArrayCellGridIndex,
  resetArrayCellActive,
  initLayoutValue,
  initGridCells,
  isgridCellHascellItem,
  addGridCellGridBaseItem,
  updateGridCellGridBaseItem,
  getGridCellGridCellActiveItem,
  resetGridCellGridCellActive,
  resetAllGridCellGridCellActice,
  layoutItems,
  initGridRowOrColumn,
  resetGridRowOrColumn,
  resetGridResizerRowOrColumn,
  getCurrentAndNextCellWidth,
  baseItems,
  swapItem,
  swapCellGridItem,
  swapCellGridBaseItem2CellBaseItem,
  swapCellBaseItem2CellGridBaseItem,
  resetCellsIndex,
  resetcellGridCellsIndex,
  resetCellGridIndexandCellItemIndex,
  addcellGridcellGridIndex,
  resetAllGridIndexandCellItemIndex,
};
