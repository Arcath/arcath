import {getReadme, writeReadme} from './lib/readme.js'

import {languagesContent} from './scripts/languages.js'
import {statsContent} from './scripts/stats.js'
import {siteContent} from './scripts/website.js'

const main = async () => {
  const readme = await getReadme()

  await statsContent(readme.sections['STATS'])
  await siteContent(readme.sections['SITE'])
  await languagesContent(readme.sections['LANGUAGES'])

  await writeReadme(readme)
}

main()
