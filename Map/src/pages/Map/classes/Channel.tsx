import User from './User';
class Channel {
    name: string;
    users: User[] = [];
    constructor(name: string) {
      this.name = name;
    }
  }

  export default Channel;