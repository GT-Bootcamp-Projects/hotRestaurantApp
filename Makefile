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
	npm start

test:
	PORT=${PORT} \
	ENVIRONMENT=test \
	DB_USER=fakeuser \
	DB_PASS=fakepass \
	DB_DATABASE=fakedb \
	DB_PORT=5678 \
	DB_HOST=fakedb.fakehost.com \
	npm test

.PHONY: test

