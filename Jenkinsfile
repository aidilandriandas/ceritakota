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
}