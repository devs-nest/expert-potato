import axios from 'axios'
import {
  FRONTEND_CHALLENGES_SUBMIT_TEST_FILE,
  FRONTEND_CHALLENGES_TEST_CASES
} from '../Api'
import {TestCaseData, TestCaseTypeResponse, TestResultDataType} from '../types'

/**
 * Fetch Test Cases content and folder
 */
export const fetchFrontendChallengesTestCase = async (
  tha_no_secret: string
): Promise<TestCaseData> => {
  const response = axios.get(
    `${FRONTEND_CHALLENGES_TEST_CASES}?id=${tha_no_secret}`
  )

  const {data} = (await response) as TestCaseTypeResponse
  return data.attributes
}

/**
 * update test result
 */

export const fetchUpdateTestResult = async (
  data: TestResultDataType
): Promise<void> => {
  const {
    user_id,
    frontend_challenge_id,
    total_test_cases,
    passed_test_cases,
    result,
    score,
    bot_token
  } = data
  await axios.post(
    FRONTEND_CHALLENGES_SUBMIT_TEST_FILE,
    {
      data: {
        type: 'fe_submissions',
        attributes: {
          user_id,
          frontend_challenge_id,
          total_test_cases,
          passed_test_cases,
          score,
          question_type: 'github',
          is_submitted: true,
          result
        }
      }
    },
    {
      headers: {
        ACCEPT: 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        Token: bot_token
      }
    }
  )
}
