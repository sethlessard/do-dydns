pipeline {
	agent { dockerfile true }
	
	stages {
		stage("Install Dependencies") {
			steps {
				sh "npm install"
			}
		}
		
		stage("Test") {
			steps {
				sh "npm test"
			}
		}
	}
}s