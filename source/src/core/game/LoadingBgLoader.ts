export class LoadingBgLoader extends Singleton<LoadingBgLoader>() {
	private _cg: string;
	private _left: string;
	private _mid: string;
	private _right: string;
	private _desk: string;

	get cg() { return this._cg; }
	get left() { return this._left; }
	get mid() { return this._mid; }
	get right() { return this._right; }
	get desk() { return this._desk; }

	randomLoad() {
		const urls: string[] = [];
		const newCg = $userData.bag.getRandomCgPath();
		if (newCg) {
			if (this._cg != newCg) {
				$loadMgr.clearRes(this._cg);
				this._cg = newCg;
				urls.push(newCg);
			}
		} else {
			const left = $langRes(`myres2/loading_3que1/left_${ $mathUtil.randomInt(0, 18) }.png`);
			const mid = $langRes(`myres2/loading_3que1/mid_${ $mathUtil.randomInt(0, 18) }.png`);
			const right = $langRes(`myres2/loading_3que1/right_${ $mathUtil.randomInt(0, 19) }.png`);
			const desk = $langRes(`myres2/loading_3que1/desktop${ $mathUtil.randomInt(0, 2) }.png`);
			if (this._left != left) {
				$loadMgr.clearRes(this._left);
				this._left = left;
				urls.push(left);
			}
			if (this._mid != mid) {
				$loadMgr.clearRes(this._mid);
				this._mid = mid;
				urls.push(mid);
			}
			if (this._right != right) {
				$loadMgr.clearRes(this._right);
				this._right = right;
				urls.push(right);
			}
			if (this._desk != desk) {
				$loadMgr.clearRes(this._desk);
				this._desk = desk;
				urls.push(desk);
			}
		}
		return $loadMgr.load(urls);
	}

	clear() {
		const { _cg, _left, _mid, _right, _desk } = this;
		$loadMgr.clearRes(_cg);
		$loadMgr.clearRes(_left);
		$loadMgr.clearRes(_mid);
		$loadMgr.clearRes(_right);
		$loadMgr.clearRes(_desk);
		this._cg = this._left = this._right = this._desk = null;
	}
}