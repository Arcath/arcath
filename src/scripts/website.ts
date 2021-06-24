import {fetchJson} from 'fetch-json'

import {Section} from '../lib/readme'

const IMPORT_URL = 'https://www.arcath.net/_data/posts/0.json'

interface Entry {
  title: string
  href: string
  year: string
  month: string
  day: string
  lead: string
  date: string
}

export const siteContent = async (section: Section) => {
  const data: Entry[] = JSON.parse((await fetchJson.get(IMPORT_URL)).bodyText)

  const content = data
    .map(entry => {
      return `<li><a href="https://www.arcath.net${entry.href}">${entry.title}</a></li>`
    })
    .join('\r\n')

  section.content = `<ul>${content}</ul>`
}
