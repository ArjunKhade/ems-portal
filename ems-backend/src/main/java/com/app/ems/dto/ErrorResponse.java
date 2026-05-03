package com.app.ems.dto;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ErrorResponse {

	private String message;
	
	private LocalDateTime dateTime = LocalDateTime.now();
	

}
