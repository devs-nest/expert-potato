import * as core from '@actions/core'
import fs from 'fs'
import path from 'path'
import shell from 'shelljs'
import {
  fetchFrontendChallengesTestCase,
  fetchUpdateTestResult
} from './services'
import {filterJestTestResult} from './utils'

const TestFolderPath = 'src/__test__/'
const TestFileName = 'App.test.js'
const JestOutputJSONName = 'test-output.json'

async function run(): Promise<void> {
  try {
    // acces github secrets
    const user_id_secret = core.getInput('user_id') || 'no user id'
    const tha_no_secret = core.getInput('tha_no') || '0'
    const bot_token = core.getInput('bot_token') || '0'

    if (tha_no_secret) {
      try {
        // fetch test cases content
        const data = await fetchFrontendChallengesTestCase(tha_no_secret)
        const {challenge_id, content, folder_name} = data

        // folder location
        const goFolderPath = `cd ${folder_name}`

        // install dependency from package.lock.json
        shell.exec(`${goFolderPath} && npm ci`)

        // create test folder
        fs.mkdirSync(path.join(process.cwd(), folder_name, TestFolderPath), {
          recursive: true
        })

        // create test file content
        fs.writeFileSync(
          path.join(
            process.cwd(),
            folder_name,
            `${TestFolderPath}/${TestFileName}`
          ),
          content
        )

        // run jest runner
        shell.exec(`${goFolderPath} && npm run test-out`)

        // deserialize the test output json
        fs.readFile(
          path.join(process.cwd(), folder_name, JestOutputJSONName),
          async (err, file: Buffer) => {
            if (err) {
              return core.info(err.message)
            }

            const test_result = JSON.parse(file.toString())

            if (test_result) {
              const {result, total_test_cases, passed_test_cases, score} =
                filterJestTestResult(test_result)

              try {
                await fetchUpdateTestResult({
                  user_id: user_id_secret,
                  frontend_challenge_id: challenge_id,
                  passed_test_cases,
                  total_test_cases,
                  result,
                  score,
                  bot_token
                })
              } catch (e) {
                core.info('problem in update test result!')
              }
            } else {
              core.info('no tesult found!')
            }
          }
        )
      } catch (error) {
        if (error instanceof Error) core.setFailed(error.message)
      }
    } else {
      core.info('No tha added by Devsnest yet!')
    }
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
