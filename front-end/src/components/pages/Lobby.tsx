import '../../styles/Lobby.css';
import RoomList from '../Lobby/RoomList';
import Profile from '../Lobby/Profile';
import LobbyButtons from '../Lobby/LobbyButtons';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Socket } from 'socket.io-client';
import { globalContext } from '../../App';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import globalAtom from '../../recoilStore/globalAtom';
import globalSelector from '../../recoilStore/globalSeletor';
import { modalPropsType } from '../public/Modal';

interface roomInterface {
  [prop: string]: string;
}

const filterRooms = (rooms: Array<roomInterface>, filterWord: string) => {
  if (filterWord === '') return rooms;
  return rooms.filter((room: roomInterface) => room[0].includes(filterWord));
};

const Lobby = () => {
  const { socket }: { socket: Socket } = useContext(globalContext);
  const [rooms, setRooms] = useState([]);
  const [filterWord, setFilterWord] = useState('');
  const history = useHistory();

  const popModal: (modalProps: modalPropsType) => void = useSetRecoilState(globalSelector.popModal);
  const [roomData, setRoomData] = useRecoilState(globalAtom.roomData);
  const { user_id } = useRecoilValue(globalAtom.user);

  const logout = async () => {
    const res = await fetch('/api/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id: user_id }),
    });
    if (res) {
      window.location.href = '/';
    }
  };

  useEffect(() => {
    socket.on('room create', (data) => {
      if (data) {
        history.push('/game');
      } else {
        popModal({ type: 'error', ment: '중복된 방제가 있습니다.' });
      }
    });

    socket.on('room list', (roomList) => {
      setRooms(roomList);
    });

    socket.emit('room list', null);

    socket.emit('lobby entered', user_id);

    setRoomData({ ...roomData, selectedRoomTitle: '' });

    return () => {
      socket.off('room create');
      socket.off('room list');
    };
  }, []);

  return (
    <div id="lobby">
      <div className="lobby-center-items">
        <div className="lobby-header">Liar Game</div>
        <div className="lobby-rooms">
          <RoomList rooms={filterRooms(rooms, filterWord)} filterWord={filterWord} setRooms={setRooms} />
        </div>
      </div>
      <div className="lobby-right-items">
        <Profile />
        <LobbyButtons rooms={rooms} setFilterWord={setFilterWord} />
      </div>
      <button className="lobby-logout" onClick={logout}>
        로그아웃
      </button>
    </div>
  );
};

export default React.memo(Lobby);
