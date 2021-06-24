import {Octokit} from '@octokit/rest'

import {Section} from '../lib/readme'

export const statsContent = async (section: Section) => {
  const stats = []

  const octokit = new Octokit()

  const user = await octokit.rest.users.getByUsername({username: 'Arcath'})

  stats.push(` - 📘 ${user.data.public_repos} Public Repositories`)
  stats.push(` - 👀 ${user.data.following} Following`)

  section.content = stats.join('\r\n')
}
