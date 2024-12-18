package com.codezoo.Helper;

import java.util.UUID;

public class UUIDGenerator {

	public static String getUniqueID(){
		return UUID.randomUUID().toString();
	}
}
