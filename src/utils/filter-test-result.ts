import {JestResulType, ReusultType} from '../types'

export const filterJestTestResult = (
  jestResult: JestResulType
): {
  result: ReusultType[]
  total_test_cases: number
  passed_test_cases: number
  score: number
} => {
  const filter_test_result: ReusultType[] = []
  const total_test_cases = jestResult.numTotalTests
  const passed_test_cases = jestResult.numPassedTests
  const score = passed_test_cases * 10

  const assertionResults = jestResult.testResults[0].assertionResults

  for (const result of assertionResults) {
    const {status, title} = result
    filter_test_result.push({title, status})
  }

  return {
    result: filter_test_result,
    total_test_cases,
    passed_test_cases,
    score
  }
}
