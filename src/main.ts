import * as core from '@actions/core'
import fs from 'fs'
import path from 'path'
import axios from 'axios'
import shell from 'shelljs'

async function run(): Promise<void> {
  try {
    const user_id_secret = core.getInput('user_id') || 'no user id'
    const tha_no_secret = core.getInput('tha_no') || '0'

    if (fs.existsSync(path.join(process.cwd(), 'Day01'))) {
      try {
        const response = axios.get(
          `https://h3cv9k.sse.codesandbox.io/frontend_challeges?tha_no=${tha_no_secret}`
        )

        const {data} = await response

        const {test_file, tha_no, folder_name} = data.data.attributes

        shell.exec(`cd ${folder_name} && npm ci`)

        if (!fs.existsSync('src/__test__/')) {
          fs.mkdirSync(path.join(process.cwd(), folder_name, 'src/__test__/'), {
            recursive: true
          })
        }

        fs.writeFileSync(
          path.join(process.cwd(), folder_name, test_file.path),
          test_file.content
        )

        shell.exec(`cd ${folder_name} && npm run test-out`)

        fs.readFile(
          path.join(process.cwd(), folder_name, 'test-output.json'),
          (err, file: Buffer) => {
            if (err) throw err
            const test_result = JSON.parse(file.toString())

            if (test_result) {
              axios.post(
                `https://h3cv9k.sse.codesandbox.io/frontend_challeges?user_id=${user_id_secret}&tha_no=${tha_no}`,
                {
                  data: {
                    type: 'frontend_challeges',
                    attributes: {
                      tha_no,
                      user_id: user_id_secret,
                      folder_name,
                      test_result
                    }
                  }
                }
              )
            }
          }
        )
      } catch (error) {
        if (error instanceof Error) core.setFailed(error.message)
      }
    } else {
      core.info('No THA added by Devsnest ')
    }
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
