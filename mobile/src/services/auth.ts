import { FirebaseApp } from 'firebase/app';
import {
  Auth,
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';

interface UserData {
  username?: string;
  email: string;
  password: string;
}

export class AuthenticationService {
  private readonly auth: Auth;

  constructor(private readonly app: FirebaseApp) {
    this.auth = getAuth(app);
  }

  async signIn({ email, password }: UserData) {
    return await signInWithEmailAndPassword(this.auth, email, password);
  }

  async signUpAndSignIn({ username, email, password }: UserData) {
    const data = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );

    await updateProfile(data.user, {
      displayName: username,
    });

    return data;
  }

  getAuth() {
    return this.auth;
  }
}
