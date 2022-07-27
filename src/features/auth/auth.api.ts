import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { IUser } from 'src/interfaces/Auth';

class AuthAPI {
  async login(email: string, password: string) {
    await auth().signInWithEmailAndPassword(email, password);
  }

  async register(email: string, password: string) {
    await auth().createUserWithEmailAndPassword(email, password);
  }

  async addNewUsersToDatabase(
    id: string,
    email: string,
    userName: string,
    age: number,
  ) {
    const docRef = firestore().collection('users').doc(id);
    docRef.get().then((doc) => {
      if (doc.exists) {
        console.log('User already exists');
      } else {
        docRef.set({
          email: email,
          userName: userName,
          age: age || 20,
        });
      }
    });

    return { email, userName, age };
  }

  async getCurrentUser(id: string): Promise<IUser> {
    console.log(id);
    const user = (await firestore().collection('users').doc(id).get()).data();
    return {
      id: id,
      age: user?.age,
      dateOfBirth: user?.dateOfBirth,
      email: user?.email,
      fullName: user?.fullName,
      gender: user?.gender,
      avatar: user?.avatar,
      name: user?.name,
    };
  }
}

export default new AuthAPI();
