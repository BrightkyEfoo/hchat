import { DefaultEventsMap, Server, Socket } from "socket.io";

export type TIoType = Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
