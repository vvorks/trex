export type Value = string | number;
export type OptionalValue = Value | undefined;
export type HasId = { id: Value };
export type Render<T extends HasId> = (arg: T) => React.ReactNode;
