pipeline {
    agent any

    environment {
        VPS = "103.152.119.18"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Build Test') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy to VPS') {
            steps {
                withCredentials([
                    sshUserPrivateKey(
                        credentialsId: 'tess',
                        keyFileVariable: 'SSH_KEY',
                        usernameVariable: 'SSH_USER'
                    )
                ]) {
                    sh '''
                        chmod 600 "$SSH_KEY"

                        ssh -i "$SSH_KEY" \
                        -o StrictHostKeyChecking=no \
                        ${SSH_USER}@${VPS} \
                        "bash /var/www/ceritakota/deploy.sh"
                    '''
                }
            }
        }
    }

    post {

        success {
            withCredentials([string(credentialsId: 'telegram-token', variable: 'BOT_TOKEN')]) {
                sh '''
                    curl -s -X POST https://api.telegram.org/bot$BOT_TOKEN/sendMessage \
                    -d chat_id=8392806634 \
                    --data-urlencode "text=✅ CeritaKota

Deploy BERHASIL

Build #${BUILD_NUMBER}

Commit:
${GIT_COMMIT}"
                '''
            }
        }

        failure {
            withCredentials([string(credentialsId: 'telegram-token', variable: 'BOT_TOKEN')]) {
                sh '''
                    curl -s -X POST https://api.telegram.org/bot$BOT_TOKEN/sendMessage \
                    -d chat_id=8392806634 \
                    --data-urlencode "text=❌ CeritaKota

Deploy GAGAL

Build #${BUILD_NUMBER}"
                '''
            }
        }
    }
}