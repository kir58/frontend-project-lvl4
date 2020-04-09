import { name } from 'faker';
import cookies from 'js-cookie';

export default () => {
  const userName = cookies.get('userName');
  if (userName) {
    return userName;
  }

  const nameNewUser = name.findName();
  cookies.set('userName', nameNewUser);
  return nameNewUser;
};
