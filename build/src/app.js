"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const morgan_1 = __importDefault(require("morgan"));
const serve_favicon_1 = __importDefault(require("serve-favicon"));
const socket_io_1 = require("socket.io");
const prisma_1 = __importDefault(require("./database/prisma"));
dotenv_1.default.config();
const port = process.env.PORT || 9000;
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
exports.io = new socket_io_1.Server(server);
app
    .use((0, cors_1.default)({
    origin: '*',
}))
    .use(express_1.default.json())
    .use((0, morgan_1.default)('dev'));
app
    .use('/public', express_1.default.static('assets'))
    .use((0, serve_favicon_1.default)('./assets/images/favicon.ico'));
app.get('/', (req, res) => {
    res.send('it works. Done by BrightkyEfoo');
});
// Do your logic here
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Server listening on port ${port}`);
    const user = yield prisma_1.default.user.create({ data: { email: 'bright', name: 'hello', phone: 'sks,x' } });
    console.log('user', user);
}));
