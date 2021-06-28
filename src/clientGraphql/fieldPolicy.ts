import { authVar, sidebarVar } from '../App/link';

const fieldPolicy = {
  AuthUser: {
    read() {
      return authVar();
    },
  },
  Sidebar: {
    read() {
      return sidebarVar();
    },
  },
};

export default fieldPolicy;
