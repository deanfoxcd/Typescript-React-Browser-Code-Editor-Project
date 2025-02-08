"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serve = serve;
const express_1 = __importDefault(require("express"));
function serve(port, filename, dir) {
    const app = (0, express_1.default)();
    return new Promise((resolve, reject) => {
        const server = app.listen(port, () => {
            console.log('Server running on port', port);
            resolve();
        });
        server.on('error', (err) => reject(err));
    });
}
