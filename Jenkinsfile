pipeline {
    agent any

    stages {

        stage('Test SSH Key') {
            steps {
                sshagent(['Production VPS SSH']) {
                    sh '''
                        ssh-add -l
                    '''
                }
            }
        }

        stage('Deploy') {
            steps {
                sshagent(['Production VPS SSH']) {
                    sh '''
                        ssh root@103.152.119.18 "echo SSH OK"
                    '''
                }
            }
        }

    }
}