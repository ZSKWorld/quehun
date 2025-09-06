module net {
    
    export class NotifyHandler { // 为了减少旧代码的改动，用这个替代Laya.EventDispatcher

        private handlers: { [key: string]: Laya.Handler[] } = {};

        public addHandler(eventType: string, handler: Laya.Handler): void {
            if (!this.handlers[eventType]) {
                this.handlers[eventType] = [];
            }
            this.handlers[eventType].push(handler);
        }

        public removeHandler(eventType: string, handler: Laya.Handler): void {
            if (this.handlers[eventType]) {
                this.handlers[eventType] = this.handlers[eventType].filter(h => h !== handler);
                if (this.handlers[eventType].length === 0) {
                    delete this.handlers[eventType];
                }
            }
        }

        public dispatch(eventType: string, args: any): void {
            if (this.handlers[eventType]) {
                this.handlers[eventType].forEach(handler => handler.runWith(args));
            }
        }

        public clear(): void {
            this.handlers = {};
        }

        public hasHandler(eventType: string): boolean {
            return !!this.handlers[eventType];
        }
    }
}