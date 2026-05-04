package com.app.ems.exceptions;

@SuppressWarnings("serial")
public class UserHandlingException extends RuntimeException {
public UserHandlingException(String mesg) {
	super(mesg);
}
}
