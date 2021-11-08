import {Octokit} from '@octokit/rest'
import {keys} from '@arcath/utils/lib/functions/keys'
import {isBefore, subYears} from 'date-fns'

import {Section} from '../lib/readme'

const REPO_PUSH_CUTOFF_YEARS = 3

export const languagesContent = async (section: Section) => {
  console.log('🏳️ Language Analysis')
  const octokit = new Octokit()

  const repos = await octokit.request('GET /users/{username}/repos', {
    username: 'arcath',
    per_page: 200
  })

  console.log(`Analyzing ${repos.data.length} Repos`)

  const languagesWithCounts = repos.data.reduce<Record<string, number>>(
    (languages, repo) => {
      if (
        !repo.language ||
        (repo.pushed_at &&
          isBefore(
            new Date(repo.pushed_at),
            subYears(new Date(), REPO_PUSH_CUTOFF_YEARS)
          ))
      ) {
        console.log(`skipping ${repo.name}`)

        return languages
      }

      if (!languages[repo.language]) {
        languages[repo.language] = 0
      }

      languages[repo.language] += 1

      return languages
    },
    {}
  )

  const languages = keys(languagesWithCounts)
    .sort((a, b) => {
      return languagesWithCounts[a] - languagesWithCounts[b]
    })
    .reverse()

  const total = languages.reduce((count, lang) => {
    return count + languagesWithCounts[lang]
  }, 0)

  section.content = `<h3>Languages used in the last ${REPO_PUSH_CUTOFF_YEARS} years</h3>
<table>
<tbody>
${languages
  .map(lang => {
    return `<tr><td>${lang}</td><td>${
      Math.round((languagesWithCounts[lang] / total) * 10000) / 100
    }%</td></tr>`
  })
  .join('')}
</tbody>
</table>`
}
