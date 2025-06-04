package main

import (
	"log"

	"github.com/chuckcrump/crappyfin/backend/routes"
	"github.com/chuckcrump/crappyfin/backend/services"
	"github.com/labstack/echo/v4"
)

func main() {
	app := echo.New()
	_, err := services.Traverse("/home/andy/projects/crappyfin/streaming-frontend/media")
	if err != nil {
		log.Fatal("failed to scan dir ", err)
	}

	routes.RegisterStreamingRoutes(app)
	app.Logger.Fatal(app.Start(":8080"))
}