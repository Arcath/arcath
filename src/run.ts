import {getReadme, writeReadme} from './lib/readme'

import {languagesContent} from './scripts/languages'
import {statsContent} from './scripts/stats'
import {siteContent} from './scripts/website'

const main = async () => {
  const readme = await getReadme()

  await statsContent(readme.sections['STATS'])
  await siteContent(readme.sections['SITE'])
  await languagesContent(readme.sections['LANGUAGES'])

  await writeReadme(readme)
}

main()
