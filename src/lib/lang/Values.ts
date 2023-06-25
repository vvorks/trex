export class Values {
  public static getValue<T>(x: T | undefined | null, d: T): T {
    return x !== undefined && x !== null ? x : d;
  }
}
