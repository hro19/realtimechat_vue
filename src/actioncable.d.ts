declare module "actioncable" {
  export interface Cable {
    subscribe(channel: string): Channel;
  }

  interface Channel {
    perform(action: string, data: any): void;
    unsubscribe(): void;
  }

  export function createConsumer(url: string): Cable;
}
