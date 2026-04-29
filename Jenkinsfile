stage('Deploy') {
    steps {
        sh '''
        pkill -f "next start" || true
        pm2 delete thriftstore || true
        pm2 start npm --name "thriftstore" -- start
        pm2 save
        '''
    }
}
