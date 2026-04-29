pipeline {
    agent any

    stages {
        stage('Install') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                pkill -f "next start" || true
                npm install pm2 -g || true
                pm2 delete thriftstore || true
                pm2 start npm --name "thriftstore" -- start
                pm2 save
                '''
            }
        }
    }
}
