import {getReadme, writeReadme} from './lib/readme'

import {statsContent} from './scripts/stats'
import {siteContent} from './scripts/website'

const main = async () => {
  const readme = await getReadme()

  await statsContent(readme.sections['STATS'])
  await siteContent(readme.sections['SITE'])

  await writeReadme(readme)
}

main()
