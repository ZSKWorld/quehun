export abstract class Notifier implements INotifier {
    dispatch(eventName: string, data?: any) {
        facade.dispatch(eventName, data);
    }
}
