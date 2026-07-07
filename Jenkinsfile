pipeline {
    agent any

    stages {

        stage('Test SSH Key') {
            steps {
                sshagent(['tess']) {
                    sh '''
                        ssh-add -l
                    '''
                }
            }
        }

        stage('Deploy') {
            steps {
                sshagent(['tess']) {
                    sh '''
                        ssh root@103.152.119.18 "echo SSH OK"
                    '''
                }
            }
        }

    }
}