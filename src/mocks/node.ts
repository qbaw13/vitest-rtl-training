import { setupServer } from "msw/node";
import { handlers } from "./node-handlers";

export const server = setupServer(...handlers);
