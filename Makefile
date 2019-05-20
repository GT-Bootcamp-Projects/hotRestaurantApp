PORT=5000

dev:
	PORT=${PORT} \
	ENVIRONMENT=test \
	DB_USER=fakeuser \
	DB_PASS=fakepass \
	DB_DATABASE=fakedb \
	DB_PORT=5678 \
	DB_HOST=fakedb.fakehost.com \
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

