package handlers

import (
	"fmt"
	"io"
	"net/http"
	"os"
	"strconv"
	"strings"

	"github.com/labstack/echo/v4"
)

type Movie struct {
	UUID         string
	VideoPath    string
	SubtitlePath string
}

var movies = []Movie{
	{
		UUID:         "7cfe1004-422c-49db-be9a-b134cfced4fd",
		VideoPath:    "/home/andy/projects/crappyfin/streaming-frontend/media/Alita Battle Angel (2019)/Alita.Battle.Angel.2019.1080p.BluRay.x264-[YTS.LT].mp4",
		SubtitlePath: "/home/andy/projects/crappyfin/streaming-frontend/media/Alita Battle Angel (2019)/Alita - Battle Angel (2019).eng.srt.vtt",
	},
}

const chunkSize = 1 << 20

func StreamMovie(c echo.Context) error {
	uuid := c.Param("uuid")
	var videoPath string
	for _, movie := range movies {
		if movie.UUID == uuid {
			videoPath = movie.VideoPath
			break
		}
	}
	if videoPath == "" {
		return echo.NewHTTPError(http.StatusNotFound, "Movie not found")
	}

	file, err := os.Open(videoPath)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Could not open video file")
	}
	defer file.Close()

	fileInfo, err := file.Stat()
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Could not get file info")
	}

	fileSize := fileInfo.Size()
	rangeHeader := c.Request().Header.Get("Range")
	res := c.Response()
	res.Header().Set("Accept-Ranges", "bytes")

	if rangeHeader != "" {
		parts := strings.Split(rangeHeader, "=")
		if len(parts) != 2 || parts[0] != "bytes" {
			return echo.NewHTTPError(http.StatusBadRequest, "Invalid range header")
		}

		ranges := strings.Split(parts[1], "-")
		if len(ranges) != 2 {
			return echo.NewHTTPError(http.StatusBadRequest, "Invalid range header format")
		}

		start, end := int64(0), fileSize-1

		if ranges[0] != "" {
			start, err = strconv.ParseInt(ranges[0], 10, 64)
			if err != nil {
				return echo.NewHTTPError(http.StatusBadRequest, "Invalid start range")
			}
		}

		if ranges[1] != "" {
			end, err = strconv.ParseInt(ranges[1], 10, 64)
			if err != nil {
				return echo.NewHTTPError(http.StatusBadRequest, "Invalid end range")
			}
		}

		if start > end || start >= fileSize || end < 0 {
			res.Header().Set("Content-Range", fmt.Sprintf("bytes */%d", fileSize))
			res.WriteHeader(http.StatusRequestedRangeNotSatisfiable)
			return nil
		}

		chunkSizeToSend := end - start + 1
		if chunkSizeToSend > chunkSize {
			end = start + chunkSize - 1
			if end >= fileSize {
				end = fileSize - 1
			}
			chunkSizeToSend = end - start + 1
		}

		buffer := make([]byte, chunkSizeToSend)
		n, err := file.ReadAt(buffer, start)
		if err != nil && err != io.EOF {
			return echo.NewHTTPError(http.StatusInternalServerError, "Could not read file chunk")
		}

		res.Header().Set("Content-Range", fmt.Sprintf("bytes %d-%d/%d", start, end, fileSize))
		res.Header().Set("Content-Length", strconv.Itoa(n))
		res.Header().Set("Content-Type", "video/mp4")
		res.WriteHeader(http.StatusPartialContent)
		_, err = res.Write(buffer[:n])
		if err != nil {
			fmt.Println("Error writing response you can probably ignore this:", err)
		}
		return nil
	}

	res.Header().Set("Content-Length", strconv.FormatInt(fileSize, 10))
	res.Header().Set("Content-Type", "video/mp4")
	res.WriteHeader(http.StatusOK)
	_, err = io.Copy(res, file)
	if err != nil {
		fmt.Println("Error writing full content:", err)
	}
	return nil
}

func SendSubtitle(c echo.Context) error {
	subUuid := c.Param("uuid")
	var subPath string
	for _, movie := range movies {
		if movie.UUID == subUuid {
			subPath = movie.SubtitlePath
			break
		}
	}
	if subPath == "" {
		return echo.NewHTTPError(http.StatusNotFound, "Subtitle not found")
	}

	return c.File(subPath)
}
