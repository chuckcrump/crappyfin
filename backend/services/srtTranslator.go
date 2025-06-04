package services

import (
	"bufio"
	"log"
	"os"
	"strings"
)

func SrtToVtt(srtPath string) string {
		lines := []string{}
	file, err := os.Open(srtPath)
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	currentChunk := ""
	scanner := bufio.NewScanner(file)

	lines = append(lines, "WEBVTT\n\n")
	for scanner.Scan() {
		line := scanner.Text()
		if strings.Contains(line, "-->") {
			line = strings.ReplaceAll(line, ",", ".")
		}
		currentChunk += line + "\n"
		if line == "" {
			lines = append(lines, currentChunk)
			currentChunk = ""
		}
		if err := scanner.Err(); err != nil {
			log.Fatal(err)
		}
	}
	vtt, err := os.Create("test.srt" + ".vtt")
	if err != nil {
		return ""
	}
	for _, line := range lines {
		_, err := vtt.WriteString(line)
		if err != nil {
			log.Fatal("Failed to write file")
		}
	}
	return srtPath + ".vtt"
}
