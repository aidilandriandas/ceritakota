pipeline {
    agent any

    stages {
        stage('Deploy') {
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

                        ssh \
                            -i "$SSH_KEY" \
                            -o StrictHostKeyChecking=no \
                            ${SSH_USER}@103.152.119.18 \
                            "bash /var/www/ceritakota/deploy.sh"
                    '''
                }
            }
        }
    }
}