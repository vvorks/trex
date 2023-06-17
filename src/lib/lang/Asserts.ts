import { ParamError, StateError, LogicalError } from "./Errors";

export class Asserts {
  public static require(cond: boolean, message?: string): asserts cond {
    if (!cond) {
      throw new ParamError(message);
    }
  }

  public static assume(cond: boolean, message?: string): asserts cond {
    if (!cond) {
      throw new StateError(message);
    }
  }

  public static ensure(cond: boolean, message?: string): asserts cond {
    if (!cond) {
      throw new LogicalError(message);
    }
  }
}
