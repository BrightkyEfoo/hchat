import { DefaultEventsMap, Server } from "socket.io";

export type TIoType = Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
