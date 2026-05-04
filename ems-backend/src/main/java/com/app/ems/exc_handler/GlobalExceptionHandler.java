package com.app.ems.exc_handler;
import java.time.LocalDateTime;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.app.ems.dto.ErrorResponse;
import com.app.ems.exceptions.ResourceNotFoundException;


 //mdt annotation to tell sc this class global exception handler and offer common advice to controller layer
 // controller - req handing logic 
 // this belove class exc handling login sepration of concern

@ControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

	@Override
	protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
			HttpHeaders headers, HttpStatusCode status, WebRequest request) {
		// TODO Auto-generated method stub
		StringBuilder sb = new StringBuilder("Validation Error messages: ");
		ex.getBindingResult().getFieldErrors().forEach(errorField -> sb.append(errorField.getDefaultMessage()+","));
		ErrorResponse resp = new ErrorResponse(sb.toString(), LocalDateTime.now());
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(resp);
	}
	
	
	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<?>handleResourceNotFoundException(ResourceNotFoundException e){
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ErrorResponse(e.getMessage(), LocalDateTime.now()));
	}
	
	
	
	@ExceptionHandler(RuntimeException.class)
	public ResponseEntity<?> handleRuntimeException(RuntimeException e){
		ErrorResponse resp = new ErrorResponse("Something went wrong "+e.getMessage(), LocalDateTime.now());
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(resp);
	}
	

}
