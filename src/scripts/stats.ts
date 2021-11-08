import {Octokit} from '@octokit/rest'

import {Section} from '../lib/readme'

export const statsContent = async (section: Section) => {
  console.log('🧾 Github Stats')

  const stats = ['<ul>']

  const octokit = new Octokit()

  const user = await octokit.rest.users.getByUsername({username: 'Arcath'})

  stats.push(`<li>📘 ${user.data.public_repos} Public Repositories</li>`)
  stats.push(`<li>👀 ${user.data.following} Following</li>`)
  stats.push(`<li>👓 ${user.data.followers} Followers</li>`)

  stats.push('</ul>')

  section.content = stats.join('\r\n')
}
