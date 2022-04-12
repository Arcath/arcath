var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getReadme, writeReadme } from './lib/readme.js';
import { languagesContent } from './scripts/languages.js';
import { statsContent } from './scripts/stats.js';
import { siteContent } from './scripts/website.js';
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const readme = yield getReadme();
    yield statsContent(readme.sections['STATS']);
    yield siteContent(readme.sections['SITE']);
    yield languagesContent(readme.sections['LANGUAGES']);
    yield writeReadme(readme);
});
main();
