var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fs from 'fs';
import path from 'path';
import { keys } from '@arcath/utils';
const { readFile, writeFile } = fs.promises;
export const README_PATH = path.join(process.cwd(), 'README.md');
export const getReadme = () => __awaiter(void 0, void 0, void 0, function* () {
    const contents = (yield readFile(README_PATH)).toString();
    const sections = {};
    const matches = contents.matchAll(/<!-- START ([A-Z]*) -->(.*?)<!-- END ([A-Z]*) -->/gs);
    let m = matches.next();
    while (!m.done) {
        sections[m.value[1]] = { content: m.value[2] };
        m = matches.next();
    }
    return {
        contents,
        sections
    };
});
export const writeReadme = (readme) => __awaiter(void 0, void 0, void 0, function* () {
    let content = readme.contents;
    keys(readme.sections).forEach(section => {
        const regex = new RegExp(`<!-- START ${section} -->.*?<!-- END ${section} -->`, 'gs');
        content = content.replace(regex, `<!-- START ${section} -->
${readme.sections[section].content}
<!-- END ${section} -->`.trim());
    });
    yield writeFile(README_PATH, content);
});
