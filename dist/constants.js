"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IS_DEV = exports.ADDON_ID = void 0;
exports.ADDON_ID = 'consumet';
exports.IS_DEV = process.env.NODE_ENV?.startsWith('dev');
