"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const consumet_api_1 = require("./consumet_api");
const { version, description } = require('../package.json');
const manifest = {
    id: `com.sleeyax.${constants_1.ADDON_ID}`,
    name: 'Consumet',
    version,
    description,
    logo: 'https://camo.githubusercontent.com/a36d9dc03ee8a00e06617a6b6924e54c863f327e1ab4e4d4379348f7f480b281/68747470733a2f2f636f6e73756d65742e6f72672f696d616765732f636f6e73756d65746c6f676f2e706e67',
    catalogs: [
        ...Object.values(consumet_api_1.AnimeProvider).map((provider) => ({
            id: `${constants_1.ADDON_ID}-anime-${provider}`,
            name: provider,
            type: 'series',
            extra: [
                {
                    name: 'search',
                    isRequired: true,
                },
            ],
        })),
        ...Object.values(consumet_api_1.MovieProvider).map((provider) => ({
            id: `${constants_1.ADDON_ID}-movies-${provider}`,
            name: provider,
            type: 'movie',
            extra: [
                {
                    name: 'search',
                    isRequired: true,
                },
            ],
        })),
    ],
    resources: ['catalog', 'meta', 'stream'],
    types: ['series', 'movie'],
    idPrefixes: [constants_1.ADDON_ID],
};
exports.default = manifest;
