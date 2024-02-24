"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAmimeEpisodeSource = exports.getAmimeInfo = exports.searchAnime = exports.animeProviders = void 0;
const extensions_1 = require("@consumet/extensions");
// TODO: use these providers from the lib as fallback when consumet API is down?
exports.animeProviders = [
    ...[
        extensions_1.ANIME.AnimeFox,
        extensions_1.ANIME.AnimePahe,
        // ANIME.Bilibili,
        // ANIME.Gogoanime,
        extensions_1.ANIME.Marin,
        // ANIME.NineAnime,
        // ANIME.Zoro,
    ].map((provider) => new provider()),
    // TODO: configure these providers
    new extensions_1.ANIME.Bilibili(),
    new extensions_1.ANIME.Gogoanime(),
    new extensions_1.ANIME.NineAnime(),
    new extensions_1.ANIME.Zoro(),
];
function findProvider(name) {
    const provider = exports.animeProviders.find((provider) => provider.name === name);
    if (!provider) {
        throw new Error(`Failed to find provider '${name}'`);
    }
    return provider;
}
async function searchAnime(providerName, query) {
    const provider = findProvider(providerName);
    const { results } = await provider.search(query);
    return results;
}
exports.searchAnime = searchAnime;
async function getAmimeInfo(providerName, id) {
    const provider = findProvider(providerName);
    return provider.fetchAnimeInfo(id);
}
exports.getAmimeInfo = getAmimeInfo;
async function getAmimeEpisodeSource(providerName, episodeId) {
    const provider = findProvider(providerName);
    return provider.fetchEpisodeSources(episodeId);
}
exports.getAmimeEpisodeSource = getAmimeEpisodeSource;
