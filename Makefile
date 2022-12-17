start: stop
	docker compose up --no-build --remove-orphans

stop:
	docker compose stop

build:
	docker compose build

check-lint:
	npm run lint:check

check-format:
	npm run format:check
