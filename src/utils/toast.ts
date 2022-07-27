import Toast from 'react-native-toast-message';

export const showToastSuccess = (title: string, message: string) => {
  Toast.show({
    type: 'success',
    text1: title,
    text2: message,
  });
};

//show error message
export const showToastError = (title: string, message: string) => {
  Toast.show({
    type: 'error',
    text1: title,
    text2: message,
  });
};
