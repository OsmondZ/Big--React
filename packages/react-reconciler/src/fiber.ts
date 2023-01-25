import { Props, Key, Ref } from 'shared/ReactTypes';
import { WorkTag } from './workTags';
import { Flags, NoFlags } from './FiberFlags';
import { Container } from 'hostConfig';

export class FiberNode {
	tag: WorkTag;
	type: any;
	pendingProps: Props;
	key: Key;
	stateNode: any;
	ref: Ref;
	return: FiberNode | null;
	sibling: FiberNode | null;
	child: FiberNode | null;
	index: number;
	memoizedProps: Props | null;
	memoizedState: any;
	alterate: FiberNode | null;
	flags: Flags;
	updateQueue: unknown;

	constructor(tag: WorkTag, pendingProps: Props, key: Key) {
		// 实例属性
		this.tag = tag;
		this.key = key;
		// <div/> div DOM is stateNode
		this.stateNode = null;
		// FunctionComponent type is itself ()=>{};
		this.type = null;
		// point to parentNode 构成树状结构
		this.return = null;
		this.sibling = null;
		this.child = null;
		// <ul>
		// <li 0/>
		// <li 1/>
		// <li 2/>
		// </ul>
		this.index = 0;
		this.ref = null;
		// 作为工作单元
		// 开始工作
		this.pendingProps = pendingProps;
		// 工作结束
		this.memoizedProps = null;
		this.memoizedState = null;
		this.updateQueue = null;
		this.alterate = null;
		// 副作用
		this.flags = NoFlags;
	}
}

export class FiberRootNode {
	container: Container;
	current: FiberNode;
	finishedWork: FiberNode | null;
	constructor(container: Container, hostRootFiber: FiberNode) {
		this.container = container;
		this.current = hostRootFiber;
		hostRootFiber.stateNode = this;
		this.finishedWork = null;
	}
}

export const createWorkInProgress = (
	current: FiberNode,
	pendingProps: Props
): FiberNode => {
	let wip = current.alterate;
	if (wip === null) {
		// mount
		wip = new FiberNode(current.tag, pendingProps, current.key);

		wip.stateNode = current.stateNode;

		wip.alterate = current;
		current.alterate = wip;
	} else {
		// update
		wip.pendingProps = pendingProps;
		wip.flags = NoFlags;
	}
	wip.type = current.type;
	wip.updateQueue = current.updateQueue;
	wip.child = current.child;
	wip.memoizedProps = current.memoizedProps;
	wip.memoizedState = current.memoizedState;
	return wip;
};
