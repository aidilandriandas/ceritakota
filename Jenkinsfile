pipeline {
    agent any

    environment {
        SERVER = "103.152.119.18"
    }

    stages {
        stage('Deploy') {
            steps {
                sshagent(credentials: ['production-server']) {
                    sh """
                        ssh -o StrictHostKeyChecking=no root@${SERVER} 'bash /var/www/ceritakota/deploy.sh'
                    """
                }
            }
        }
    }
}
