#-------------------------------------
# ONLY INTENDED FOR LOCAL DEVELOPMENT |
#-------------------------------------

PORT=5000

dev:
	PORT=${PORT} \
	ENVIRONMENT=dev \
	DB_USER=shahein \
	DB_PASS="" \
	DB_DATABASE=hotrestaurant \
	DB_PORT=3306 \
	DB_HOST=localhost \
	npm run dev

test:
	PORT=${PORT} \
	ENVIRONMENT=test \
	DB_USER=fakeuser \
	DB_PASS=fakepass \
	DB_DATABASE=fakedb \
	DB_PORT=5678 \
	DB_HOST=fakedb.fakehost.com \
	npm test

prodrun:
	PORT=${PORT} \
	ENVIRONMENT=dev \
	DB_USER=shahein \
	DB_PASS="" \
	DB_DATABASE=hotrestaurant \
	DB_PORT=3306 \
	DB_HOST=localhost \
	npm run build && npm start


dockerbuild:
	@ npm run clean && \
		docker build --no-cache -t gtcbc/hotrestaurant-api .

dockerrun:
	docker run -it --rm \
		-p ${PORT}:${PORT} \
		-e PORT=${PORT} \
		-e ENVIRONMENT=dev \
		-e DB_USER=shahein \
		-e DB_PASS="" \
		-e DB_DATABASE=hotrestaurant \
		-e DB_PORT=3306 \
		-e DB_HOST=localhost \
		gtcbc/hotrestaurant-api

dockercompose:
	PORT=${PORT} \
	ENVIRONMENT=dev \
	DB_USER=shahein \
	DB_PASS="" \
	DB_DATABASE=hotrestaurant \
	DB_PORT=3306 \
	DB_HOST=localhost \
	FE_PORT=8081 \
	API_HOST="http://localhost:5000/api" \
	docker-compose up --build

.PHONY: test

