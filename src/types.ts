export enum Distance {
  Far = 3,
  Middle = 2,
  Near = 1
}

export enum Move {
  Left = -1,
  Center = 0,
  Right = 1
}

export type Maybe<T> = NonNullable<T> | undefined;

export interface Message {
  id: string;
  text: string;
  color?: string;
}