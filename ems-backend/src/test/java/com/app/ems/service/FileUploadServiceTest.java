package com.app.ems.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;
import org.springframework.core.io.Resource;
import org.springframework.mock.web.MockMultipartFile;

import com.app.ems.dto.FileUploadResponseDto;
import com.app.ems.exceptions.EmployeeHandlingException;
import com.app.ems.exceptions.ResourceNotFoundException;

class FileUploadServiceTest {

    private FileUploadServiceImpl fileUploadService;

    @TempDir
    Path tempDir;

    @BeforeEach
    void setUp() {
        fileUploadService = new FileUploadServiceImpl(tempDir.toString());
        fileUploadService.init();
    }

    @Test
    void testUploadValidImage() {
        MockMultipartFile file = new MockMultipartFile(
                "file",
                "avatar.png",
                "image/png",
                "test-image-data".getBytes()
        );

        FileUploadResponseDto response = fileUploadService.uploadFile(file);

        assertNotNull(response);
        assertNotNull(response.getFileName());
        assertTrue(response.getFileName().endsWith(".png"));
        assertEquals("image/png", response.getFileType());
        assertEquals("test-image-data".length(), response.getSize());

        // Verify resource can be loaded
        Resource resource = fileUploadService.loadFileAsResource(response.getFileName());
        assertTrue(resource.exists());
        assertTrue(resource.isReadable());
    }

    @Test
    void testUploadEmptyFileThrowsException() {
        MockMultipartFile emptyFile = new MockMultipartFile("file", "empty.png", "image/png", new byte[0]);

        assertThrows(EmployeeHandlingException.class, () -> {
            fileUploadService.uploadFile(emptyFile);
        });
    }

    @Test
    void testUploadDisallowedContentTypeThrowsException() {
        MockMultipartFile exeFile = new MockMultipartFile(
                "file",
                "malicious.exe",
                "application/x-msdownload",
                "data".getBytes()
        );

        assertThrows(EmployeeHandlingException.class, () -> {
            fileUploadService.uploadFile(exeFile);
        });
    }

    @Test
    void testDeleteFile() {
        MockMultipartFile file = new MockMultipartFile(
                "file",
                "avatar.jpg",
                "image/jpeg",
                "data".getBytes()
        );

        FileUploadResponseDto response = fileUploadService.uploadFile(file);
        boolean deleted = fileUploadService.deleteFile(response.getFileName());
        assertTrue(deleted);

        // Verify loading deleted file throws ResourceNotFoundException
        assertThrows(ResourceNotFoundException.class, () -> {
            fileUploadService.loadFileAsResource(response.getFileName());
        });
    }
}
