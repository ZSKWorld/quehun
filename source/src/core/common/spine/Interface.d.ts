declare interface ISpineIllustInfo1 {
	x: number;
	y: number;
}

declare interface ISpineIllustInfo2 {
	w: number;
	h: number;
}

declare interface ISpineIllustInfo3 {
	scaleX: number;
	scaleY: number;
}

declare interface ISpineIllustInfo4 extends ISpineIllustInfo1, ISpineIllustInfo2 { }

declare interface ISpineIllustInfo5 extends ISpineIllustInfo1 {
	scale: number;
	reverse: number;
}

declare interface ISpineIllustInfo6 extends ISpineIllustInfo5 {
	offset: ISpineIllustInfo1 & ISpineIllustInfo3;
}

declare interface ISpineIllustDefaultData extends ISpineIllustInfo4 {
	[ESpineLayout.A0]: ISpineIllustInfo6[];
	[ESpineLayout.B0]: ISpineIllustInfo6[];
	[ESpineLayout.B1]: ISpineIllustInfo6[];
	[ESpineLayout.B2]: ISpineIllustInfo6[];
	[ESpineLayout.B3]: ISpineIllustInfo6[];
	[ESpineLayout.C0]: ISpineIllustInfo6[];
	[ESpineLayout.D0]: ISpineIllustInfo6[];
	[ESpineLayout.E0]: ISpineIllustInfo6[];
	[ESpineLayout.F0]: ISpineIllustInfo6[];
	[ESpineLayout.F1]: ISpineIllustInfo6[];
	[ESpineLayout.F2]: ISpineIllustInfo6[];
	[ESpineLayout.G0]: Omit<ISpineIllustInfo6, "offset">[];
	[ESpineLayout.H0]: Omit<ISpineIllustInfo6, "offset">[];
	[ESpineLayout.I0]: ISpineIllustInfo6[];
	[ESpineLayout.J0]: ISpineIllustInfo6[];
	[ESpineLayout.K0]: ISpineIllustInfo6[];
	[ESpineLayout.L0]: ISpineIllustInfo6[];
	[ESpineLayout.Spot]: Omit<ISpineIllustInfo6, "x" | "reverse">;
	[ESpineLayout.Treasure_Single_Small]: ISpineIllustInfo6;
	[ESpineLayout.Treasure_Single_Big]: ISpineIllustInfo6;
	[ESpineLayout.Treasure_Double_L_Small]: ISpineIllustInfo6;
	[ESpineLayout.Treasure_Double_L_Big]: ISpineIllustInfo6;
	[ESpineLayout.Treasure_Double_R_Small]: ISpineIllustInfo6;
	[ESpineLayout.Treasure_Double_R_Big]: ISpineIllustInfo6;
}

declare interface ISpineIllustSkinData extends ISpineIllustInfo2 {
	center: number;
	head: ISpineIllustInfo4;
	treasure_layer: number;
	treasure?: {
		layer: number;
		single:{small: ISpineIllustInfo5, big: ISpineIllustInfo5};
		double_l:{small: ISpineIllustInfo5, big: ISpineIllustInfo5};
		double_r:{small: ISpineIllustInfo5, big: ISpineIllustInfo5};
	};
	[ESpineLayout.A0]: ISpineIllustInfo6[];
	[ESpineLayout.B0]: ISpineIllustInfo6[];
	[ESpineLayout.B1]: ISpineIllustInfo6[];
	[ESpineLayout.B2]: ISpineIllustInfo6[];
	[ESpineLayout.B3]: ISpineIllustInfo6[];
	[ESpineLayout.C0]: ISpineIllustInfo6[];
	[ESpineLayout.D0]: ISpineIllustInfo6[];
	[ESpineLayout.E0]: ISpineIllustInfo6[];
	[ESpineLayout.F0]: ISpineIllustInfo6[];
	[ESpineLayout.F1]: ISpineIllustInfo6[];
	[ESpineLayout.F2]: ISpineIllustInfo6[];
	[ESpineLayout.G0]: ISpineIllustInfo6[];
	[ESpineLayout.H0]: ISpineIllustInfo6[];
	[ESpineLayout.I0]: ISpineIllustInfo6[];
	[ESpineLayout.J0]: ISpineIllustInfo6[];
	[ESpineLayout.K0]: ISpineIllustInfo6[];
	[ESpineLayout.L0]: ISpineIllustInfo6[];
	[ESpineLayout.Spot]: Omit<ISpineIllustInfo5, "x" | "reverse">;
	[ESpineLayout.Treasure_Single_Small]: ISpineIllustInfo6;
	[ESpineLayout.Treasure_Single_Big]: ISpineIllustInfo6;
	[ESpineLayout.Treasure_Double_L_Small]: ISpineIllustInfo6;
	[ESpineLayout.Treasure_Double_L_Big]: ISpineIllustInfo6;
	[ESpineLayout.Treasure_Double_R_Small]: ISpineIllustInfo6;
	[ESpineLayout.Treasure_Double_R_Big]: ISpineIllustInfo6;
}