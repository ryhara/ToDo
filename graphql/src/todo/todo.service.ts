import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo, TodoStatus } from './todo.models';

@Injectable()
export class TodoService {
  // 今回はDBと接続しないのでメモリ上にTodoを保存します。
	// TODO : DBと接続するように修正
  private todos: Todo[] = [
		{
			id: '1',
			title: 'title1',
			description: 'description1',
			status: TodoStatus.TODO,
			createdAt: new Date(),
			updatedAt: new Date(),
		},
	];

  // 全件取得のメソッド
  findAll(): Todo[] {
    return this.todos;
  }
  // idを元に一件取得のメソッド
  findOneById(id: string): Todo {
    const result = this.todos.find((todo) => id === todo.id);
    if (!result) {
      // なかったら404エラーを返す。ビルトインのエラーも豊富にあってエラー処理も結構楽
      // https://docs.nestjs.com/exception-filters#built-in-http-exceptions
      throw new NotFoundException();
    }
    return result;
  }
}