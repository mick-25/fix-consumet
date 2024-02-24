"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieProvider = exports.AnimeProvider = void 0;
const phin_1 = __importDefault(require("phin"));
const { name, version } = require('../package.json');
const constants_1 = require("./constants");
var AnimeProvider;
(function (AnimeProvider) {
    AnimeProvider["NineAnime"] = "9anime";
    AnimeProvider["AnimeFox"] = "animefox";
    AnimeProvider["Animepahe"] = "animepahe";
    AnimeProvider["Enime"] = "enime";
    AnimeProvider["GogoAmime"] = "gogoanime";
    AnimeProvider["Zoro"] = "zoro";
})(AnimeProvider || (exports.AnimeProvider = AnimeProvider = {}));
var MovieProvider;
(function (MovieProvider) {
    MovieProvider["Dramacool"] = "dramacool";
    MovieProvider["FlixHQ"] = "flixhq";
    MovieProvider["ViewAsian"] = "viewasian";
})(MovieProvider || (exports.MovieProvider = MovieProvider = {}));
const oldApiProviders = [
    AnimeProvider.AnimeFox,
    AnimeProvider.Enime,
    AnimeProvider.Zoro,
];
class ConsumetApi {
    url = 'https://kiss-ecru.vercel.app';
    async send(type, provider, path) {
        const url = `${this.url}/${type}/${provider}/${path}`;
        const res = await (0, phin_1.default)({
            url,
            method: 'GET',
            timeout: 60000,
            headers: {
                'User-Agent': `${name} v${version}${constants_1.IS_DEV ? ' (development build)' : ''}`,
            },
        });
        if (res.statusCode !== 200) {
            console.error('failed to fetch API results', {
                url,
                statusCode: res.statusCode,
                body: res.body.toString(),
            });
            return null;
        }
        const json = JSON.parse(res.body.toString());
        return json;
    }
    async search(type, provider, query, page) {
        const json = await this.send(type, provider, `${query}${page ? `?page=${page}` : ''}`);
        return json?.results;
    }
    async getInfo(type, provider, id) {
        // I have no idea why this API is so inconsistent ¯\_(ツ)_/¯
        const path = oldApiProviders.includes(provider) || type === 'movies'
            ? `info?id=${id}`
            : `info/${id}`;
        return this.send(type, provider, path);
    }
    async getEpisodeSources(type, provider, id) {
        // I have no idea why this API and the docs are so inconsistent ¯\_(ツ)_/¯
        const path = oldApiProviders.includes(provider) || type === 'movies'
            ? `watch?episodeId=${id}`
            : `watch/${id}`;
        return this.send(type, provider, path);
    }
}
exports.default = ConsumetApi;
