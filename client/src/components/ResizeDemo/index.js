import React,{useRef} from 'react';
import {useEventCallback} from 'rxjs-hooks';
import {fromEvent} from 'rxjs';
import './styles.scss'
import {map,switchMap,takeUntil,withLatestFrom} from 'rxjs/operators';


function Resize() {
    const leftEle = useRef(null);
    const [onMouseDown, leftX] = useEventCallback(
      (event$, inputs$) =>
      
        event$.pipe(
          withLatestFrom(inputs$.pipe(map(([leftEle]) => leftEle))),
          switchMap(([event, leftEle]) => {
            const leftStyle = getComputedStyle(leftEle.current);
            const width0 = parseFloat(leftStyle.getPropertyValue("width"));
            const startX = event.clientX;
            return fromEvent(window, "mousemove").pipe(
              map(moveEvent => moveEvent.clientX - startX + width0),
              takeUntil(fromEvent(window, "mouseup"))
            );
          })
        ),
      null,
      [leftEle]
    );
  
    const leftStyle = {
      flexBasis: leftX === null ? 0 : leftX,
      flexGrow: leftX === null ? 1 : 0,
      flexShrink: 0
    };
  
    return (
      <div className="App">
        <div className="left" ref={leftEle} style={leftStyle}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta
            minus molestiae vel beatae natus eveniet ratione temporibus aperiam
            harum alias officiis assumenda officia quibusdam deleniti eos
            cupiditate dolore doloribus!
          </p>
          <p>
            Ad dolore dignissimos asperiores dicta facere optio quod commodi nam
            tempore recusandae. Rerum sed nulla eum vero expedita ex delectus
            voluptates rem at neque quos facere sequi unde optio aliquam!
          </p>
        </div>
        <div className="resizer" onMouseDown={onMouseDown}>
          drag me
        </div>
        <div className="right">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta
            minus molestiae vel beatae natus eveniet ratione temporibus aperiam
            harum alias officiis assumenda officia quibusdam deleniti eos
            cupiditate dolore doloribus!
          </p>
          <p>
            Ad dolore dignissimos asperiores dicta facere optio quod commodi nam
            tempore recusandae. Rerum sed nulla eum vero expedita ex delectus
            voluptates rem at neque quos facere sequi unde optio aliquam!
          </p>
        </div>
      </div>
    );
  }
  export default Resize
