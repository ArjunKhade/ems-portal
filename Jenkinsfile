pipeline {

    agent any

    stages {

        stage('Build Images') {
            steps {
                bat 'docker compose build'
            }
        }

        stage('Stop Old Containers') {
            steps {
                bat 'docker compose down'
            }
        }

        stage('Deploy') {
            steps {
                bat 'docker compose up -d'
            }
        }

        stage('Wait for Application') {
            steps {
                sleep(time: 30, unit: 'SECONDS')
            }
        }

        stage('Run Playwright Tests') {
            steps {
                dir('ems-e2e') {
                    bat 'npm ci'
                    bat 'npx playwright install'
                    bat 'npx playwright test'
                }
            }
        }

    }

    post {

        always {

            publishHTML([
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'ems-e2e/playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright Report'
            ])

            archiveArtifacts artifacts: 'ems-e2e/playwright-report/**/*', fingerprint: true
            archiveArtifacts artifacts: 'ems-e2e/test-results/**/*', fingerprint: true
        }

        success {
            echo 'Pipeline completed successfully.'
        }

        failure {
            echo 'Pipeline failed.'
        }
    }
}