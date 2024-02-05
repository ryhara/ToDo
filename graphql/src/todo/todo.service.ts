import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo, TodoInfo } from './models/todo.models';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TodoService {
  // prismaのインスタンスを作成
  constructor(private prisma: PrismaService) {}

  // 全件取得のメソッド
  async findAll(): Promise<TodoInfo[]> {
    const result  = this.prisma.todo.findMany();
    return result;
  }

  // idを元に一件取得のメソッド
  async findOneById(id: string): Promise<TodoInfo> {
    const result = await this.prisma.todo.findUnique({
      where: {
        id: id,
      },
    });
    if (!result) {
      // なかったら404エラーを返す。ビルトインのエラーも豊富にあってエラー処理も結構楽
      // https://docs.nestjs.com/exception-filters#built-in-http-exceptions
      throw new NotFoundException();
    }
    return result;
  }

  // statusを元にTodoを取得
  async findTodoByStatus(status: number): Promise<TodoInfo[]> {
    if (status < 0 || status > 2) {
      return [];
    }
    const result = await this.prisma.todo.findMany({
      where: {
        status: status,
      },
    });
    return result;
  }

  // Todoの追加
  async addTodo(
    title: string,
    description: string,
  ): Promise<Todo> {
    const result = await this.prisma.todo.create({
      data: {
        title: title,
        description: description,
        status: 0,
      },
    });
    return result;
  }

  // Todoの削除
  async deleteTodo(
    id: string,
  ): Promise<Todo> {
    const result = await this.prisma.todo.delete({
      where: {
        id: id,
      },
    });
    return result;
  }

  // Todoの更新
  async updateTodo(
    id: string,
    title: string,
    description: string,
    status: number,
  ): Promise<Todo> {
    const result = await this.prisma.todo.update({
      where: {
        id: id,
      },
      data: {
        title: title,
        description: description,
        status: status,
      },
    });
    return result;
  }
}

// @Injectable()
// export class TodoService {
//   // 今回はDBと接続しないのでメモリ上にTodoを保存します。
//   // TODO : DBと接続するように修正
//   private todos: Todo[] = [
//     {
//       id: '1',
//       title: 'title1',
//       description: 'description1',
//       status: TodoStatus.TODO,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     },
//   ];

//   // 全件取得のメソッド
//   findAll(): Todo[] {
//     return this.todos;
//   }
//   // idを元に一件取得のメソッド
//   findOneById(id: string): Todo {
//     const result = this.todos.find((todo) => id === todo.id);
//     if (!result) {
//       // なかったら404エラーを返す。ビルトインのエラーも豊富にあってエラー処理も結構楽
//       // https://docs.nestjs.com/exception-filters#built-in-http-exceptions
//       throw new NotFoundException();
//     }
//     return result;
//   }
// }
