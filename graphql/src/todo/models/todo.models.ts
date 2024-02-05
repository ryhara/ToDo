import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';

export const TODO = 0;
export const IN_PROGRESS = 1;
export const COMPLETE = 2;

// ObjectTypeデコレータを使用することで、定義したmodelを元にschemaが自動生成される
@ObjectType()
export class Todo {
  // schame上、ID型にしたいため、ReturnTypeFuncを引数に与える
  // ReturnTypeFuncを引数に与えない場合、idの型はString型になる
  @Field((type) => ID)
  id: string;

  // ここはString型で良いのでReturnTypeFuncを引数に与えない
  @Field()
  title: string;

  // nullを許容するためオプションを指定
  // オプションを指定しない限り、nullは許容されない（String!型になる）
  @Field({ nullable: true })
  description: string;

  // GraphQLに存在しない型(TodoStatus)を指定する場合は、ReturnTypeFuncを引数に与える
  @Field()
  status: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}