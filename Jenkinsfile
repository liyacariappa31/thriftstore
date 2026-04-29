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
                nohup npm start > app.log 2>&1 &
                '''
            }
        }
    }
}
