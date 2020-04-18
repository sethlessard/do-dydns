def testImage
def prodImage
pipeline {
	agent {
		label "linux && docker"
	}
	
	stages {

		stage("Build Test Docker Image") {
			steps {
				script {
					testImage = docker.build("sethlessard/do-dydns-${env.BRANCH_NAME}-${env.BUILD_ID}", "-f Dockerfile.dev .")
				}
			}
		}
		
		stage("Test") {
			steps {
				script {
					testImage.inside {
						sh "npm test"
					}
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
