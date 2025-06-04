PROJECT_NAME=Crappyfin
CMD_DIR=./cmd/server
GOFMT_FILES=$(shell find . -type f -name '*.go' -not -path "./vendor/*")

build:
	go build -o bin/$(PROJECT_NAME) $(CMD_DIR)

run:
	go run $(CMD_DIR)/main.go

format:
	gofmt -s -w $(GOFMT_FILES)

clean:
	go clean
	rm -rf bin/