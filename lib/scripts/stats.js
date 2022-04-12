var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Octokit } from '@octokit/rest';
export const statsContent = (section) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('🧾 Github Stats');
    const stats = ['<ul>'];
    const octokit = new Octokit();
    const user = yield octokit.rest.users.getByUsername({ username: 'Arcath' });
    stats.push(`<li>📘 ${user.data.public_repos} Public Repositories</li>`);
    stats.push(`<li>👀 ${user.data.following} Following</li>`);
    stats.push(`<li>👓 ${user.data.followers} Followers</li>`);
    stats.push('</ul>');
    section.content = stats.join('\r\n');
});
