import React from "react";

type Props = {
  title: string;
};

export class HomePage extends React.Component<Props, any> {
  public constructor(prop: Props) {
    super(prop);
  }

  public render(): React.ReactNode {
    return (
      <div>
        <h1>{this.props.title}</h1>
      </div>
    );
  }
}
