// User scheme

export type User = {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    gender: string;
    address: string;
    town: string;
    zone: string;
    postcode: string;
    country: string;
    alternateEmail: string;
    phoneNumber: string;
    password: string;
    confirmPassword: string;
    role: string;
    isVerified: boolean;
    createdAt: string;
    updatedAt: string;
    dateOfBirth?: string;  // Optional property for user's date of birth
    avatarUrl?: string;    // Optional property for user's avatar image URL
    bio?: string;          // Optional property for a short biography of the user
    lastLoginAt?: string;  // Optional property for tracking the last login time
    resetPasswordToken?: string; // Optional property for password reset token
    resetPasswordExpires?: string; // Optional property for password reset token expiry date
    preferences?: {
        language: string;   // User's preferred language
        timezone: string;   // User's preferred timezone
        notifications: {
            email: boolean; // Preference for email notifications
            sms: boolean;   // Preference for SMS notifications
        }
    }
};
