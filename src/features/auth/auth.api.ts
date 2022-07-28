import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { IUser, IUserRegister } from 'src/interfaces/Auth';
class AuthAPI {
  async login(email: string, password: string) {
    await auth().signInWithEmailAndPassword(email, password);
  }

  async register(
    email: string,
    password: string,
  ): Promise<{ id: string | undefined }> {
    await auth().createUserWithEmailAndPassword(email, password);
    return { id: auth().currentUser?.uid };
  }

  async addNewUsersToDatabase(id: string, data: IUserRegister) {
    console.log(id);
    console.log(data.username);
    console.log(data.avatar);
    const docRef = firestore().collection('users').doc(id);
    docRef.get().then((doc) => {
      if (doc.exists) {
        console.log('User already exists');
      } else {
        docRef.set({
          dateOfBirth: data.dateOfBirth,
          email: data.email,
          fullName: data.fullName,
          gender: data.gender,
          avatar: data.avatar,
          username: data.username,
        });
      }
    });
  }

  async getCurrentUser(id: string): Promise<IUser> {
    console.log(id);
    const user = (await firestore().collection('users').doc(id).get()).data();
    return {
      id: id,
      dateOfBirth: user?.dateOfBirth,
      email: user?.email,
      fullName: user?.fullName,
      gender: user?.gender,
      avatar: user?.avatar,
      username: user?.username,
    };
  }

  async updateUserInformation(id: string, data: any): Promise<IUser> {
    await firestore().collection('users').doc(id).update(data);
    const user = (await firestore().collection('users').doc(id).get()).data();
    return {
      id: id,
      dateOfBirth: user?.dateOfBirth,
      email: user?.email,
      fullName: user?.fullName,
      gender: user?.gender,
      avatar: user?.avatar,
      username: user?.username,
    };
  }
}

export default new AuthAPI();
