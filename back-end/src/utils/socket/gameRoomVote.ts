import { Server, Socket } from 'socket.io';
import { roomList } from '../../store/store';

const voteResult = {};
let voteCount = {};

const endVote = (socket: Socket, io: Server) => {
  socket.on('vote result', (voteUser: any) => {
    const { index, name, roomtitle } = voteUser;
    const roomPeopleNum = roomList.get(roomtitle).client.length;
    if (!voteResult[roomtitle]) {
      voteResult[roomtitle] = {};
      voteCount[roomtitle] = 0;
    }
    voteCount[roomtitle] += 1;
    if (!voteResult[roomtitle][name]) {
      voteResult[roomtitle][name] = 1;
    } else {
      voteResult[roomtitle][name] += 1;
    }
    if (roomPeopleNum === voteCount[roomtitle]) {
      let resultArray = [];
      for (const [key, value] of Object.entries(voteResult[roomtitle])) {
        resultArray.push(key + ' ' + value + '표');
      }
      io.to(roomtitle).emit('end vote', resultArray);
    }
  });
};

/**
 * 게임방 채팅에서 할 소켓 기능 모음
 */
const gameRoomVote = (socket: Socket, io: Server) => {
  endVote(socket, io);
};

export default gameRoomVote;
