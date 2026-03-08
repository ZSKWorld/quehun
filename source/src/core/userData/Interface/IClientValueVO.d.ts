declare namespace VO {
	interface IClientValueVO {
		get rechargeCount(): number;
		getValue(key: EClientValueType): number;
		setValue(key: EClientValueType, value: number): void;
	}
}