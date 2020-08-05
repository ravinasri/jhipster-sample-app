import { IBoard } from 'app/shared/model/board.model';

export interface INotice {
  id?: number;
  title?: string;
  description?: string;
  noticeList?: IBoard;
}

export class Notice implements INotice {
  constructor(public id?: number, public title?: string, public description?: string, public noticeList?: IBoard) {}
}
