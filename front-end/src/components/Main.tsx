import NoLoginButton from './NoLoginButton';
import LoginButton from './LoginButton';
import JoinButton from './JoinButton';
import '../styles/Main.css';

window.onclick = (e) => {
  const noLoginModal = document.querySelector('.main-no-login-modal');
  const loginModal = document.querySelector('.main-login-modal');
  const joinModal = document.querySelector('.main-join-modal');
  if (e.target instanceof Element) {
    if (noLoginModal !== null && !e.target.closest('.main-no-login-modal') && !e.target.closest('.main-no-login-button'))
      noLoginModal.className = 'main-no-login-modal-hidden';
    if (loginModal !== null && !e.target.closest('.main-login-modal') && !e.target.closest('.main-login-button'))
      loginModal.className = 'main-login-modal-hidden';
    if (joinModal !== null && !e.target.closest('.main-join-modal') && !e.target.closest('.main-join-button'))
      joinModal.className = 'main-join-modal-hidden';
  }
};

const Main = () => {
  return (
    <div id="main">
      <div className="main-header">Liar Game</div>
      <NoLoginButton />
      <LoginButton />
      <JoinButton />
    </div>
  );
};

export default Main;
