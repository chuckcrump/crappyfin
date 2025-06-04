package services

import (
	"encoding/json"
	"io/fs"
	"os"
	"path/filepath"
	"strings"

	"github.com/gabriel-vasile/mimetype"
	"github.com/google/uuid"
)

type MovieClass struct {
    Uuid          string `json:"uuid"`
    Name          string `json:"name"`
    VideoPath     string `json:"videoPath,omitempty"`
    CoverPath     string `json:"coverPath,omitempty"`
    SubtitlePath  string `json:"subtitlePath,omitempty"`
    Mimes         string `json:"mimes,omitempty"`
}

func Traverse(mediaPath string) ([]MovieClass, error) {
    var movies []MovieClass

    mediaDirs, err := os.ReadDir(mediaPath)
    if err != nil {
        return nil, err
    }

    //jsonPath := os.Getenv("MEDIA_PATH")
    //if jsonPath == "" {
    //    return nil, errors.New("MEDIA_PATH environment variable is not set")
    //}
		jsonPath := "./"

    for _, dir := range mediaDirs {
        if !dir.IsDir() {
            continue
        }

        moviePath := filepath.Join(mediaPath, dir.Name())
        idPath := filepath.Join(moviePath, ".id.txt")

        if _, err := os.Stat(idPath); os.IsNotExist(err) {
            err := AddId(uuid.New().String(), moviePath)
            if err != nil {
                return nil, err
            }
        }

        movie, err := ProcessMovie(moviePath)
        if err != nil {
            return nil, err
        }
        movies = append(movies, movie)
    }

    jsonFile, err := os.Create(filepath.Join(jsonPath, "movie.json"))
    if err != nil {
        return nil, err
    }
    defer jsonFile.Close()

    encoder := json.NewEncoder(jsonFile)
    encoder.SetIndent("", "  ")
    err = encoder.Encode(movies)
    if err != nil {
        return nil, err
    }

    err = SaveToDatabase(movies)
    if err != nil {
        return nil, err
    }

    return movies, nil
}

func ProcessMovie(path string) (MovieClass, error) {
    movie := MovieClass{
        Name: filepath.Base(path),
    }

    idPath := filepath.Join(path, ".id.txt")
    if _, err := os.Stat(idPath); err == nil {
        content, err := os.ReadFile(idPath)
        if err != nil {
            return movie, err
        }
        movie.Uuid = strings.TrimSpace(string(content))
    } else {
        movie.Uuid = uuid.New().String()
        err := AddId(movie.Uuid, path)
        if err != nil {
            return movie, err
        }
    }

    movieFiles, err := os.ReadDir(path)
    if err != nil {
        return movie, err
    }

    vttExists := false
    for _, file := range movieFiles {
        if filepath.Ext(file.Name()) == ".vtt" {
            vttExists = true
            break
        }
    }

    for _, file := range movieFiles {
        filePath := filepath.Join(path, file.Name())
        mimeType := GetMimeType(filePath)
        movie.Mimes = mimeType

        switch {
        case strings.HasPrefix(mimeType, "video/"):
            movie.VideoPath = filePath
        case strings.HasPrefix(mimeType, "image/"):
            movie.CoverPath = filePath
        }

        switch filepath.Ext(file.Name()) {
        case ".srt":
            if !vttExists {
                movie.SubtitlePath = SrtToVtt(filePath)
            }
        case ".vtt":
            movie.SubtitlePath = filePath
        }
    }

    return movie, nil
}

func AddId(uuid, path string) error {
    idPath := filepath.Join(path, ".id.txt")
    return os.WriteFile(idPath, []byte(uuid), fs.ModePerm)
}

func GetMimeType(filePath string) string {
	file, err := os.Open(filePath)
	if err != nil {
		return "application/octet-stream"
	}
	defer file.Close()

	buffer := make([]byte, 512)
	_, err = file.Read(buffer)
	if err != nil {
		return "application/octet-stream"
	}

	mime := mimetype.Detect(buffer)
	if mime != nil {
		return strings.Split(mime.String(), ";")[0]
	}
	return "application/octet-stream"
}

func SaveToDatabase(movies []MovieClass) error {
    return nil
}
