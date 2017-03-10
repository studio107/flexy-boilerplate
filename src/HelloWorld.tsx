import { Component, h } from "preact";

export interface IHelloProps {
    compiler: string;
    framework: string;
}

/*
export default (props: IHelloProps) => {
    return <h1>Hello from {props.compiler} and {props.framework}!</h1>;
};
*/

export default class HelloWorldNew extends Component<IHelloProps, any> {
    public render(props: IHelloProps) {
        return <h1>Hello from {props.compiler} and {props.framework}!</h1>;
    }
}
