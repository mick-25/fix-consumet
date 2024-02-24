"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatFuzzyDate = void 0;
function formatFuzzyDate({ day, month, year, }) {
    if (day == null || month == null || year == null) {
        return undefined;
    }
    return `${year}-${month}-${day}`;
}
exports.formatFuzzyDate = formatFuzzyDate;
