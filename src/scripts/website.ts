import {fetchJson} from 'fetch-json'

import {Section} from '../lib/readme'

const IMPORT_URL =
  'https://www.alaycock.co.uk/articles?index=&skip=0&_data=routes%2Farticles%2Findex'

interface Entry {
  title: string
  slug: string
  date: string
}

export const siteContent = async (section: Section) => {
  console.log('📰 Blog Posts')

  const data: {articles: Entry[]} = await fetchJson.get(IMPORT_URL)

  const content = data.articles
    .slice(0, 4)
    .map(entry => {
      const [year, month] = entry.date.split('-')

      return `<li><a href="https://www.alaycock.co.uk/${year}/${month}/${entry.slug}">${entry.title}</a></li>`
    })
    .join('\r\n')

  section.content = `<ul>${content}</ul>`
}
