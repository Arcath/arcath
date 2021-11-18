import {Octokit} from '@octokit/rest'
import {keys} from '@arcath/utils/lib/functions/keys'
import {asyncMap} from '@arcath/utils/lib/functions/async-map'
import {isBefore, subYears} from 'date-fns'
import fs from 'fs'
import path from 'path'

import {Section} from '../lib/readme'

const {writeFile} = fs.promises

const REPO_PUSH_CUTOFF_YEARS = 3

const ASSETS_PATH = path.join(process.cwd(), 'assets')
const SVG_PATH = path.join(ASSETS_PATH, 'languages.svg')

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

  const colors = [
    '#3498db',
    '#9b59b6',
    '#2ecc71',
    '#e67e22',
    '#34495e',
    '#f1c40f'
  ]

  let offset = 5

  const svg = `
  <svg version="1.1" width="500" height="10" xmlns="http://www.w3.org/2000/svg">

  <clipPath id="bar">
    <rect width="490" height="6" x="5" y="2" rx="3" />
  </clipPath>

  ${languages
    .map((lang, i) => {
      const percent =
        Math.round((languagesWithCounts[lang] / total) * 10000) / 10000
      const width = 490 * percent
      const x = offset
      offset += width

      return `<rect width="${width}" fill="${colors[i]}" height="10" x="${x}" y="0" clip-path="url(#bar)" />`
    })
    .join('\r\n')}
  </svg>
  `

  await writeFile(SVG_PATH, svg)

  await asyncMap(colors, async (color, i) => {
    const colorSVG = `<svg version="1.1" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="10" fill="${color}" />
  </svg>`

    await writeFile(path.join(ASSETS_PATH, `circle-${i}.svg`), colorSVG)
  })

  section.content = `<h3>Languages used in the last ${REPO_PUSH_CUTOFF_YEARS} years</h3>
<img src="assets/languages.svg" alt="Languages Graph" />
<table>
<tbody>
${languages
  .map((lang, i) => {
    return `<tr><td><img src="assets/circle-${i}.svg" alt="Language Color" /> ${lang}</td><td>${
      Math.round((languagesWithCounts[lang] / total) * 10000) / 100
    }%</td></tr>`
  })
  .join('')}
</tbody>
</table>`
}
