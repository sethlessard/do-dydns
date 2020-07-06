def prodImage
pipeline {
	agent {
		label "linux && docker"
	}
	
	stages {

		stage("Test") {
			steps {
				script {
					docker.build("sethlessard/do-dydns-test", "-f Dockerfile.test .")
				}
			}
		}

		stage("Build Production Docker Image") {
			when { expression { sh([returnStdout: true, script: 'echo $TAG_NAME | tr -d \'\n\'']) } }
			steps {
				script {
					prodImage = docker.build("sethlessard/do-dydns:${env.BRANCH_NAME}", "-f Dockerfile .")
				}
			}
		}
		stage("Deploy Production Docker Image") {
			when { expression { sh([returnStdout: true, script: 'echo $TAG_NAME | tr -d \'\n\'']) } }
			steps {
				script {
					docker.withRegistry('https://registry.hub.docker.com/v2/', 'docker-sl') {
						prodImage.push()
					}
				}
			}
		}
	
	}
}
