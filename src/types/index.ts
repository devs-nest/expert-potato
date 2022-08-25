// Fetch Test Case API
export type TestCaseType = {
  id: null
  type: null
  attributes: {
    challenge_id: string
    folder_name: string
    content: string
  }
}
export type TestCaseData = TestCaseType['attributes']

export type TestCaseTypeResponse = {
  data: TestCaseType
}

// Update Test Result
export type TestResultDataType = {
  user_id: string
  frontend_challenge_id: string
  total_test_cases: number
  passed_test_cases: number
  result: ReusultType[]
  score: number
  bot_token: string
}

export type ReusultType = {
  title: string
  status: string
}

// Jest Result Type

export type JestResulType = {
  numFailedTestSuites: number
  numFailedTests: number
  numPassedTestSuites: number
  numPassedTests: number
  numPendingTestSuites: number
  numPendingTests: number
  numRuntimeErrorTestSuites: number
  numTodoTests: number
  numTotalTestSuites: number
  numTotalTests: number
  openHandles: []
  snapshot: {
    added: number
    didUpdate: boolean
    failure: boolean
    filesAdded: number
    filesRemoved: number
    filesRemovedList: []
    filesUnmatched: number
    filesUpdated: number
    matched: number
    total: number
    unchecked: number
    uncheckedKeysByFile: []
    unmatched: number
    updated: number
  }
  startTime: number
  success: boolean
  testResults: {
    assertionResults: {
      ancestorTitles: string[]
      failureMessages: string[]
      fullName: string
      location: null
      status: string
      title: string
    }[]
    endTime: number
    message: string
    name: string
    startTime: number
    status: string
    summary: string
  }[]
  wasInterrupted: boolean
}
