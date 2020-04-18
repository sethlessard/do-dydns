def buildImage
pipeline {
	agent {
		label "linux && docker"
	}
	
	stages {

		stage("Build Docker Image") {
			steps {
				script {
					buildImage = docker.build("sethlessard/do-dydns-${env.BRANCH_NAME}-${env.BUILD_ID}")
				}
			}
		}
		
		stage("Test") {
			steps {
				script {
					buildImage.inside {
						sh "npm test"
					}
				}
			}
		}
	}
}
