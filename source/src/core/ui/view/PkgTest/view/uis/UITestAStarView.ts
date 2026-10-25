import UITestAStar from "../../../../ui/PkgTest/UITestAStar";

const BoundX = 0, BoundY = 40;
const BoundW = 1500, BoundH = 1000;

const enum ECellType {
	/** 空地 */
	Empty = 0,
	/** 障碍 */
	Wall = 1,
	/** 起点 */
	Start = 2,
	/** 终点 */
	End = 3,
	/** 线路 */
	Path = 4,
	Open = 5,
	Closed = 6,
}

class AStarNode {
	point: Laya.Point;
	g: number;
	h: number;
	f: number;
	parent: AStarNode;
	readonly key: string;

	constructor(point: Laya.Point, g: number, h: number, parent: AStarNode) {
		this.point = point;
		this.g = g;
		this.h = h;
		this.f = g + h;
		this.parent = parent;
		this.key = `${ point.x },${ point.y }`;
	}
};

export class UITestAStarView extends UITestAStar {
	private _cells: ECellType[][] = [];
	private _boundRect: Laya.Rectangle;
	private _startPoint = new Laya.Point();
	private _endPoint = new Laya.Point();
	private _initingPoint = false;
	private get initingPoint() { return this._initingPoint; }
	private set initingPoint(v) {
		if (v == this._initingPoint) return;
		this._initingPoint = v;
		this.ctrl_state.selectedIndex = v ? 1 : 0;
	}

	override onCreate() {
		const { btn_close, graph_cell, slider_cellSize, slider_obsPercent, btn_resetObs, btn_setPoint } = this;
		btn_close.onClick(this, this.closeSelf);
		graph_cell.onClick(this, this.onGraphCellClick);
		graph_cell.on(Laya.Event.RIGHT_CLICK, this, this.onGraphCellRightClick);

		const onCellSizeChanged = () => {
			this.calAndDrawMap();
			this.resetObs();
			this.drawAllCells();
		};
		slider_cellSize.on(fgui.Events.STATE_CHANGED, this, onCellSizeChanged);

		const onObsChanged = () => {
			this.resetObs();
			this.drawAllCells();
		};
		btn_resetObs.onClick(this, onObsChanged);
		slider_obsPercent.on(fgui.Events.STATE_CHANGED, this, onObsChanged);
		btn_setPoint.onClick(this, this.onBtnSetPointClick);

		this._boundRect = new Laya.Rectangle(BoundX, BoundY, BoundW, BoundH);
	}

	protected override onEnable() {
		const { slider_cellSize, slider_obsPercent } = this;
		this.initingPoint = false;
		slider_cellSize.min = 20;
		slider_cellSize.max = 50;
		slider_cellSize.value = 20;

		slider_obsPercent.min = 0;
		slider_obsPercent.max = 100;
		slider_obsPercent.value = 20;
		slider_cellSize.event(fgui.Events.STATE_CHANGED);
	}

	private calAndDrawMap() {
		const { _cells, slider_cellSize, graph_map } = this;
		const cellSize = slider_cellSize.value;
		const graphic = graph_map.displayObject.graphics;

		graphic.clear();
		graphic.drawRect(0, 0, Laya.stage.width, Laya.stage.height, EColorString._ffffff, null, 0);
		graphic.drawRect(BoundX, BoundY, BoundW, BoundH, EColorString._66ccff, null, 0);

		const cellXCnt = Math.floor(BoundW / cellSize);
		const cellYCnt = Math.floor(BoundH / cellSize);

		_cells.length = cellYCnt;

		//行
		for (let i = 0; i <= cellYCnt; i++) {
			if (i < cellYCnt) {
				_cells[i] = _cells[i] || [];
				_cells[i].length = cellXCnt;
				_cells[i].fill(ECellType.Empty);
			}
			const y = i * cellSize;
			graphic.drawLine(0 + BoundX, y + BoundY, BoundW + BoundX, y + BoundY, EColorString._000000, 1);
		}

		//列
		for (let i = 0; i <= cellXCnt; i++) {
			const x = i * cellSize;
			graphic.drawLine(x + BoundX, 0 + BoundY, x + BoundX, BoundH + BoundY, EColorString._000000, 1);
		}
	}

	private resetObs() {
		const { _cells, slider_obsPercent } = this;
		const obsPercent = slider_obsPercent.value / 100;
		for (let i = 0, cntx = _cells.length; i < cntx; i++) {
			const cellX = _cells[i];
			for (let j = 0, cntj = cellX.length; j < cntj; j++) {
				cellX[j] = Math.random() < obsPercent ? ECellType.Wall : ECellType.Empty;
			}
		}
	}

	private drawAllCells() {
		const { _cells, graph_cell, slider_cellSize } = this;
		const graphic = graph_cell.displayObject.graphics;
		graphic.clear();
		graphic.drawRect(BoundX, BoundY, BoundW, BoundH, EColorString._00000000, null, 0);

		const cellSize = slider_cellSize.value;
		for (let i = 0, cntx = _cells.length; i < cntx; i++) {
			const cellX = _cells[i];
			for (let j = 0, cntj = cellX.length; j < cntj; j++) {
				this.drawOneCell(i, j, null, graphic, cellSize);
			}
		}
	}

	private drawOneCell(row: number, col: number, cellType?: ECellType, graphic?: Laya.Graphics, cellSize?: number) {
		if (!this._cells[row] || this._cells[row][col] == null) return;
		cellSize = cellSize ?? this.slider_cellSize.value;
		const x = col * cellSize + BoundX + 1, y = row * cellSize + BoundY + 1;
		cellType = cellType ?? this._cells[row][col];
		let color: EColorString;
		switch (cellType) {
			case ECellType.Empty: color = EColorString._66ccff; break;
			case ECellType.Wall: color = EColorString._ff0000; break;
			case ECellType.Start: color = EColorString._ffc900; break;
			case ECellType.End: color = EColorString._00ff00; break;
			case ECellType.Path: color = EColorString._000080; break;
			case ECellType.Open: color = EColorString._a9d94d; break;
			case ECellType.Closed: color = EColorString._8c8c8c; break;
		}
		graphic = graphic ?? this.graph_cell.displayObject.graphics;
		graphic.drawRect(x, y, cellSize - 1, cellSize - 1, color, null, 0);
	}

	private onGraphCellClick(e: Laya.Event) {
		const cellSize = this.slider_cellSize.value;
		const y = Math.floor((e.stageX - BoundX) / cellSize), x = Math.floor((e.stageY - BoundY) / cellSize);
		const _cells = this._cells;
		if (!_cells[x] || _cells[x][y] === undefined) return;
		if (this.initingPoint) {
			if (_cells[x][y] === ECellType.Empty) {
				if (this._startPoint.x === -1) {
					this._startPoint.setTo(x, y);
					_cells[x][y] = ECellType.Start;
					this.drawOneCell(x, y);
				} else if (this._endPoint.x === -1) {
					this._endPoint.setTo(x, y);
					_cells[x][y] = ECellType.End;
					this.initingPoint = false;
					this.drawOneCell(x, y);
				}

			}
		} else {
			if (_cells[x][y] === ECellType.Empty || _cells[x][y] === ECellType.Wall) {
				_cells[x][y] = _cells[x][y] === ECellType.Empty ? ECellType.Wall : ECellType.Empty;
				this.drawOneCell(x, y);
			}
		}
	}

	private async onGraphCellRightClick() {
		if (this.initingPoint) {
			if (this._endPoint.x != -1) {
				this._cells[this._endPoint.x][this._endPoint.y] = ECellType.Empty;
				this.drawOneCell(this._endPoint.x, this._endPoint.y);
				this._endPoint.setTo(-1, -1);
			} else if (this._startPoint.x != -1) {
				this._cells[this._startPoint.x][this._startPoint.y] = ECellType.Empty;
				this.drawOneCell(this._startPoint.x, this._startPoint.y);
				this._startPoint.setTo(-1, -1);
			} else {
				this.initingPoint = false;
			}
		} else {
			await this.aStartFindPath();
			if (this._pathList.length > 0) {
				for (let i = 0; i < this._pathList.length; i++) {
					if (i == 0 || i == this._pathList.length - 1) continue;
					const v = this._pathList[i];
					this.drawOneCell(v.x, v.y, ECellType.Path);
					await $timeUtil.waitFrame(0);

				}
			} else {
				$logger.error("找不到路径");
			}
		}
	}

	private onBtnSetPointClick() {
		this.initingPoint = !this.initingPoint;
		if (this.initingPoint) {
			this.clearPathList();
			if (this._startPoint.x != -1) {
				this._cells[this._startPoint.x][this._startPoint.y] = ECellType.Empty;
				this.drawOneCell(this._startPoint.x, this._startPoint.y);
			}
			if (this._endPoint.x != -1) {
				this._cells[this._endPoint.x][this._endPoint.y] = ECellType.Empty;
				this.drawOneCell(this._endPoint.x, this._endPoint.y);
			}
			this._startPoint.setTo(-1, -1);
			this._endPoint.setTo(-1, -1);
		}
	}

	private _pathList: Laya.Point[] = [];
	private async aStartFindPath() {
		const { _cells, _startPoint, _endPoint, _pathList } = this;
		const rows = _cells.length;
		const cols = _cells[0].length;
		this.clearPathList();

		const heuristic = (a: Laya.Point, b: Laya.Point): number => {
			// return Math.abs(a.x - b.x) + Math.abs(a.y - b.y); // 曼哈顿距离
			return a.distance(b.x, b.y);// 欧几里得距离
		};

		const open: AStarNode[] = [];
		const openMap = new Map<string, AStarNode>();	// 快速查找开放列表里的节点
		const closed = new Map<string, AStarNode>();

		const startNode = new AStarNode(_startPoint, 0, heuristic(_startPoint, _endPoint), null);
		open.push(startNode);
		openMap.set(startNode.key, startNode);

		const dirs = [
			// [-1,-1], [0,-1], [1,-1],
			// [-1,0], [1,0],
			// [-1,1], [0,1], [1,1],
			[1, 0], [-1, 0], [0, 1], [0, -1],
		];
		function checkArraySorted(arr: AStarNode[]) {
			for (let i = 1; i < arr.length; i++)
				if (arr[i].f < arr[i - 1].f) return false;
			return true;
		}

		while (open.length > 0) {
			const current = open.shift();
			openMap.delete(current.key);
			// closed.add(current.key);
			closed.set(current.key, current);

			// 到达终点，回溯路径
			if (current.point.x === _endPoint.x && current.point.y === _endPoint.y) {
				const path = _pathList;
				let node = current;
				while (node) {
					path.push(node.point);
					node = node.parent;
				}
				return path.reverse();
			}

			for (const [dx, dy] of dirs) {
				const nx = current.point.x + dx;
				const ny = current.point.y + dy;

				// 越界或障碍
				if (nx < 0 || nx >= rows || ny < 0 || ny >= cols) continue;
				if (_cells[nx][ny] === 1) continue;

				const neighborKey = `${ nx },${ ny }`;
				if (closed.has(neighborKey)) continue;

				const tentativeG = current.g + 1; // 每步代价 1
				const existing = openMap.get(neighborKey);

				if (!existing) {
					const p = new Laya.Point(nx, ny);
					const h = heuristic(p, _endPoint);
					const neighbor = new AStarNode(p, tentativeG, h, current);
					if (open.length == 0 || neighbor.f > open.last.f) open.push(neighbor);
					else {
						let aaa = false;
						for (let i = 0; i < open.length; i++) {
							if (neighbor.f <= open[i].f) {
								open.splice(i, 0, neighbor);
								aaa = true;
								break;
							}
						}
						if (!aaa) $logger.error("error");
					}
					if (!checkArraySorted(open))
						$logger.error("open not sorted");
					openMap.set(neighborKey, neighbor);
				} else if (tentativeG < existing.g) {
					// 找到更优路径，更新
					existing.g = tentativeG;
					existing.f = tentativeG + existing.h;
					existing.parent = current;
					open.sort((a, b) => a.f - b.f);
				}
			}
		}

		return null; // 无路径
	}

	private clearPathList() {
		this._pathList.forEach(v => this.drawOneCell(v.x, v.y));
		this._pathList.clear();
	}

}
