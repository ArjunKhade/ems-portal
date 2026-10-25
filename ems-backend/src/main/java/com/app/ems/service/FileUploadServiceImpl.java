package com.app.ems.service;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.app.ems.dto.FileUploadResponseDto;
import com.app.ems.exceptions.EmployeeHandlingException;
import com.app.ems.exceptions.ResourceNotFoundException;

import jakarta.annotation.PostConstruct;

@Service
public class FileUploadServiceImpl implements IFileUploadService {

    private final Path fileStorageLocation;
    private static final List<String> ALLOWED_EXTENSIONS = Arrays.asList("jpg", "jpeg", "png", "webp", "gif");
    private static final List<String> ALLOWED_CONTENT_TYPES = Arrays.asList(
            "image/jpeg", "image/png", "image/webp", "image/gif", "image/pjpeg");

    public FileUploadServiceImpl(@Value("${file.upload-dir:uploads/profile-photos}") String uploadDir) {
        this.fileStorageLocation = Paths.get(uploadDir).toAbsolutePath().normalize();
    }

    @PostConstruct
    public void init() {
        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (IOException ex) {
            throw new EmployeeHandlingException("Could not initialize upload directory: " + ex.getMessage());
        }
    }

    @Override
    public FileUploadResponseDto uploadFile(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new EmployeeHandlingException("Failed to upload empty or null file.");
        }

        String originalFilename = StringUtils.cleanPath(file.getOriginalFilename() != null ? file.getOriginalFilename() : "profile.png");

        // Validate path traversal
        if (originalFilename.contains("..")) {
            throw new EmployeeHandlingException("Filename contains invalid path sequence: " + originalFilename);
        }

        // Validate content type
        String contentType = file.getContentType();
        if (contentType == null || !ALLOWED_CONTENT_TYPES.contains(contentType.toLowerCase())) {
            throw new EmployeeHandlingException("Invalid file type: " + contentType + ". Only JPG, PNG, WEBP, and GIF images are allowed.");
        }

        // Validate file extension
        String fileExtension = "";
        int lastIndex = originalFilename.lastIndexOf('.');
        if (lastIndex > 0) {
            fileExtension = originalFilename.substring(lastIndex + 1).toLowerCase();
        }

        if (!ALLOWED_EXTENSIONS.contains(fileExtension)) {
            throw new EmployeeHandlingException("Invalid file extension: " + fileExtension + ". Allowed extensions: " + ALLOWED_EXTENSIONS);
        }

        // Generate unique safe filename
        String uniqueFileName = UUID.randomUUID() + "." + fileExtension;

        try {
            Path targetLocation = this.fileStorageLocation.resolve(uniqueFileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            String fileViewUri;
            try {
                fileViewUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                        .path("/api/files/view/")
                        .path(uniqueFileName)
                        .toUriString();
            } catch (Exception ex) {
                fileViewUri = "/api/files/view/" + uniqueFileName;
            }

            return FileUploadResponseDto.builder()
                    .fileName(uniqueFileName)
                    .fileUrl(fileViewUri)
                    .fileType(contentType)
                    .size(file.getSize())
                    .build();

        } catch (IOException ex) {
            throw new EmployeeHandlingException("Failed to store file " + uniqueFileName + ": " + ex.getMessage());
        }
    }

    @Override
    public Resource loadFileAsResource(String fileName) {
        try {
            String sanitizedFileName = Paths.get(fileName).getFileName().toString();
            Path filePath = this.fileStorageLocation.resolve(sanitizedFileName).normalize();

            // Security check: ensure filePath is within fileStorageLocation
            if (!filePath.startsWith(this.fileStorageLocation)) {
                throw new EmployeeHandlingException("Cannot access file outside storage directory");
            }

            Resource resource = new UrlResource(filePath.toUri());
            if (resource.exists() && resource.isReadable()) {
                return resource;
            } else {
                throw new ResourceNotFoundException("File not found: " + fileName);
            }
        } catch (MalformedURLException ex) {
            throw new ResourceNotFoundException("File not found: " + fileName);
        }
    }

    @Override
    public boolean deleteFile(String fileName) {
        try {
            String sanitizedFileName = Paths.get(fileName).getFileName().toString();
            Path filePath = this.fileStorageLocation.resolve(sanitizedFileName).normalize();
            if (filePath.startsWith(this.fileStorageLocation)) {
                return Files.deleteIfExists(filePath);
            }
            return false;
        } catch (IOException ex) {
            return false;
        }
    }
}
