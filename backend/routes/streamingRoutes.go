package routes

import (
	"github.com/chuckcrump/crappyfin/backend/handlers"
	"github.com/labstack/echo/v4"
)

func RegisterStreamingRoutes(app *echo.Echo) {
	streamGroup := app.Group("/api/streaming")

	streamGroup.GET("/stream/:uuid", handlers.StreamMovie)
	streamGroup.GET("/subtitle/:uuid", handlers.SendSubtitle)
}
