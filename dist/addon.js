"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stremio_addon_sdk_1 = require("stremio-addon-sdk");
const manifest_1 = __importDefault(require("./manifest"));
const constants_1 = require("./constants");
const utils_1 = require("./utils");
const consumet_api_1 = __importDefault(require("./consumet_api"));
const builder = new stremio_addon_sdk_1.addonBuilder(manifest_1.default);
const consumetApi = new consumet_api_1.default();
builder.defineCatalogHandler(async ({ id, extra }) => {
    if (constants_1.IS_DEV) {
        console.log(id, extra);
    }
    const [, contentType, provider] = id.split('-');
    let metas = [];
    const searchResults = await consumetApi.search(contentType, provider, extra.search);
    metas = (searchResults ?? []).map((searchResult) => ({
        id: `${constants_1.ADDON_ID}:${contentType}:${provider}:${searchResult.id}`,
        name: searchResult.title.toString(),
        type: 'series',
        poster: searchResult.image,
        posterShape: 'regular',
    }));
    return { metas };
});
builder.defineMetaHandler(async ({ id, type }) => {
    if (constants_1.IS_DEV) {
        console.log(id, type);
    }
    const [, contentType, provider, consumetId] = id.split(':');
    let meta = null;
    const info = await consumetApi.getInfo(contentType, provider, consumetId);
    if (info != null) {
        meta = {
            id: `${constants_1.ADDON_ID}:${contentType}:${provider}:${info.id}`,
            name: info.title.toString(),
            type,
            background: info.cover,
            logo: info.image,
            country: info.countryOfOrigin,
            description: info.description,
            genres: info.genres,
            imdbRating: info.rating?.toString(),
            released: info.releaseDate
                ? new Date(info.releaseDate).toISOString()
                : undefined,
            releaseInfo: info.startDate || info.endDate
                ? `${info.startDate ? (0, utils_1.formatFuzzyDate)(info.startDate) : ''} - ${info.endDate ? (0, utils_1.formatFuzzyDate)(info.endDate) : ''}`
                : undefined,
            website: info.url,
            runtime: info.status,
            videos: info.episodes?.map((episode) => ({
                id: `${constants_1.ADDON_ID}:${contentType}:${provider}:${episode.id}`,
                released: new Date(episode.releaseDate || info.releaseDate || 1970).toISOString(),
                title: episode.title?.toString() || `Episode ${episode.number}`,
                episode: episode.number,
                overview: episode.description,
                season: 1,
            })),
        };
    }
    return { meta };
});
builder.defineStreamHandler(async ({ id, type }) => {
    if (constants_1.IS_DEV) {
        console.log(id, type);
    }
    const [, contentType, provider, episodeId] = id.split(':');
    let streams = [];
    const source = await consumetApi.getEpisodeSources(contentType, provider, episodeId);
    console.log(source);
    streams = (source?.sources ?? []).map((s) => ({
        name: s.quality ?? 'Unknown',
        title: s.quality ?? 'Unknown',
        subtitles: source?.subtitles,
        url: s.url,
        behaviorHints: {
            headers: source?.headers,
        },
    }));
    return { streams };
});
exports.default = builder.getInterface();
