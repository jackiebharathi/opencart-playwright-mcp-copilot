pipeline {
    agent any

    environment {
        NODE_VERSION = '18'
        PLAYWRIGHT_REPORT_DIR = 'playwright-report'
        PLAYWRIGHT_JUNIT_FILE = 'test-results/junit.xml'
    }

    stages {
        stage('Setup') {
            steps {
                nodejs(nodeJSInstallationName: "Node ${NODE_VERSION}") {
                    bat 'node -v'
                    bat 'npm -v'
                    bat 'npm ci'                             // Install dependencies cleanly
                    bat 'npx playwright install --with-deps' // Install browsers with dependencies
                }
            }
        }

        stage('Run Tests') {
            steps {
                nodejs(nodeJSInstallationName: "Node ${NODE_VERSION}") {
                    // Run Playwright tests with reporters for junit XML and HTML
                    bat """
                    npx playwright test --reporter=junit,html --output=${PLAYWRIGHT_REPORT_DIR}
                    """
                }
            }
        }
    }

    post {
        always {
            // Publish JUnit XML report for Jenkins test results
            junit allowEmptyResults: true, testResults: "${PLAYWRIGHT_JUNIT_FILE}"

            // Publish HTML report
            publishHTML([
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: "${PLAYWRIGHT_REPORT_DIR}",
                reportFiles: 'index.html',
                reportName: 'Playwright Report'
            ])

            cleanWs()
        }

        success {
            echo 'Tests completed successfully!'
        }

        failure {
            echo 'Test execution failed!'
        }
    }
}
