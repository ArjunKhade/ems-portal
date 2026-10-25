package com.app.ems.service;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import com.app.ems.dto.FileUploadResponseDto;

public interface IFileUploadService {

    FileUploadResponseDto uploadFile(MultipartFile file);

    Resource loadFileAsResource(String fileName);

    boolean deleteFile(String fileName);
}
