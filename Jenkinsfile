pipeline {
    agent any

    environment {
        APP_NAME       = "ecommerce-frontend"
        IMAGE_NAME     = "ecommerce-frontend"
        IMAGE_TAG      = "${BUILD_NUMBER}"
        DOCKER_IMAGE   = "${IMAGE_NAME}:${IMAGE_TAG}"
        CONTAINER_NAME = "ecommerce-frontend-container"
        COMPOSE_FILE   = "docker-compose.yml"
    }

    stages {

        stage('Checkout Code') {
            steps {
                echo "========== CHECKOUT CODE =========="
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                echo "========== BUILD DOCKER IMAGE =========="

                sh """
                    docker build -t ${DOCKER_IMAGE} .
                    docker tag ${DOCKER_IMAGE} ${IMAGE_NAME}:latest
                """
            }
        }

        stage('Stop Existing Container') {
          steps {
             echo "========== STOP EXISTING CONTAINER =========="

            sh """
                 docker stop ${CONTAINER_NAME} || true
                docker rm ${CONTAINER_NAME} || true
               docker compose -f ${COMPOSE_FILE} down || true
             """
            }
       }

        stage('Deploy Application') {
            steps {
                echo "========== DEPLOY APPLICATION =========="

                sh """
                    IMAGE_NAME=${IMAGE_NAME} IMAGE_TAG=${IMAGE_TAG} docker compose -f ${COMPOSE_FILE} up -d
                """
            }
        }

        stage('Cleanup Old Images') {
            steps {
                echo "========== CLEANUP OLD IMAGES =========="

                sh '''
                    docker image prune -f
                '''
            }
        }
    }

    post {

        always {
            echo "Pipeline execution completed."
        }

        success {
            echo "Frontend deployed successfully."
        }

        failure {
            echo "Frontend deployment failed."
        }
    }
}