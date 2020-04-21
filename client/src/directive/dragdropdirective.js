import { BehaviorSubject } from "rxjs";

export class DragDropService {
    _dragData = new BehaviorSubject();
    setDragData(data){
      this._dragData.next(data);
    }
    getDragData(){
      return this._dragData.asObservable();
    }
    clearDragData(){
      this._dragData.next(null);
    }
  }
 export default new DragDropService()