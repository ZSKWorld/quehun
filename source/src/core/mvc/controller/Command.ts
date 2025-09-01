export abstract class Command implements ICommand {
    abstract execute(notifyName: string, data?: any): void;
}