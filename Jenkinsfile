def buildImage
pipeline {
	agent {
		docker {
			image "node:12"
			args "-u root:root"
		}
	}
	
	stages {
		stage("Install Dependencies") {
			steps {
				script {
					sh "npm install"
				}
			}
		}
		
		stage("Test") {
			steps {
				script {
					sh "npm test"
				}
			}
		}
	}
}
