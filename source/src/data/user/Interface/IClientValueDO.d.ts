declare namespace DO {
	interface IClientValueDO {
		get rechargeCount(): number;
		getValue(key: EClientValueType): number;
		setValue(key: EClientValueType, value: number): void;
	}
}