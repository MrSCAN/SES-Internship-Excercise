docker build -t ses-spring-boot-image ./ses-user-service/ && docker build -t angular-frontend ./ses-users-frontend/ && docker build -t flask-middleware ./python-middleware/ && docker-compose up -d && docker ps