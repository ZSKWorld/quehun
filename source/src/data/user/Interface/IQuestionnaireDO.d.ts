declare namespace DO {
	interface IQuestionnaireDO {
		fetchQuestionnaire(): Promise<any>;
		getBrief(type: EQuestionnaireType): IQuestionnaireBrief;
	}
}