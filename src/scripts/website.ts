import {fetchJson} from 'fetch-json'

import {Section} from '../lib/readme'

const IMPORT_URL = 'https://www.alaycock.co.uk/api/posts/all?limit=5'

interface Entry {
  title: string
  uri: string
  lead: string
  date: string
}

export const siteContent = async (section: Section) => {
  console.log('📰 Blog Posts')

  const data: Entry[] = await fetchJson.get(IMPORT_URL)

  const content = data
    .slice(0, 4)
    .map(entry => {
      return `<li><a href="https://www.alaycock.co.uk${entry.uri}">${entry.title}</a></li>`
    })
    .join('\r\n')

  section.content = `<ul>${content}</ul>`
}
