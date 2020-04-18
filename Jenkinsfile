def buildImage
pipeline {
	agent any
	
	stages {
		stage("Build Test Container") {
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
