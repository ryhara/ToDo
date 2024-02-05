import { Args, ID, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Todo, TodoInfo } from './models/todo.models';
import { TodoService } from './todo.service';

// Resolverデコレータでresolverを定義
// https://docs.nestjs.com/graphql/resolvers#code-first-resolver
@Resolver()
export class TodoResolver {
  constructor(private todoService: TodoService) {}
  // QueryデコレータでQueryを定義
  // 第一引数にReturnTypeFuncを指定し、型を定義。ここではTodoの配列を指定。
  // 第二引数にオプションとして{ nullable: 'items' }を与えることで空配列を許容する。[Todo]!と同義。
  // デフォルトでは [Todo!]! になる。
  @Query(() => [TodoInfo], { nullable: 'items', name: 'findAll'})
  findAll() : Promise<TodoInfo[]> {
    return this.todoService.findAll();
  }

  @Query(() => Todo, { nullable: true , name: 'findOneById'})
  // Queryに引数がある場合はArgsデコレータで定義。
  // 第一引数に引数の名前、第二引数に型を指定。
  // schema上の型定義は findOneById(id: ID!): Todo! となる
  findOneById(@Args('id', { type: () => ID }) id: string) : Promise<TodoInfo> {
    return this.todoService.findOneById(id);
  }

  // statusを元にTodoを取得
  @Query(() => [TodoInfo] , { nullable: 'items', name: 'findTodoByStatus' })
  findTodoByStatus(@Args('status', { type: () => Int }) status: number) : Promise<TodoInfo[]> {
    return this.todoService.findTodoByStatus(status);
  }

  // Todoの追加
  @Mutation(() => Todo)
  addTodo(
    @Args('title') title: string,
    @Args('description', { nullable: true }) description: string,
  ) {
    return this.todoService.addTodo(title, description);
  }

  // Todoの削除
  @Mutation(() => Todo)
  deleteTodo(@Args('id', { type: () => ID }) id: string) {
    return this.todoService.deleteTodo(id);
  }

  // Todoの更新
  @Mutation(() => Todo)
  updateTodo(
    @Args('id', { type: () => ID }) id: string,
    @Args('title') title: string,
    @Args('description', { nullable: true }) description: string,
    @Args('status', { nullable: true }) status: number,
  ) {
    return this.todoService.updateTodo(id, title, description, status);
  }
}
