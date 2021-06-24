import fs from 'fs'
import path from 'path'
import {keys} from '@arcath/utils'

const {readFile, writeFile} = fs.promises

export const README_PATH = path.join(process.cwd(), 'README.md')

interface Readme {
  contents: string
  sections: Record<string, Section>
}

export interface Section {
  content: string
}

export const getReadme = async (): Promise<Readme> => {
  const contents = (await readFile(README_PATH)).toString()

  const sections: Record<string, {content: string}> = {}

  const matches = contents.matchAll(
    /<!-- START ([A-Z]*) -->(.*?)<!-- END ([A-Z]*) -->/gs
  )

  let m = matches.next()
  while (!m.done) {
    sections[m.value[1]] = {content: m.value[2]}

    m = matches.next()
  }

  return {
    contents,
    sections
  }
}

export const writeReadme = async (readme: Readme) => {
  let content = readme.contents

  keys(readme.sections).forEach(section => {
    const regex = new RegExp(
      `<!-- START ${section} -->.*?<!-- END ${section} -->`,
      'gs'
    )

    content = content.replace(
      regex,
      `<!-- START ${section} -->
${readme.sections[section].content}
<!-- END ${section} -->`.trim()
    )
  })

  await writeFile(README_PATH, content)
}
