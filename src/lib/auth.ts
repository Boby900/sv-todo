import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from './server/db/index'; // your drizzle instance
import { emailOTP } from "better-auth/plugins"

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: 'pg' // or "mysql", "sqlite"
	}),
	emailAndPassword: {
		enabled: true
	},
	plugins: [
		emailOTP({
			async sendVerificationOTP({ email, otp, type }) {
				// Implement the sendVerificationOTP method to send the OTP to the user's email address
			},
		})
	]
});
