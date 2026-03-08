const db = require("./dbConfig")

class ResultsRepository {

  saveTestResult(result) {

    const stmt = db.prepare(`
      INSERT INTO test_results (
        test_name,
        status,
        duration_ms,
        executed_at
      )
      VALUES (?, ?, ?, datetime('now'))
      ON CONFLICT(test_name)
      DO UPDATE SET
        status = excluded.status,
        duration_ms = excluded.duration_ms,
        executed_at = datetime('now')
    `)

    stmt.run(
      result.testName,
      result.status,
      result.duration
    )
  }

}

module.exports = new ResultsRepository()