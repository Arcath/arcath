var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { fetchJson } from 'fetch-json';
const IMPORT_URL = 'https://www.alaycock.co.uk/articles?index=&skip=0&_data=routes%2Farticles%2Findex';
export const siteContent = (section) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('📰 Blog Posts');
    const data = yield fetchJson.get(IMPORT_URL);
    const content = data.articles
        .slice(0, 4)
        .map(entry => {
        const [year, month] = entry.date.split('-');
        return `<li><a href="https://www.alaycock.co.uk/${year}/${month}/${entry.slug}">${entry.title}</a></li>`;
    })
        .join('\r\n');
    section.content = `<ul>${content}</ul>`;
});
