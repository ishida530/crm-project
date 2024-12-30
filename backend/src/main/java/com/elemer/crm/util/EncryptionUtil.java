package com.elemer.crm.util;

import io.github.cdimascio.dotenv.Dotenv;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;

public class EncryptionUtil {
    private static final String ALGORITHM = "AES";
    private static final Dotenv dotenv = Dotenv.load();
    private static final String ENCRYPTION_KEY = dotenv.get("ENCRYPTION_KEY");

    private static SecretKeySpec SECRET_KEY;

    static {
        if (ENCRYPTION_KEY == null || ENCRYPTION_KEY.length() != 16) {
            throw new IllegalArgumentException("Invalid ENCRYPTION_KEY. Must be 16 characters long.");
        }
        SECRET_KEY = new SecretKeySpec(ENCRYPTION_KEY.getBytes(), ALGORITHM);
    }

    public static String encrypt(String data) {
        if (data == null || data.isEmpty()) {
            throw new IllegalArgumentException("Data to encrypt cannot be null or empty");
        }
        try {
            Cipher cipher = Cipher.getInstance(ALGORITHM);
            cipher.init(Cipher.ENCRYPT_MODE, SECRET_KEY);
            byte[] encryptedData = cipher.doFinal(data.getBytes("UTF-8"));
            return Base64.getEncoder().encodeToString(encryptedData);
        } catch (Exception e) {
            System.err.println("Encryption error: " + e.getMessage());
            throw new RuntimeException("Error encrypting data", e);
        }
    }

    public static String decrypt(String encryptedData) {
        if (encryptedData == null || encryptedData.isEmpty()) {
            throw new IllegalArgumentException("Data to decrypt cannot be null or empty");
        }
        try {
            String cleanData = encryptedData.replaceAll("[^A-Za-z0-9+/=]", "");
            byte[] decodedData = Base64.getDecoder().decode(cleanData);
            Cipher cipher = Cipher.getInstance(ALGORITHM);
            cipher.init(Cipher.DECRYPT_MODE, SECRET_KEY);
            byte[] originalData = cipher.doFinal(decodedData);
            return new String(originalData, "UTF-8");
        } catch (IllegalArgumentException e) {
            System.err.println("Decryption error: " + e.getMessage());
            throw new RuntimeException("Error decrypting data", e);
        } catch (Exception e) {
            System.err.println("Decryption error: " + e.getMessage());
            throw new RuntimeException("Error decrypting data", e);
        }
    }
}
