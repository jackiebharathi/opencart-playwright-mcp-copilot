pipeline {
    agent any

    environment {
        // Define environment variables
        NODE_VERSION = '16'
        PLAYWRIGHT_VERSION = '1.54.2'
    }

    stages {
        stage('Setup') {
            steps {
                // Install Node.js
                nodejs(nodeJSInstallationName: 'Node ' + NODE_VERSION) {
                    sh 'node -v'
                    sh 'npm -v'
                }
                
                // Install dependencies
                sh 'npm run install:deps'
                
                // Install Playwright browsers
                sh 'npm run install:browsers'
            }
        }

        stage('Run Tests') {
            steps {
                nodejs(nodeJSInstallationName: 'Node ' + NODE_VERSION) {
                    // Run tests and generate reports
                    sh 'npm run test:ci-except-ddt'
                }
            }
        }
    }

    post {
        always {
            // Publish test results
            junit 'test-results/junit.xml'
            
            // Archive HTML report
            publishHTML(target: [
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright Report'
            ])
            
            // Clean workspace
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
