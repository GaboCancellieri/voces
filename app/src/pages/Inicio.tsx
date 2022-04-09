import { NavBar, Typography } from '../components';
import { colors } from '../utils/theme';
import logo from '../logo.png';

function Inicio() {
  return (
    <>
      <NavBar />
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Typography
            align="center"
            size={45}
            fontVariant="title"
            color={colors.mainPink}
          >
            Inicio
          </Typography>
        </header>
      </div>
    </>
  );
}

export default Inicio;
