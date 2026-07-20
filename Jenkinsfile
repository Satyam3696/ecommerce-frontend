pipeline {

    agent any

    environment {

        APP_NAME = "ecommerce-frontend"

        IMAGE_NAME = "ecommerce-frontend"

        IMAGE_TAG = "${BUILD_NUMBER}"

        DOCKER_IMAGE = "${IMAGE_NAME}:${IMAGE_TAG}"

        CONTAINER_NAME = "ecommerce-frontend-container"

        COMPOSE_FILE = "docker-compose.yml"

    }

    stages {

        stage('Checkout Code') {

            steps {

                echo "========== CHECKOUT CODE =========="

                checkout scm

            }

        }

        stage('Install Dependencies') {

            steps {

                echo "========== INSTALL DEPENDENCIES =========="

                sh 'npm install'

            }

        }

        stage('Build React Application') {

            steps {

                echo "========== BUILD REACT =========="

                sh 'npm run build'

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

                echo "========== STOP OLD CONTAINER =========="

                sh """
                    export IMAGE_NAME=${IMAGE_NAME}
                    export IMAGE_TAG=latest

                    docker compose -f ${COMPOSE_FILE} down || true
                """
            }

        }

        stage('Deploy Application') {

            steps {

                echo "========== DEPLOY APPLICATION =========="

                sh """
                    export IMAGE_NAME=${IMAGE_NAME}
                    export IMAGE_TAG=latest

                    docker compose -f ${COMPOSE_FILE} up -d
                """
            }

        }

        stage('Cleanup Old Images') {

            steps {

                echo "========== CLEANUP =========="

                sh "docker image prune -f"

            }

        }

    }

    post {

        success {

            echo "Frontend deployed successfully."

        }

        failure {

            echo "Frontend deployment failed."

        }

        always {

            echo "Pipeline execution completed."

        }

    }

}