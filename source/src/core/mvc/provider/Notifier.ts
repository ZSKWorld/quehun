export abstract class Notifier implements INotifier {

    protected static dispatch(eventName: string, data?: any) {
        facade.dispatch(eventName, data);
    }

    dispatch(eventName: string, data?: any) {
        Notifier.dispatch(eventName, data);
    }
}
