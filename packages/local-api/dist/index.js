"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serve = serve;
function serve(port, filename, dir) {
    console.log('Serving traffic on port', port);
    console.log('saving/fetching cells from', filename);
    console.log('the file is in dir', dir);
}
