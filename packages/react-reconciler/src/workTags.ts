export type WorkTag =
	| typeof FunctionComponent
	| typeof HostRoot
	| typeof HostComponent
	| typeof HostText;

export const FunctionComponent = 0;
//挂载的根结点
export const HostRoot = 3;
// <div/>的类型对应Host Component
export const HostComponent = 5;
// <div>123</div>其中123 对应Host Text
export const HostText = 6;
